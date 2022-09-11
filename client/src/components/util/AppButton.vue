<template>
	<button
		:type="type"
		:class="getButtonClass"
		:disabled="disabled"
		@click="method"
	>
		<template v-if="icon">
			<font-awesome-icon :icon="icon" /> &nbsp;
		</template>
		{{ text }}
	</button>
</template>

<script>
export default {
	props: {
		type: {
			type: String,
			default: 'button',
			validator: (value) => ['submit', 'reset', 'button'].includes(value),
		},
		text: {
			type: String,
			required: true,
			default: 'Button',
		},
		variant: {
			type: String,
			default: 'primary',
			validator: (value) => ['primary', 'danger'].includes(value),
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		hasBorder: {
			type: Boolean,
			default: true,
		},
		method: {
			type: Function,
			default: null,
		},
		icon: {
			type: String,
			default: null,
		},
	},
	computed: {
		getButtonClass() {
			var buttonClass = 'text-base rounded-3xl p-2 shadow'
			if (this.hasBorder) {
				buttonClass += ' border'
			}
			if (this.disabled) {
				buttonClass += ' cursor-not-allowed opacity-70 text-gray-300 border-[#767676ba]'
			} else {
				if (this.variant.toLowerCase() == 'danger') {
					buttonClass += ' text-red-500 border-red-600 hover:shadow-red-500'
				}
				if (this.variant.toLowerCase() == 'primary') {
					buttonClass += ' text-primary border-primary hover:shadow-[#adffff]'
				}
			}
			return buttonClass
		},
	},
}
</script>

<style></style>
