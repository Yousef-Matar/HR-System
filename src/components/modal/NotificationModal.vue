<template>
	<teleport to="body">
		<v-modal
			v-if="openModal"
			:variant="'primary'"
			@closeModal="$emit('closeModal')"
		>
			<template #ModalHeader>
				<div class="w-full h-fit items-center flex text-sm p-2 gap-5 overflow-x-auto">
					<v-button
						v-for="notification in notificationTypes"
						:key="notification.title"
						class="w-full min-h-[3rem] whitespace-nowrap"
						:text="notification.title"
						:has-border="notificationType == notification.value ? true : false"
						:method=" () => { notificationType = notification.value } "
					/>
				</div>
			</template>
			<template #ModalBody>
				<div class="flex flex-col gap-1 overflow-y-auto max-h-80">
					<template v-if="notificationType == 'read'">
						<v-notification
							v-for="notification in notifications.read"
							:key="notification.id"
							:notification="notification"
							@readNotification="readNotification"
						/>
						<div v-if="notifications.read.length == 0" class="text-left p-2 text-sm font-normal text-gray-400 bg-gray-800 bg-clip-padding border shadow border-gray-600 rounded">
							No read notification.
						</div>
					</template>
					<template v-else-if="notificationType == 'unread'">
						<v-notification
							v-for="notification in notifications.unread"
							:key="notification.id"
							:notification="notification"
							@readNotification="readNotification"
						/>
						<div v-if="notifications.unread.length == 0" class="text-left p-2 text-sm font-normal text-gray-400 bg-gray-800 bg-clip-padding border shadow border-gray-600 rounded">
							No new notifications yet.
						</div>
					</template>
				</div>
			</template>
		</v-modal>
	</teleport>
</template>
<script>

import SelectOptions from '@/util/SelectOptions'

export default {
	props: {
		openModal: {
			type: Boolean,
			required: true,
		},
	},
	emits: ['closeModal'],
	data() {
		return {
			notificationType: SelectOptions.getNotificationTypes()[0].value,
			notificationTypes: SelectOptions.getNotificationTypes(),
			notifications: {
				read: [],
				unread: [
					{
						ID: 1,
						content: 'Notification 1',
						status: 'unread',
					},
				],
			},
		}
	},
	
	
	methods: {
		readNotification(notificationID) {
			let readNotification = this.notifications.unread.find((notification) => notification.ID == notificationID)
			readNotification.status = 'read'
			this.notifications.unread = this.notifications.unread.filter((notification) => notification.ID != notificationID)
			this.notifications.read.push(readNotification)
		},
	},
}
</script>
<style></style>
