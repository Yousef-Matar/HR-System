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
				:select-i-d="'status'"
				:select-label="'Status Filter'"
				:select-value="table.statusFilter"
				:items="statusFilter"
				:required="false"
				@statusChange="(selectContent) => (table.statusFilter = selectContent)"
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
			:sort-type="'descendingly'"
			:pagination="true"
			:page-size="table.itemsPerPage"
		>
			<template #tableHeaderComponents>
				Action
			</template>
			<template #tableBodyComponents="slotProps">
				<div class="flex justify-center gap-2">
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
	</div>
</template>

<script>
import exportFromJSON from 'export-from-json'

import SelectOptions from '@/util/SelectOptions'
import UsersManager from '@/util/UsersManager'
import VacationManager from '@/util/VacationManager'

export default {
	data() {
		return {
			activeUser: UsersManager.getActiveUser(),
			table: {
				itemsPerPage: 10,
				searchFilter: '',
				statusFilter: '',
			},
			itemsPerPageData: SelectOptions.getItemsPerPage(),
			statusFilter: SelectOptions.getStatusFilter(),
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
					'Requested By': UsersManager.getUserByID(element.requestedBy).username,
					'Handled By': element.handledBy == null ? 'Pending Action' : UsersManager.getUserByID(element.handledBy).username,
					From: element.from,
					Till: element.till,
					Duration: element.duration == 1 ? element.duration + ' Day' : element.duration + ' Days',
					Status: element.status,
				})
			)
			return data
		},
		filteredData() {
			var initialData = VacationManager.getAllVacationRequests().filter((vacation) => vacation.requestedBy != this.activeUser.ID)
			initialData = initialData.filter((vacationsRequest) => {
				const searchTerm = this.table.searchFilter.toLowerCase()
				const IDS = String(vacationsRequest.ID)
				const requestersUsernames = UsersManager.getUserByID(vacationsRequest.requestedBy).username.toLowerCase()
				const handlersUsernames = vacationsRequest.handledBy == null ? '' : UsersManager.getUserByID(vacationsRequest.handledBy).username.toLowerCase()
				const vacationFromDate = vacationsRequest.from
				const vacationTillDate = vacationsRequest.till
				const requestsStatus = vacationsRequest.status.toLowerCase()

				if (this.table.statusFilter == 'all' || this.table.statusFilter == '') return IDS.includes(searchTerm) || requestersUsernames.includes(searchTerm) || handlersUsernames.includes(searchTerm) || vacationFromDate.includes(searchTerm) || vacationTillDate.includes(searchTerm)
				else if (this.table.statusFilter !== 'all') return (IDS.includes(searchTerm) || requestersUsernames.includes(searchTerm) || handlersUsernames.includes(searchTerm) || vacationFromDate.includes(searchTerm) || vacationTillDate.includes(searchTerm)) && requestsStatus.includes(this.table.statusFilter)
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
				var fileName = 'My-Vacation-Requests'
				const exportType = exportFromJSON.types.csv
				if (data) exportFromJSON({ data, fileName, exportType })
			}
		},
		changeVacationRequestStatus(requestID, status) {
			var success = VacationManager.changeVacationRequestStatus(requestID, status)
			if (success == false) {
				this.$swal.fire('Error!', 'This user has exceeded the maximum number of yearly vacations', 'error')
			}
		},
	},
}
</script>

<style></style>
