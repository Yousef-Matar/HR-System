<template>
	<div class="p-8 rounded-3xl bg-background mx-8 flex flex-col gap-8">
		<div class="flex flex-col gap-5 items-start">
			<div class="flex flex-wrap gap-5 justify-between w-full items-end">
				<v-button
					:method="downloadFile"
					:text="'Export to Excel'"
					:icon="'fa fa-file-arrow-down'"
				/>
				<div class="flex flex-wrap gap-5 items-end">
					<v-select
						:select-i-d="'month'"
						:select-label="'Month Filter'"
						:select-value="table.monthFilter"
						:items="getMonthFilter"
						@monthChange="(selectContent) => (table.monthFilter = selectContent)"
					/>
					<v-select
						:select-i-d="'year'"
						:select-label="'Year Filter'"
						:select-value="table.yearFilter"
						:items="getYearsFilter"
						@yearChange="(selectContent) => (table.yearFilter = selectContent)"
					/>
				</div>
			</div>
		</div>
		<v-table
			:headers="tableHeaders"
			:table-data="tableData"
			:table-fields="tableFields"
		/>
	</div>
</template>

<script>
import exportFromJSON from 'export-from-json'

import AttendanceManager from '@/util/AttendanceManager'
import HoursManager from '@/util/HoursManager'

export default {
	props: {
		user: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			table: {
				yearFilter: new Date().getFullYear(),
				monthFilter: new Date().getMonth(),
			},
		}
	},
	computed: {
		getYearsFilter() {
			return AttendanceManager.getUserYears(this.user)
		},
		getMonthFilter() {
			return AttendanceManager.getUserMonths(this.user, this.table.yearFilter)
		},
		getDaysInMonth() {
			return AttendanceManager.getDaysInMonth(this.table.yearFilter, this.table.monthFilter)
		},
		tableHeaders() {
			var headers = [
				{ Username: 'Username', sortable: false },
				{ Role: 'Role', sortable: false },
				{ 'Covered Hours': 'Covered Hours', sortable: false },
			]
			this.getDaysInMonth.forEach((day) => {
				headers.push({
					[String(day) + '/' + String(this.table.monthFilter + 1) + '/' + String(this.table.yearFilter)]: String(day) + '/' + String(this.table.monthFilter + 1) + '/' + String(this.table.yearFilter),
					sortable: false,
				})
			})
			return headers
		},
		tableFields() {
			var fields = Object.keys(this.tableData[0])
			return fields
		},
		tableData() {
			var data = [
				{
					Username: this.user.username,
					Role: this.user.role,
					'Covered Hours': `${HoursManager.getMonthWorkedHours(this.user, this.table.yearFilter, this.table.monthFilter)}` + '/' + `${HoursManager.getMonthHours(this.table.yearFilter, this.table.monthFilter).hours}`,
				},
			]
			data.forEach((data) => {
				this.getDaysInMonth.forEach((day) => {
					switch (AttendanceManager.showAttendance(this.user.hireDate, this.table.yearFilter, this.table.monthFilter, day)) {
						case 'Future/PreHire':
							data[String(day) + '/' + String(this.table.monthFilter + 1) + '/' + String(this.table.yearFilter)] = ''
							break
						case 'PastDays' || 'PastMonths' || 'PastYears' || 'HireMonth&Year' || 'HireDay':
							data[String(day) + '/' + String(this.table.monthFilter + 1) + '/' + String(this.table.yearFilter)] = HoursManager.getDayTotalHours(this.user, this.table.yearFilter, this.table.monthFilter, day)
							break
						default:
							data[String(day) + '/' + String(this.table.monthFilter + 1) + '/' + String(this.table.yearFilter)] = 'Not Found'
							break
					}
				})
			})
			return data
		},
	},
	methods: {
		downloadFile() {
			var data = this.tableData
			var fileName = 'My-Attendance-Year-' + this.table.yearFilter + '-Month-' + (this.table.monthFilter + 1)
			const exportType = exportFromJSON.types.csv
			if (data) exportFromJSON({ data, fileName, exportType })
		},
	},
}
</script>

<style></style>
