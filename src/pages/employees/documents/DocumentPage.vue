<template>
	<div class="p-8 rounded-3xl bg-background flex flex-col gap-8">
		<div class="w-full h-16 items-center flex text-sm p-2 gap-5">
			<v-button
				v-for="document in documentTypes"
				:key="document.title"
				class="w-full"
				:text="document.title"
				:has-border="documentType == document.value ? true : false"
				:method=" () => { documentType = document.value } "
			/>
		</div>
		<component :is="documentType" />
	</div>
</template>

<script>
import MyDocuments from '@/pages/employees/documents/util/MyDocuments'
import RequestDocument from '@/pages/employees/documents/util/RequestDocument'
import SubmitDocument from '@/pages/employees/documents/util/SubmitDocument'

import TableManager from '@/util/TableManager'

export default {
	components: { RequestDocument, SubmitDocument, MyDocuments },
	data() {
		return {
			documentType: TableManager.getDocumentTypes()[0].value,
			documentTypes: TableManager.getDocumentTypes(),
		}
	},
}
</script>

<style></style>
