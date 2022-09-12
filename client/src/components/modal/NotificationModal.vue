<template>
	<span class="flex items-center mx-2">
		<div class="relative cursor-pointer rounded-3xl p-2 shadow text-primary hover:shadow-[#adffff]" @click="openModal">
			<font-awesome-icon icon="fa fa-bell" size="xl" />
			<span v-if="notifications.unread.length" class="badge">{{ notifications.unread.length }}</span>
		</div>
		<teleport to="body">
			<v-modal
				v-if="isModalOpen"
				:variant="'primary'"
				@closeModal="isModalOpen = !isModalOpen"
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
						<v-notification
							v-for="notification in notifications[notificationType]"
							:key="notification.ID"
							:notification="notification"
							@readNotification="readNotification"
						/>
						<div v-if="notificationType == 'read' && notifications.read.length == 0" class="text-left p-2 text-sm font-normal text-gray-400 bg-gray-800 bg-clip-padding border shadow border-gray-600 rounded">No read notification.</div>
						<div v-if="notificationType == 'unread' && notifications.unread.length == 0" class="text-left p-2 text-sm font-normal text-gray-400 bg-gray-800 bg-clip-padding border shadow border-gray-600 rounded">No new notifications yet.</div>
					</div>
				</template>
			</v-modal>
		</teleport>
	</span>
</template>
<script>
import SelectOptions from '@/util/SelectOptions'

export default {
	data() {
		return {
			isModalOpen: false,
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
		openModal() {
			this.isModalOpen = true
		},
		readNotification(notificationID) {
			let readNotification = this.notifications.unread.find((notification) => notification.ID == notificationID)
			readNotification.status = 'read'
			this.notifications.unread = this.notifications.unread.filter((notification) => notification.ID != notificationID)
			this.notifications.read.push(readNotification)
		},
	},
}
</script>
<style scoped>
.badge {
	position: absolute;
	top: -10px;
	right: -10px;
	padding: 5px 10px;
	border-radius: 50%;
	background-color: #ef4444;
	color: #18ffff;
}
</style>
