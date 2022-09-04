<template>
	<div class="w-80">
		<div :for="textAreaID" class="inline-block mb-3 text-left">
			{{ inputLabel }}
		</div>
		<textarea
			:id="textAreaID"
			v-model="inputContent"
			class="block w-full p-2 text-base font-normal text-white bg-gray-800 bg-clip-padding border border-gray-600 rounded-3xl m-0 shadow hover:shadow-[#adffff] focus:border-[#adffff] focus:outline-none"
			:rows="rows"
			:required="required"
			:disabled="disabled"
			@input="(event) => $emit(textAreaID + 'Change', inputContent)"
		/>
	</div>
</template>

<script>
export default {
	props: {
		textAreaID: {
			type: String,
			required: true,
		},
		value: {
			type: String,
			default: null,
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
		rows: {
			type: Number,
			default: 5,
		},
	},
	data() {
		return {
			inputContent: this.value,
		}
	},
}
</script>

<style></style>
