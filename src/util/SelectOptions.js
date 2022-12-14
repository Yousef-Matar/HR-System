var SelectOptions = {
	getNotificationTypes() {
		const notificationTypes = [
			{
				title: 'New Notifications',
				value: 'unread',
			},
			{
				title: 'Old Notifications',
				value: 'read',
			},
		]
		return notificationTypes
	},
	getDocumentStatus() {
		const documentsStatus = [
			{
				title: 'document status',
				value: '',
				hidden: true,
			},
			{
				title: 'All',
				value: 'all',
				hidden: false,
			},
			{
				title: 'Approved',
				value: 'approved',
				hidden: false,
			},
			{
				title: 'Pending',
				value: 'pending',
				hidden: false,
			},
			{
				title: 'Rejected',
				value: 'rejected',
				hidden: false,
			},
		]
		return documentsStatus
	},
	getDocumentFilters() {
		const documentsTypes = [
			{
				title: 'document type',
				value: '',
				hidden: true,
			},
			{
				title: 'All',
				value: 'all',
				hidden: false,
			},
			{
				title: 'Word Document',
				value: 'Word Document',
				hidden: false,
			},
			{
				title: 'Image',
				value: 'Image',
				hidden: false,
			},
			{
				title: 'PDF',
				value: 'PDF',
				hidden: false,
			},
		]
		return documentsTypes
	},
	getDocumentTypes() {
		const documentsTypes = [
			{
				title: 'document type',
				value: '',
				hidden: true,
			},
			{
				title: 'Word Document',
				value: 'Word Document',
				hidden: false,
			},
			{
				title: 'Image',
				value: 'Image',
				hidden: false,
			},
			{
				title: 'PDF',
				value: 'PDF',
				hidden: false,
			},
		]
		return documentsTypes
	},
	getAllDocumentTypes() {
		const documentTypes = [
			{
				title: 'Document Requests',
				value: 'DocumentRequests',
			},
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
	getEmployeeDocumentTypes() {
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
				title: 'Status Filter',
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
	getAccountStatusFilter() {
		const accountStatus = [
			{
				title: 'Account Status',
				value: '',
				hidden: true,
			},
			{
				title: 'All',
				value: 'all',
				hidden: false,
			},
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
	getHRRoles() {
		const hrRoles = [
			{
				title: 'Select a role',
				value: '',
				hidden: true,
			},
			{
				title: 'Human Resources',
				value: 'human resources',
				hidden: false,
			},
			{
				title: 'Employee',
				value: 'employee',
				hidden: false,
			},
		]
		return hrRoles
	},
	getSuperAdminRoles() {
		const superAdminRoles = [
			{
				title: 'Select a role',
				value: '',
				hidden: true,
			},
			{
				title: 'SuperAdmin',
				value: 'SuperAdmin',
				hidden: true,
			},
			{
				title: 'Admin',
				value: 'admin',
				hidden: false,
			},
			{
				title: 'Human Resources',
				value: 'human resources',
				hidden: false,
			},
			{
				title: 'Employee',
				value: 'employee',
				hidden: false,
			},
		]
		return superAdminRoles
	},
	getAdminRoles() {
		const adminRoles = [
			{
				title: 'Select a role',
				value: '',
				hidden: true,
			},
			{
				title: 'Admin',
				value: 'admin',
				hidden: false,
			},
			{
				title: 'Human Resources',
				value: 'human resources',
				hidden: false,
			},
			{
				title: 'Employee',
				value: 'employee',
				hidden: false,
			},
		]
		return adminRoles
	},
	getUniqueRoles(users) {
		var usersUniqueRoles = [...new Set(users.map(({ role }) => role))]
		var allUniqueRoles = [
			{
				title: 'Role Filter',
				value: '',
				hidden: true,
			},
			{
				title: 'all',
				value: 'all',
				hidden: false,
			},
		]
		usersUniqueRoles.forEach((role) => {
			allUniqueRoles.push({
				title: role,
				value: role,
				hidden: false,
			})
		})
		return allUniqueRoles
	},
}
export default SelectOptions
