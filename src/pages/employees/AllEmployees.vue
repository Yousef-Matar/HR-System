<template>
	<div class="p-8 rounded-3xl bg-background flex flex-col gap-8">
		<div class="flex flex-col gap-5 items-start">
			<div class="flex flex-wrap gap-5 justify-between w-full items-end">
				<div class="flex flex-wrap gap-5 items-end">
					<v-input
						:input-i-d="'searchBar'"
						:type="'text'"
						:input-label="'Search'"
						:input-value="table.searchFilter"
						:required="false"
						@searchBarChange="(inputContent) => (table.searchFilter = inputContent)"
					/>
					<v-select
						:select-i-d="'role'"
						:select-label="'Role Filter'"
						:select-value="table.roleFilter"
						:items="getRoleFilter"
						:required="false"
						@roleChange="(selectContent) => (table.roleFilter = selectContent)"
					/>
					<v-select
						:select-i-d="'itemsPerPage'"
						:select-label="'Items Per Page'"
						:select-value="table.itemsPerPage"
						:items="itemsPerPageData"
						:required="false"
						@itemsPerPageChange="(selectContent) => (table.itemsPerPage = selectContent)"
					/>
				</div>
				<v-button
					:method="downloadFile"
					:text="'Export to Excel'"
					:icon="'fa fa-file-arrow-down'"
				/>
			</div>
		</div>
		<v-table
			:headers="tableHeaders"
			:table-data="tableData"
			:table-fields="tableFields"
			:header-components="true"
			:table-components="true"
			:pagination="true"
			:page-size="table.itemsPerPage"
		>
			<template #tableHeaderComponents>
				<UserForm
					class="flex whitespace-nowrap items-center min-h-[25px] min-w-[25px] text-center justify-center"
					:mode="'create'"
					@tableRefresh="refreshData"
				/>
			</template>
			<template #tableBodyComponents="slotProps">
				<UserForm
					class="flex whitespace-nowrap items-center min-h-[25px] min-w-[25px] text-center justify-center"
					:mode="'update'"
					:user="slotProps.row.user"
					@tableRefresh="refreshData"
				/>
			</template>
		</v-table>
	</div>
</template>

<script>
import exportFromJSON from 'export-from-json'

import UserForm from '@/components/modal/UserForm'

import HoursManager from '@/util/HoursManager'
import TableManager from '@/util/TableManager'
import UsersManager from '@/util/UsersManager'

export default {
	components: { UserForm },
	data() {
		return {
			activeUser: UsersManager.getActiveUser(),
			itemsPerPageData: TableManager.getItemsPerPage(),
			table: {
				itemsPerPage: 10,
				searchFilter: '',
				roleFilter: '',
				initialData: UsersManager.getUsersBasedOnPermissions(UsersManager.getActiveUser().role),
			},
		}
	},
	computed: {
		getRoleFilter() {
			var users = this.table.initialData.filter((user) => user.username != this.activeUser.username)
			var uniqueRoles = [...new Set(users.map(({ role }) => role))]
			var roles = [
				{
					title: 'Filter by role',
					value: '',
					hidden: true,
				},
				{
					title: 'all',
					value: 'all',
					hidden: false,
				},
			]
			uniqueRoles.forEach((role) => {
				roles.push({
					title: role,
					value: role,
					hidden: false,
				})
			})
			return roles
		},
		tableHeaders() {
			var headers = [
				{ value: 'Username', sortable: true },
				{ value: 'Role', sortable: true },
				{ value: 'Month Hours', sortable: true },
			]
			return headers
		},
		tableFields() {
			var fields = this.tableHeaders.map((header) => header.value)

			return fields
		},
		tableData() {
			var data = []
			var users = this.filteredData
			users.forEach((user) => {
				var dataTemplate = {}
				dataTemplate.user = user
				dataTemplate.Username = user.username
				dataTemplate.Role = user.role
				dataTemplate['Month Hours'] = HoursManager.calculateCurrentMonthWorkedHours(user.attendance) + '/' + HoursManager.getMonthlyHours()

				data.push(dataTemplate)
			})
			return data
		},
		filteredData() {
			var users = this.table.initialData.filter((user) => user.username != this.activeUser.username)
			users = users.filter((user) => {
				const usernames = user.username.toLowerCase()
				const accountRoles = user.role.toLowerCase()
				const searchTerm = this.table.searchFilter.toLowerCase()
				if (this.table.roleFilter == 'all' || this.table.roleFilter == '') return usernames.includes(searchTerm) || accountRoles.includes(searchTerm)
				else if (this.table.roleFilter !== 'all') return usernames.includes(searchTerm) && accountRoles.includes(this.table.roleFilter)
			})
			return users
		},
	},
	methods: {
		downloadFile() {
			var data = this.tableData
			var fileName = 'All-Users'
			const exportType = exportFromJSON.types.csv
			if (data) exportFromJSON({ data, fileName, exportType })
		},
		refreshData() {
			this.table.initialData = UsersManager.getUsersBasedOnPermissions(UsersManager.getActiveUser().role)
		},
	},
}
</script>

<style></style>
