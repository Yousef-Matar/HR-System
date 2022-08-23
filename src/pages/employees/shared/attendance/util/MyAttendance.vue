<template>
	<div class="p-8 rounded-3xl bg-background overflow-x-auto mx-8 flex flex-col gap-8">
		<div class="flex flex-col gap-5 items-start">
			<div class="flex flex-wrap gap-5 justify-between w-full items-end">
				<v-select
					:select-i-d="'year'"
					:select-label="'Year Filter'"
					:select-value="table.yearFilter"
					:items="getYearsFilter"
					@yearChange="(selectContent) => (table.yearFilter = selectContent)"
				/>
				<v-select
					:select-i-d="'month'"
					:select-label="'Month Filter'"
					:select-value="table.monthFilter"
					:items="getMonthFilter"
					@monthChange="(selectContent) => (table.monthFilter = selectContent)"
				/>
			</div>
		</div>
		<v-table :headers="tableHeaders" :table-data="tableData" />
	</div>
</template>

<script>
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
			return ['Username', 'Role', 'Covered Hours'].concat(this.getDaysInMonth)
		},
		tableData() {
			return [
				{
					user: this.user,
					coveredHours: `${HoursManager.getMonthWorkedHours(this.user, this.table.yearFilter, this.table.monthFilter)}` + '/' + `${HoursManager.getMonthHours(this.table.yearFilter, this.table.monthFilter).hours}`,
				},
			]
		},
	},
}
</script>

<style></style>
