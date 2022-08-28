<template>
	<div>
		<div class="inputGroup">
			<input
				v-model="inputDate"
				type="date"
				class="hide"
				required="true"
				:disabled="disabled"
				:min="min.toISOString().substring(0, 10)"
				:max="max.toISOString().substring(0, 10)"
				@change="(event) => $emit(inputID + 'Change', outputDate)"
			>
			<input
				:id="inputID"
				v-model="inputContent"
				type="text"
				placeholder=" "
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
		max: {
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
.hide {
	opacity: 0 !important;
}
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
.inputGroup input[type='date']:disabled ~ input {
	cursor: not-allowed;
	opacity: 0.7;
	color: #d1d5db;
	border-color: #767676ba;
}
</style>
