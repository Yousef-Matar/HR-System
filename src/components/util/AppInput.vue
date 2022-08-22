<template>
	<div class="inputGroup">
		<input
			:id="inputID"
			v-model="inputContent"
			:type="type"
			placeholder=" "
			:required="required"
			:disabled="disabled"
			@input="(event) => $emit(inputID + 'Change', inputContent)"
		>
		<label :for="inputID">{{ inputLabel }}</label>
	</div>
</template>

<script>
export default {
	props: {
		inputID: {
			type: String,
			required: true,
		},
		inputValue: {
			type: String || Number || Object,
			default: null,
		},
		type: {
			type: String,
			default: 'text',
			validator: (value) => ['text', 'password', 'number'].includes(value),
		},
		inputLabel: {
			type: String,
			required: true,
			default: 'Input Label',
		},
		required: {
			type: Boolean,
			default: true,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			inputContent: this.inputValue,
		}
	},
}
</script>
