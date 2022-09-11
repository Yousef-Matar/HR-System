<template>
	<div>
		<TopNavigation :user="getActiveUser" @toggleSideNav="toggleSideNav" />
		<SideNavigation
			v-if="getActiveUser"
			:hide-nav="hideNav"
			:user="getActiveUser"
		/>
	</div>
</template>

<script>
import SideNavigation from '@/components/navigation/util/SideNavigation'
import TopNavigation from '@/components/navigation/util/TopNavigation'

import UsersManager from '@/util/UsersManager'

export default {
	components: { TopNavigation, SideNavigation },
	data() {
		return {
			hideNav: false,
		}
	},
	computed: {
		getActiveUser() {
			return UsersManager.getActiveUser()
		},
	},
	methods: {
		toggleSideNav() {
			this.hideNav = !this.hideNav
			this.$emit('toggleSideNav', this.hideNav)
		},
	},
}
</script>

<style></style>
