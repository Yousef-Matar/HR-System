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
				:select-i-d="'document'"
				:select-label="'Document Type'"
				:select-value="table.documentType"
				:items="documentTypes"
				:required="false"
				@documentChange="(selectContent) => (table.documentType = selectContent)"
			/>
			<v-select
				class="w-48"
				:select-i-d="'documentStatus'"
				:select-label="'Document Status'"
				:select-value="table.documentStatus"
				:items="documentStatus"
				:required="false"
				@documentStatusChange="(selectContent) => (table.documentStatus = selectContent)"
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
						:method="() => openUploadModal(slotProps.row['Request ID'])"
					/>
					<v-button
						class="self-center w-full"
						:text="'Reject'"
						:variant="'danger'"
						:disabled="slotProps.row.Status == 'pending' ? false : true"
						:method="() => changeFileRequestStatus(slotProps.row['Request ID'], 'rejected')"
					/>
				</div>
			</template>
		</v-table>
		<UploadFile
			:show-modal="showModal"
			:files="initialFiles"
			@closeModal="resetUploadModal()"
			@uploadFiles="(dataFiles) => changeFileRequestStatus(requestID, 'approved', dataFiles)"
		/>
	</div>
</template>

<script>
import exportFromJSON from 'export-from-json'

import UploadFile from '@/components/modal/UploadFile'

import FileManager from '@/util/FileManager'
import SelectOptions from '@/util/SelectOptions'
import UsersManager from '@/util/UsersManager'

export default {
	components: { UploadFile },

	data() {
		return {
			showModal: false,
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
			initialFiles: [],
			requestID: 0,
		}
	},
	computed: {
		tableHeaders() {
			var headers = [
				{ value: 'Request ID', sortable: true },
				{ value: 'Requested By', sortable: true },
				{ value: 'Request Date', sortable: true },
				{ value: 'Handled By', sortable: true },
				{ value: 'Handle Date', sortable: true },
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
			var data = []
			if (initialData == null) return data
			initialData.forEach((element) =>
				data.push({
					'Request ID': element.ID,
					'Requested By': UsersManager.getUserByID(element.userID).username,
					'Handled By': element.handledBy == null ? 'Pending Action' : UsersManager.getUserByID(element.handledBy).username,
					'Handle Date': element.handleDate == null ? 'Pending Action' : element.handleDate,
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
				const handlersDates = documentRequest.handleDate == null ? '' : documentRequest.handleDate
				const documentStatus = documentRequest.status.toLowerCase()
				const documentType = documentRequest.documentType.toLowerCase()
				const requestDates = documentRequest.requestDate
				if ((this.table.documentType == 'all' || this.table.documentType == '') && (this.table.documentStatus == 'all' || this.table.documentStatus == '')) return IDS.includes(searchTerm) || requestersUsernames.includes(searchTerm) || handlersUsernames.includes(searchTerm) || handlersDates.includes(searchTerm) || requestDates.includes(searchTerm)
				else if ((this.table.documentType != 'all' || this.table.documentType != '') && (this.table.documentStatus == 'all' || this.table.documentStatus == '')) return (IDS.includes(searchTerm) || requestersUsernames.includes(searchTerm) || handlersUsernames.includes(searchTerm) || handlersDates.includes(searchTerm) || requestDates.includes(searchTerm)) && documentType.includes(this.table.documentType)
				else if ((this.table.documentType == 'all' || this.table.documentType == '') && (this.table.documentStatus != 'all' || this.table.documentStatus != '')) return (IDS.includes(searchTerm) || requestersUsernames.includes(searchTerm) || handlersUsernames.includes(searchTerm) || handlersDates.includes(searchTerm) || requestDates.includes(searchTerm)) && documentStatus.includes(this.table.documentStatus)
				else if ((this.table.documentType != 'all' || this.table.documentType != '') && (this.table.documentStatus != 'all' || this.table.documentStatus != '')) return (IDS.includes(searchTerm) || requestersUsernames.includes(searchTerm) || handlersUsernames.includes(searchTerm) || handlersDates.includes(searchTerm) || requestDates.includes(searchTerm)) && documentStatus.includes(this.table.documentStatus) && documentType.includes(this.table.documentType)
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
				var fileName = 'Document-Requests'
				const exportType = exportFromJSON.types.csv
				if (data) exportFromJSON({ data, fileName, exportType })
			}
		},
		openUploadModal(requestID) {
			this.showModal = true
			this.requestID = requestID
			this.initialFiles = FileManager.getFileRequestByID(requestID).requestedFile
		},
		resetUploadModal() {
			this.showModal = false
			this.requestID = 0
			this.initialFiles = []
		},
		changeFileRequestStatus(requestID, status, files) {
			if (status == 'rejected') {
				this.$swal.fire('Request Rejected!', 'The Request has been rejected.', 'success')
				FileManager.changeFileRequestStatus(requestID, status, [])
			} else {
				this.$swal.fire('Request Approved!', 'The Request has been approved.', 'success')
				FileManager.changeFileRequestStatus(requestID, status, files)
			}
		},
	},
}
</script>

<style></style>
