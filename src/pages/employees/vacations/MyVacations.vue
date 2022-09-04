<template>
	<div class="p-8 rounded-3xl bg-background flex flex-col gap-8">
		<div class="flex flex-col gap-5 items-start">
			<div class="flex flex-wrap gap-5 justify-between w-full items-end">
				<div class="flex flex-wrap gap-5 items-end">
					<v-select
						:select-i-d="'status'"
						:select-label="'Status Filter'"
						:select-value="table.statusFilter"
						:items="statusFilter"
						:required="false"
						@statusChange="(selectContent) => (table.statusFilter = selectContent)"
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
			:sort-type="'descendingly'"
			:pagination="true"
		>
			<template #tableHeaderComponents>
				Action
			</template>
			<template #tableBodyComponents="slotProps">
				<div class="flex justify-center">
					<v-button
						class="self-center w-full"
						:text="'Cancel'"
						:variant="'danger'"
						:disabled="slotProps.row.Status == 'pending' ? false : true"
						:method="() => cancelVacationRequest(slotProps.row['Request ID'])"
					/>
				</div>
			</template>
		</v-table>
	</div>
</template>

<script>
import exportFromJSON from 'export-from-json'

import UsersManager from '@/util/UsersManager'
import VacationManager from '@/util/VacationManager'

export default {
	data() {
		return {
			activeUser: UsersManager.getActiveUser(),
			table: {
				statusFilter: '',
			},
			statusFilter: [
				{
					title: 'Select a status filter',
					value: '',
					hidden: true,
				},
				{
					title: 'All',
					value: 'All',
					hidden: false,
				},
				{
					title: 'Pending',
					value: 'pending',
					hidden: false,
				},
				{
					title: 'Approved',
					value: 'approved',
					hidden: false,
				},
				{
					title: 'Rejected',
					value: 'rejected',
					hidden: false,
				},
			],
		}
	},
	computed: {
		tableHeaders() {
			var headers = [
				{ value: 'Request ID', sortable: true },
				{ value: 'From', sortable: true },
				{ value: 'Till', sortable: true },
				{ value: 'Duration', sortable: true },
				{ value: 'Status', sortable: true },
			]
			return headers
		},
		tableFields() {
			var fields = this.tableHeaders.map((header) => header.value)
			return fields
		},
		tableData() {
			var initialData
			if (this.table.statusFilter == '' || this.table.statusFilter == 'All') {
				initialData = VacationManager.getAllVacationRequests().filter((vacation) => vacation.requestedBy.username == this.activeUser.username)
			} else {
				initialData = VacationManager.getAllVacationRequests().filter((vacation) => vacation.requestedBy.username == this.activeUser.username && vacation.status == this.table.statusFilter)
			}
			var data = []
			initialData.forEach((element) =>
				data.push({
					'Request ID': element.ID,
					From: element.from,
					Till: element.till,
					Duration: element.duration == 1 ? element.duration + ' Day' : element.duration + ' Days',
					Status: element.status,
				})
			)
			return data
		},
	},
	methods: {
		downloadFile() {
			var data = this.tableData
			var fileName = 'My-Vacation-Requests'
			const exportType = exportFromJSON.types.csv
			if (data) exportFromJSON({ data, fileName, exportType })
		},
		cancelVacationRequest(requestID) {
			VacationManager.cancelVacationRequest(requestID)
		},
	},
}
</script>

<style></style>
