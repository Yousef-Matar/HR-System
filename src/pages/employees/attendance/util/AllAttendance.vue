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
				class="w-40"
				:select-i-d="'month'"
				:select-label="'Month Filter'"
				:select-value="table.monthFilter"
				:items="getMonthFilter"
				:required="false"
				@monthChange="(selectContent) => (table.monthFilter = selectContent)"
			/>
			<v-select
				class="w-40"
				:select-i-d="'year'"
				:select-label="'Year Filter'"
				:select-value="table.yearFilter"
				:items="getYearsFilter"
				:required="false"
				@yearChange="(selectContent) => (table.yearFilter = selectContent)"
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
				class="w-40 h-12"
				:method="downloadFile"
				:text="'Export to Excel'"
				:icon="'fa fa-file-arrow-down'"
			/>
		</div>

		<v-table
			:headers="tableHeaders"
			:table-data="tableData"
			:table-fields="tableFields"
			:pagination="true"
			:page-size="table.itemsPerPage"
		/>
	</div>
</template>

<script>
import exportFromJSON from 'export-from-json'

import AttendanceManager from '@/util/AttendanceManager'
import HoursManager from '@/util/HoursManager'
import SelectOptions from '@/util/SelectOptions'
import UsersManager from '@/util/UsersManager'

export default {
	props: {
		users: {
			type: Array,
			required: true,
		},
	},
	data() {
		return {
			activeUser: UsersManager.getActiveUser(),
			table: {
				itemsPerPage: 10,
				searchFilter: '',
				yearFilter: new Date().getFullYear(),
				monthFilter: new Date().getMonth(),
			},
			itemsPerPageData: SelectOptions.getItemsPerPage(),
		}
	},
	computed: {
		getYearsFilter() {
			return AttendanceManager.getUserYears(this.activeUser.hireDate)
		},
		getMonthFilter() {
			return AttendanceManager.getUserMonths(this.activeUser.hireDate, this.table.yearFilter)
		},
		getDaysInMonth() {
			return AttendanceManager.getDaysInMonth(this.table.yearFilter, this.table.monthFilter)
		},
		tableHeaders() {
			var headers = [
				{ value: 'Username', sortable: true },
				{ value: 'Role', sortable: true },
				{ value: 'Monthly Covered Hours', sortable: true },
			]
			this.getDaysInMonth.forEach((day) => {
				headers.push({
					value: String(day) + '/' + String(this.table.monthFilter + 1) + '/' + String(this.table.yearFilter),
					sortable: false,
				})
			})
			return headers
		},
		tableFields() {
			var fields = this.tableHeaders.map((header) => header.value)

			return fields
		},
		tableData() {
			var data = []
			if (this.filteredData == null) return
			var users = this.filteredData
			users.forEach((user) => {
				var dataTemplate = {}
				dataTemplate.Username = user.username
				dataTemplate.Role = user.role
				dataTemplate['Monthly Covered Hours'] = HoursManager.getMonthWorkedHours(user.attendance, this.table.yearFilter, this.table.monthFilter) + '/' + HoursManager.getMonthHours(this.table.yearFilter, this.table.monthFilter).hours
				this.getDaysInMonth.forEach((day) => {
					switch (AttendanceManager.showAttendance(user.hireDate, this.table.yearFilter, this.table.monthFilter, day)) {
						case 'Future/PreHire':
							dataTemplate[String(day) + '/' + String(this.table.monthFilter + 1) + '/' + String(this.table.yearFilter)] = ''
							break
						case 'Past':
							dataTemplate[String(day) + '/' + String(this.table.monthFilter + 1) + '/' + String(this.table.yearFilter)] = HoursManager.getDayTotalHours(user.attendance, this.table.yearFilter, this.table.monthFilter, day)
							break
						default:
							dataTemplate[String(day) + '/' + String(this.table.monthFilter + 1) + '/' + String(this.table.yearFilter)] = 'Not Found'
							break
					}
				})
				data.push(dataTemplate)
			})
			return data
		},
		filteredData() {
			var month = this.table.monthFilter + 1
			if (this.users == null) return
			var initialData = this.users.filter((user) => String(this.table.yearFilter) + String(month) >= user.hireDate.slice(user.hireDate.lastIndexOf('/') + 1) + user.hireDate.slice(0, user.hireDate.indexOf('/')))
			initialData = initialData.filter((user) => {
				const searchTerm = this.table.searchFilter.toLowerCase()
				const userUsernames = user.username.toLowerCase()
				const userRoles = user.role.toLowerCase()
				return userUsernames.includes(searchTerm) || userRoles.includes(searchTerm)
			})
			return initialData
		},
	},
	methods: {
		downloadFile() {
			var data = this.tableData
			if (data.length == 0) {
				this.$swal.fire({
					title: 'No Data to be exported!',
					icon: 'error',
				})
			} else {
				var fileName = 'All-Attendance-Year-' + this.table.yearFilter + '-Month-' + (this.table.monthFilter + 1)
				const exportType = exportFromJSON.types.csv
				if (data) exportFromJSON({ data, fileName, exportType })
			}
		},
	},
}
</script>

<style></style>
