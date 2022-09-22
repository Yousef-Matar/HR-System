<template>
	<div>
		<TopNavigation @toggleSideNav="toggleSideNav" />
		<SideNavigation :hide-nav="hideNav" />
	</div>
</template>

<script>
import SideNavigation from '@/components/navigation/util/SideNavigation'
import TopNavigation from '@/components/navigation/util/TopNavigation'

export default {
	components: { TopNavigation, SideNavigation },
	data() {
		return {
			hideNav: false,
		}
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
