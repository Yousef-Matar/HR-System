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
						:text="'Approve'"
						:disabled="slotProps.row.Status == 'pending' ? false : true"
						:method="() => changeVacationRequestStatus(slotProps.row['Request ID'], 'approved')"
					/>
					<v-button
						class="self-center w-full"
						:text="'Reject'"
						:variant="'danger'"
						:disabled="slotProps.row.Status == 'pending' ? false : true"
						:method="() => changeVacationRequestStatus(slotProps.row['Request ID'], 'rejected')"
					/>
				</div>
			</template>
		</v-table>
		<OperationDenied
			:show-modal="showModal"
			:modal-mmessage="errorMessage"
			@closeModal="showModal = false"
		/>
	</div>
</template>

<script>
import exportFromJSON from 'export-from-json'

import OperationDenied from '@/components/modal/OperationDenied.vue'

import UsersManager from '@/util/UsersManager'
import VacationManager from '@/util/VacationManager'

export default {
	components: { OperationDenied },
	data() {
		return {
			showModal: false,
			errorMessage: 'This user has exceeded the maximum number of yearly vacations',
			activeUser: UsersManager.getActiveUser(),
			table: {
				searchFilter: '',
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
					value: 'all',
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
				{ value: 'Requested By', sortable: true },
				{ value: 'Handled By', sortable: true },
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
			var initialData = this.filteredData
			var data = []
			initialData.forEach((element) =>
				data.push({
					'Request ID': element.ID,
					'Requested By': element.requestedBy.username,
					'Handled By': element.handledBy == null ? 'Pending Action' : element.handledBy.username,
					From: element.from,
					Till: element.till,
					Duration: element.duration == 1 ? element.duration + ' Day' : element.duration + ' Days',
					Status: element.status,
				})
			)
			return data
		},
		filteredData() {
			var initialData = VacationManager.getAllVacationRequests().filter((vacation) => vacation.requestedBy.username != this.activeUser.username)
			initialData = initialData.filter((vacationsRequest) => {
				const searchTerm = this.table.searchFilter.toLowerCase()
				const IDS = String(vacationsRequest.ID)
				const requestersUsernames = vacationsRequest.requestedBy.username.toLowerCase()
				const requestsStatus = vacationsRequest.status.toLowerCase()
				const handlersUsernames = vacationsRequest.handledBy == null ? '' : vacationsRequest.handledBy.username.toLowerCase()

				if (this.table.statusFilter == 'all' || this.table.statusFilter == '') return IDS.includes(searchTerm) || requestersUsernames.includes(searchTerm) || requestsStatus.includes(searchTerm) || handlersUsernames.includes(searchTerm)
				else if (this.table.statusFilter !== 'all') return (IDS.includes(searchTerm) || requestersUsernames.includes(searchTerm) || handlersUsernames.includes(searchTerm)) && requestsStatus.includes(this.table.statusFilter)
			})
			return initialData
		},
	},
	methods: {
		downloadFile() {
			var data = this.tableData
			var fileName = 'My-Vacation-Requests'
			const exportType = exportFromJSON.types.csv
			if (data) exportFromJSON({ data, fileName, exportType })
		},
		changeVacationRequestStatus(requestID, status) {
			var success = VacationManager.changeVacationRequestStatus(requestID, status)
			if (success == false) {
				this.showModal = true
			}
		},
	},
}
</script>

<style></style>
