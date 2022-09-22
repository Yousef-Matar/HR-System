<template>
	<div class="inputGroup">
		<input
			:id="inputID"
			v-model="inputContent"
			:class="transparent ? 'transparentContent' : ''"
			:type="type"
			placeholder=" "
			:required="required"
			:disabled="disabled"
			:min="min"
			:max="max"
			:step="step"
			:autocomplete="autocomplete"
			@input="(event) => $emit(inputID + 'Change', inputContent)"
		>
		<div v-if="type == 'number'" class="flex justify-between items-center h-full">
			<font-awesome-icon
				class="qty-btn btn-l shadow-inner hover:shadow-[#adffff]"
				icon="fa fa-minus"
				@click="decrement"
			/>
			<font-awesome-icon
				class="qty-btn btn-r shadow-inner hover:shadow-[#adffff]"
				icon="fa fa-plus"
				@click="increment"
			/>
		</div>
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
			type: [String, Number],
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
		min: {
			type: Number,
			default: 0,
		},
		max: {
			type: Number,
			default: 744,
		},
		step: {
			type: Number,
			default: 1,
		},
		autocomplete: {
			type: String,
			default: 'off',
		},
		transparent: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			inputContent: '',
		}
	},
	watch: {
		inputValue: {
			handler(newData) {
				this.inputContent = newData
			},
			// force eager callback execution
			immediate: true,
		},
	},
	methods: {
		increment() {
			this.inputContent += this.step
			if (this.inputContent > this.max) this.inputContent = this.max
			this.$emit(this.inputID + 'Change', this.inputContent)
		},
		decrement() {
			this.inputContent -= this.step
			if (this.inputContent < this.min) this.inputContent = this.min
			this.$emit(this.inputID + 'Change', this.inputContent)
		},
	},
}
</script>
<style></style>
