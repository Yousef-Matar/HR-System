<template>
	<div class="p-8 rounded-3xl bg-background flex flex-col gap-8">
		<v-select
			:select-i-d="'document'"
			:select-label="'Document Type'"
			:select-value="documentType"
			:items="documentTypes"
			:required="false"
			@documentChange="(selectContent) => (documentType = selectContent)"
		/>
		<component
			:is="documentType"
			v-if="documentType != ''"
			class="self-center"
		/>
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
			documentType: '',
			documentTypes: TableManager.getDocumentTypes(),
		}
	},
}
</script>

<style></style>
