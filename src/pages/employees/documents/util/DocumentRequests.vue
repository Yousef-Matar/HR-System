<template>
	<div class="p-8 rounded-3xl bg-background flex flex-col gap-8">
		<div class="flex flex-col gap-5 items-start">
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
					:select-i-d="'document'"
					:select-label="'Document Type'"
					:select-value="table.documentType"
					:items="documentTypes"
					:required="false"
					@documentChange="(selectContent) => (table.documentType = selectContent)"
				/>
				<v-select
					:select-i-d="'documentStatus'"
					:select-label="'Document Status'"
					:select-value="table.documentStatus"
					:items="documentStatus"
					:required="false"
					@documentStatusChange="(selectContent) => (table.documentStatus = selectContent)"
				/>
				<v-select
					:select-i-d="'itemsPerPage'"
					:select-label="'Items Per Page'"
					:select-value="table.itemsPerPage"
					:items="itemsPerPageData"
					:required="false"
					@itemsPerPageChange="(selectContent) => (table.itemsPerPage = selectContent)"
				/>
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
					{{ slotProps }}
				</div>
			</template>
		</v-table>
	</div>
</template>

<script>
import exportFromJSON from 'export-from-json'

import FileManager from '@/util/FileManager'
import SelectOptions from '@/util/SelectOptions'
import UsersManager from '@/util/UsersManager'

export default {
	data() {
		return {
			activeUser: UsersManager.getActiveUser(),
			table: {
				itemsPerPage: 10,
				searchFilter: '',
				documentType: '',
				documentStatus: '',
			},
			itemsPerPageData: SelectOptions.getItemsPerPage(),
			documentTypes: SelectOptions.getDocumentFilters(),
			documentStatus: SelectOptions.getDocumentStatus(),
		}
	},
	computed: {
		tableHeaders() {
			var headers = [
				{ value: 'Request ID', sortable: true },
				{ value: 'Requested By', sortable: true },
				{ value: 'Handled By', sortable: true },
				{ value: 'Request Date', sortable: true },
				{ value: 'Document Type', sortable: true },
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
			if (initialData == null) return
			var data = []
			initialData.forEach((element) =>
				data.push({
					'Request ID': element.ID,
					'Requested By': UsersManager.getUserByID(element.userID).username,
					'Handled By': element.handledBy == null ? 'Pending Action' : UsersManager.getUserByID(element.handledBy).username,
					'Request Date': element.requestDate,
					'Document Type': element.documentType,
					Status: element.status,
				})
			)
			return data
		},
		filteredData() {
			if (UsersManager.getActiveUser() == null) return
			var initialData = FileManager.getAllOtherUsersRequestedFiles(UsersManager.getActiveUser().ID)
			initialData = initialData.filter((documentRequest) => {
				const searchTerm = this.table.searchFilter.toLowerCase()
				const IDS = String(documentRequest.ID)
				const requestersUsernames = UsersManager.getUserByID(documentRequest.userID).username.toLowerCase()
				const handlersUsernames = documentRequest.handledBy == null ? '' : UsersManager.getUserByID(documentRequest.handledBy).username.toLowerCase()
				const documentStatus = documentRequest.status.toLowerCase()
				const documentType = documentRequest.documentType.toLowerCase()
				const requestDates = documentRequest.requestDate.toLowerCase()
				if (this.table.documentType == 'all' || (this.table.documentType == '' && (this.table.documentStatus == 'all' || this.table.documentStatus == ''))) return IDS.includes(searchTerm) || requestersUsernames.includes(searchTerm) || documentStatus.includes(searchTerm) || handlersUsernames.includes(searchTerm) || requestDates.includes(searchTerm) || documentType.includes(searchTerm)
				else if (this.table.documentType !== 'all' && (this.table.documentStatus == 'all' || this.table.documentStatus == '')) return (IDS.includes(searchTerm) || requestersUsernames.includes(searchTerm) || handlersUsernames.includes(searchTerm) || requestDates.includes(searchTerm) || documentStatus.includes(searchTerm)) && documentType.includes(this.table.documentType)
				else if (this.table.documentStatus !== 'all' && (this.table.documentType == 'all' || this.table.documentType == '')) return (IDS.includes(searchTerm) || requestersUsernames.includes(searchTerm) || handlersUsernames.includes(searchTerm) || requestDates.includes(searchTerm) || documentType.includes(searchTerm)) && documentStatus.includes(this.table.documentStatus)
				else if (this.table.documentStatus !== 'all' && this.table.documentType != 'all') return (IDS.includes(searchTerm) || requestersUsernames.includes(searchTerm) || handlersUsernames.includes(searchTerm) || requestDates.includes(searchTerm)) && documentStatus.includes(this.table.documentStatus) && documentType.includes(searchTerm)
			})
			return initialData
		},
	},
	methods: {
		downloadFile() {
			var data = this.tableData
			var fileName = 'Document-Requests'
			const exportType = exportFromJSON.types.csv
			if (data) exportFromJSON({ data, fileName, exportType })
		},
		changeVacationRequestStatus(requestID, status) {
			console.log(requestID, status)
			//	var success = VacationManager.changeVacationRequestStatus(requestID, status)
			//	if (success == false) {
			//
			//	}
		},
	},
}
</script>

<style></style>
