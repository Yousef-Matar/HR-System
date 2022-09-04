var TableManager = {
	getDocumentTypes(){
		const documentTypes = [
         {
				title: 'Select a document type',
				value: '',
				hidden: true,
			},
			{
				title: 'Return to Work',
				value: 'ReturnToWork',
				hidden: false,
			},
			{
				title: 'Accident Report',
				value: 'AccidentReport',
				hidden: false,
			},
			{
				title: 'Exit Interview',
				value: 'ExitInterview',
				hidden: false,
			},
			{
				title: 'Job Satisfaction',
				value: 'JobSatisfaction',
				hidden: false,
			},
			{
				title: 'End of Year Feedback',
				value: 'EndOfYearFeedback',
				hidden: false,
			},
			{
				title: 'Military Leave',
				value: 'Military Leave',
				hidden: false,
			},
			{
				title: 'Complaint',
				value: 'EmployeeComplaint',
				hidden: false,
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
}
export default TableManager
