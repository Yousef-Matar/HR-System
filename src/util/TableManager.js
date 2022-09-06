var TableManager = {
	getDocumentTypes() {
		const documentTypes = [
			{
				title: 'My Documents',
				value: 'MyDocuments',
			},
			{
				title: 'Submit Document',
				value: 'SubmitDocument',
			},
			{
				title: 'Request Document',
				value: 'RequestDocument',
			},
		]
		return documentTypes
	},
	getItemsPerPage() {
		const itemsPerPage = [
			{
				title: '5',
				value: 5,
				hidden: false,
			},
			{
				title: '10',
				value: 10,
				hidden: false,
			},
			{
				title: '25',
				value: 25,
				hidden: false,
			},
			{
				title: '50',
				value: 50,
				hidden: false,
			},
			{
				title: '100',
				value: 100,
				hidden: false,
			},
		]
		return itemsPerPage
	},
	getStatusFilter() {
		const statusFilter = [
			{
				title: 'Filter by status',
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
		]
		return statusFilter
	},
	getAccountStatus() {
		const accountStatus = [
			{
				title: 'active',
				value: 'active',
				hidden: false,
			},
			{
				title: 'disabled',
				value: 'disabled',
				hidden: false,
			},
		]
		return accountStatus
	},
}
export default TableManager
