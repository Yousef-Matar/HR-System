<template>
	<div v-if="getActiveUser()">
		<UserSummary />
	</div>
	<div v-else class="mx-auto bg-background p-10 w-max rounded-3xl">
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
