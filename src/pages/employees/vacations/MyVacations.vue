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
			:sort-type="'descendingly'"
			:pagination="true"
			:page-size="table.itemsPerPage"
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

import TableManager from '@/util/TableManager'
import UsersManager from '@/util/UsersManager'
import VacationManager from '@/util/VacationManager'

export default {
	data() {
		return {
			activeUser: UsersManager.getActiveUser(),
			table: {
				itemsPerPage: 10,
				statusFilter: '',
			},
			itemsPerPageData: TableManager.getItemsPerPage(),
			statusFilter: TableManager.getStatusFilter(),
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
				initialData = VacationManager.getAllVacationRequests().filter((vacation) => vacation.requestedBy == this.activeUser.ID)
			} else {
				initialData = VacationManager.getAllVacationRequests().filter((vacation) => vacation.requestedBy == this.activeUser.ID && vacation.status == this.table.statusFilter)
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
			this.$swal
				.fire({
					title: 'Are you sure?',
					text: 'You won\'t be able to revert this!',
					icon: 'warning',
					showCancelButton: true,
					confirmButtonText: 'Yes, cancel it!',
				})
				.then((result) => {
					if (result.isConfirmed) {
						this.$swal.fire('Canceled!', 'Your request has been canceled.', 'success')
						VacationManager.cancelVacationRequest(requestID)
					}
				})
		},
	},
}
</script>

<style></style>