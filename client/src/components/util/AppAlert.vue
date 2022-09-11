<template>
	<div v-if="show" :class="getAlertClass">
		<font-awesome-icon :icon="icon" />&nbsp;
		<strong>{{ `${variant.substring(0, 1).toUpperCase()}${variant.substring(1)}` }}&nbsp;</strong>
		{{ text }}
	</div>
</template>

<script>
export default {
	props: {
		show: {
			type: Boolean,
			required: true,
			default: false,
		},
		text: {
			type: String,
			required: true,
			default: 'Alert',
		},
		variant: {
			type: String,
			default: 'info',
			validator: (value) => ['info', 'error', 'success', 'warning'].includes(value),
		},
		icon: {
			type: String,
			default: 'fa fa-exclamation-triangle',
		},
	},
	computed: {
		getAlertClass() {
			var alertClass = 'alert text-lg p-5 w-full absolute top-0 left-0 z-[60] text-center text-background'
			switch (this.variant) {
				case 'error':
					return (alertClass += ' bg-red-500')
				case 'success':
					return (alertClass += ' bg-green-500')
				case 'warning':
					return (alertClass += ' bg-yellow-500')
				default:
					return (alertClass += ' bg-primary')
			}
		},
	},
}
</script>

<style scoped>
.alert {
	animation: alert-box 1.5s ease;
}
@keyframes alert-box {
	0% {
		top: -10%;
	}
	100% {
		top: 0%;
	}
}
</style>
