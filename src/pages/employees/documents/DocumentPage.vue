<template>
	<div class="p-8 rounded-3xl bg-background flex flex-col gap-8">
		<div class="w-full h-fit items-center flex text-sm p-2 gap-5 overflow-x-auto">
			<v-button
				v-for="document in documentTypes"
				:key="document.title"
				class="w-full min-h-[3rem] whitespace-nowrap"
				:text="document.title"
				:has-border="documentType == document.value ? true : false"
				:method=" () => { documentType = document.value } "
			/>
		</div>
		<component :is="documentType" />
	</div>
</template>

<script>
import DocumentRequests from '@/pages/employees/documents/util/DocumentRequests'
import MyDocuments from '@/pages/employees/documents/util/MyDocuments'
import RequestDocument from '@/pages/employees/documents/util/RequestDocument'
import SubmitDocument from '@/pages/employees/documents/util/SubmitDocument'

import SelectOptions from '@/util/SelectOptions'
import UsersManager from '@/util/UsersManager'

export default {
	components: { RequestDocument, SubmitDocument, MyDocuments, DocumentRequests },
	data() {
		return {
			documentType: UsersManager.getActiveUser().role == 'employee' ? SelectOptions.getEmployeeDocumentTypes()[0].value : SelectOptions.getAllDocumentTypes()[0].value,
			documentTypes: UsersManager.getActiveUser().role == 'employee' ? SelectOptions.getEmployeeDocumentTypes() : SelectOptions.getAllDocumentTypes(),
		}
	},
}
</script>

<style></style>
