<template>
	<div>
		<TopNavigation :user="getActiveUser" />
		<SideNavigation v-if="getActiveUser" :user="getActiveUser" />
	</div>
</template>

<script>
import SideNavigation from '@/components/navigation/util/SideNavigation'
import TopNavigation from '@/components/navigation/util/TopNavigation'

import UsersManager from '@/util/UsersManager'

export default {
	components: { TopNavigation, SideNavigation },
	computed: {
		getActiveUser() {
			return UsersManager.getActiveUser()
		},
	},
}
</script>

<style></style>
