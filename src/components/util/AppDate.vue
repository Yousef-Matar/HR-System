<template>
	<div>
		<div class="inputGroup">
			<input
				v-model="inputDate"
				type="date"
				class="opacity-0"
				:min="min.toISOString().substring(0, 10)"
				@change="(event) => $emit(inputID + 'Change', outputDate)"
			>
			<input
				:id="inputID"
				v-model="inputContent"
				type="text"
				placeholder=" "
				required="true"
				:disabled="disabled"
				autocomplete="off"
			>

			<label :for="inputID">{{ inputLabel }}</label>
		</div>
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
			type: Date,
			default: new Date(),
		},
		inputLabel: {
			type: String,
			required: true,
			default: 'Input Label',
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		min: {
			type: Date,
			default: new Date(),
		},
	},
	data() {
		return {
			inputDate: this.inputValue.toISOString().substring(0, 10),
			inputContent: this.inputValue.toLocaleDateString(),
			outputDate: this.inputValue,
		}
	},
	watch: {
		inputDate(newDate) {
			this.inputContent = new Date(newDate).toLocaleDateString()
			this.outputDate = new Date(newDate)
		},
	},
}
</script>
<style scoped>
.inputGroup input[type='date'] {
	z-index: 1;
}
.inputGroup input[type='date']::-webkit-calendar-picker-indicator {
	position: absolute;
	left: 0;
	top: 0;
	width: 20rem;
	height: 3rem;
	margin: 0;
	padding: 0;
	cursor: pointer;
}
.inputGroup input[type='date']:hover ~ input,
.inputGroup input[type='date']:focus ~ input {
	border-color: #18ffff;
}
</style>
