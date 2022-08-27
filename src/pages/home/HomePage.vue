<template>
	<UserSummary v-if="getActiveUser()" />
	<div v-else class="mx-auto p-8 rounded-3xl bg-background flex flex-col gap-8 w-fit">
		<h1 class="text-6xl">
			Welcome to HR-System
		</h1>
	</div>
</template>

<script>
import UserSummary from '@/components/dashboard/UserSummary'

import UsersManager from '@/util/UsersManager'

export default {
	components: { UserSummary },
	methods: {
		getActiveUser() {
			return UsersManager.getActiveUser()
		},
	},
}
</script>

<style></style>
