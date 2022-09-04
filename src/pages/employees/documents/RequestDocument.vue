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
import AccidentReport from '@/pages/employees/documents/util/AccidentReport'
import EmployeeComplaint from '@/pages/employees/documents/util/EmployeeComplaint'
import EndOfYearFeedback from '@/pages/employees/documents/util/EndOfYearFeedback'
import ExitInterview from '@/pages/employees/documents/util/ExitInterview'
import JobSatisfaction from '@/pages/employees/documents/util/JobSatisfaction'
import ReturnToWork from '@/pages/employees/documents/util/ReturnToWork'

import TableManager from '@/util/TableManager'

export default {
	components: { AccidentReport, EmployeeComplaint, EndOfYearFeedback, JobSatisfaction, ExitInterview, ReturnToWork },
	data() {
		return {
			documentType: '',
			documentTypes: TableManager.getDocumentTypes(),
		}
	},
}
</script>

<style></style>
