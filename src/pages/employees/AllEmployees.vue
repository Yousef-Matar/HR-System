<template>
	<div class="p-8 rounded-3xl bg-background flex flex-col gap-8">
		<div class="flex flex-wrap gap-5 items-center w-full">
			<v-input
				:input-i-d="'searchBar'"
				:type="'text'"
				:input-label="'Search'"
				:input-value="table.searchFilter"
				:required="false"
				@searchBarChange="(inputContent) => (table.searchFilter = inputContent)"
			/>
			<v-select
				class="w-44"
				:select-i-d="'role'"
				:select-label="'Account Status'"
				:select-value="table.accountStatus"
				:items="getAccountStatus"
				:required="false"
				@roleChange="(selectContent) => (table.accountStatus = selectContent)"
			/>
			<v-select
				class="w-40"
				:select-i-d="'role'"
				:select-label="'Role Filter'"
				:select-value="table.roleFilter"
				:items="getRoleFilter"
				:required="false"
				@roleChange="(selectContent) => (table.roleFilter = selectContent)"
			/>
			<v-select
				class="w-40"
				:select-i-d="'itemsPerPage'"
				:select-label="'Items Per Page'"
				:select-value="table.itemsPerPage"
				:items="itemsPerPageData"
				:required="false"
				@itemsPerPageChange="(selectContent) => (table.itemsPerPage = selectContent)"
			/>
			<v-button
				class="w-40 min-h-[3rem]"
				:method="downloadFile"
				:text="'Export to Excel'"
				:icon="'fa fa-file-arrow-down'"
			/>
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
				<v-button
					:method="openCreateEmployeeModalAction"
					:text="'Add User'"
					class="w-full flex whitespace-nowrap items-center min-h-[25px] min-w-[25px] text-center justify-center"
				/>
				<EmployeeForm
					:mode="'create'"
					:open-modal="openCreateEmployeeModal"
					:active-employee="activeUser"
					@closeModal="openCreateEmployeeModal = false"
					@tableRefresh="refreshData"
				/>
			</template>
			<template #tableBodyComponents="slotProps">
				<v-button
					:text="'Update User'"
					class="w-full flex whitespace-nowrap items-center min-h-[25px] min-w-[25px] text-center justify-center"
					@click="openEditEmployeeModalAction(slotProps.row.user.ID)"
				/>
			</template>
		</v-table>
		<EmployeeForm
			:mode="'update'"
			:open-modal="openEditEmployeeModal"
			:active-employee="activeUser"
			:inital-employee="initialEmployee"
			@closeModal="openEditEmployeeModal = false"
			@tableRefresh="refreshData"
		/>
	</div>
</template>

<script>
import exportFromJSON from 'export-from-json'

import EmployeeForm from '@/components/modal/EmployeeForm'

import HoursManager from '@/util/HoursManager'
import SelectOptions from '@/util/SelectOptions'
import UsersManager from '@/util/UsersManager'

export default {
	components: { EmployeeForm },
	data() {
		return {
			initialEmployee: {},
			openEditEmployeeModal: false,
			openCreateEmployeeModal: false,
			activeUser: UsersManager.getActiveUser(),
			itemsPerPageData: SelectOptions.getItemsPerPage(),
			getAccountStatus: SelectOptions.getAccountStatusFilter(),
			table: {
				itemsPerPage: 10,
				searchFilter: '',
				roleFilter: '',
				accountStatus: '',
				initialData: UsersManager.getUsersBasedOnPermissions(UsersManager.getActiveUser().role),
			},
		}
	},
	computed: {
		getRoleFilter() {
			var users = this.table.initialData.filter((user) => user.username != this.activeUser.username)
			return SelectOptions.getUniqueRoles(users)
		},
		tableHeaders() {
			var headers = [
				{ value: 'Username', sortable: true },
				{ value: 'Account Status', sortable: true },
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
				dataTemplate['Account Status'] = user.status
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
				const accountStatus = user.status.toLowerCase()
				const searchTerm = this.table.searchFilter.toLowerCase()
				if ((this.table.roleFilter == 'all' || this.table.roleFilter == '') && (this.table.accountStatus == 'all' || this.table.accountStatus == '')) return usernames.includes(searchTerm)
				else if ((this.table.roleFilter != 'all' || this.table.roleFilter != '') && (this.table.accountStatus == 'all' || this.table.accountStatus == '')) return usernames.includes(searchTerm) && accountRoles.includes(this.table.roleFilter)
				else if ((this.table.roleFilter == 'all' || this.table.roleFilter == '') && (this.table.accountStatus != 'all' || this.table.accountStatus != '')) return usernames.includes(searchTerm) && accountStatus.includes(this.table.accountStatus)
				else if ((this.table.roleFilter != 'all' || this.table.roleFilter != '') && (this.table.accountStatus != 'all' || this.table.accountStatus != '')) return usernames.includes(searchTerm) && accountStatus.includes(this.table.accountStatus) && accountRoles.includes(this.table.roleFilter)
			})
			return users
		},
	},
	methods: {
		openCreateEmployeeModalAction() {
			this.openCreateEmployeeModal = true
		},
		openEditEmployeeModalAction(employeeID) {
			this.initialEmployee = Object.assign({}, this.tableData.find((row) => row.user.ID == employeeID).user)
			this.openEditEmployeeModal = true
		},
		downloadFile() {
			var data = this.tableData
			if (data.length == 0) {
				this.$swal.fire({
					title: 'No Data to be exported!',
					icon: 'error',
				})
			} else {
				var fileName = 'All-Users'
				const exportType = exportFromJSON.types.csv
				if (data) exportFromJSON({ data, fileName, exportType })
			}
		},
		refreshData() {
			this.table.initialData = UsersManager.getUsersBasedOnPermissions(UsersManager.getActiveUser().role)
		},
	},
}
</script>

<style></style>
