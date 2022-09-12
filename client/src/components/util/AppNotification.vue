<template>
	<div class="p-2 text-sm font-normal text-gray-400 bg-gray-800 bg-clip-padding border shadow border-gray-600 rounded m-0 flex justify-between items-center gap-3">
		<div class="flex items-start flex-col text-left">
			<p>{{ notification.content }}</p>
		</div>
		<div class="flex gap-3">
			<font-awesome-icon
				v-if="notification.status == 'unread'"
				icon="fa fa-exclamation-circle"
				size="xl"
				class="cursor-pointer hover:text-primary"
				@click="read"
			/>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		notification: {
			type: Object,
			required: true,
		},
	},
	methods: {
		read() {
			this.$emit('readNotification', this.notification.ID)
		},
	},
}
</script>

<style></style>
