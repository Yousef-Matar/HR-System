<template>
	<div class="sidenav px-3 py-2" :class="hideNav ? 'hidden' : 'flex'">
		<template v-for="link in sideNavigationLinks">
			<n-accordion
				v-if="link.children"
				:key="'accordion' + link.title"
				:link="link"
				class="w-full"
			/>
			<v-button
				v-else
				:key="'button' + link.title"
				class="w-full text-left"
				:text="link.title"
				:icon="link.icon"
				:has-border="false"
				:method=" () => { $router.push(link.to) } "
			/>
		</template>
	</div>
</template>

<script>
export default {
	props: {
		user: {
			type: Object,
			default: null,
		},
		hideNav: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			sideNavigationLinks: [],
		}
	},
	mounted() {
		if (this.user == null) {
			this.sideNavigationLinks = []
		} else if (this.user.role == 'admin' || this.user.role === 'SuperAdmin') {
			this.sideNavigationLinks = [
				{ title: 'Dashboard', to: '/', icon: 'fa fa-home' },
				{ title: 'Documents', to: '/Documents', icon: 'fa fa-file-contract' },
				{ title: 'My Attendance', to: { name: 'Attendance', params: { username: this.user.username } }, icon: 'fa fa-calendar-alt' },
				{ title: 'Set Monthly Hours', to: '/Hours', icon: 'fa fa-clock' },
				{
					title: 'Employees',
					children: [
						{ title: 'View All', to: '/Employees', icon: 'fa fa-users' },
						{ title: 'Attendance', to: '/Attendance', icon: 'fa fa-calendar-alt' },
					],
				},
				{
					title: 'Vacations',
					children: [
						{ title: 'Request Vacation', to: '/Vacations' },
						{ title: 'My Requests', to: '/VacationRequests' },
						{ title: 'View All', to: '/VacationApproval' },
					],
				},
			]
		} else if (this.user.role == 'human resources') {
			this.sideNavigationLinks = [
				{ title: 'Dashboard', to: '/', icon: 'fa fa-home' },
				{ title: 'Documents', to: '/Documents', icon: 'fa fa-file-contract' },
				{ title: 'My Attendance', to: { name: 'Attendance', params: { username: this.user.username } }, icon: 'fa fa-calendar-alt' },
				{ title: 'Set Monthly Hours', to: '/Hours', icon: 'fa fa-clock' },
				{
					title: 'Employees',
					children: [
						{ title: 'View All', to: '/Employees', icon: 'fa fa-users' },
						{ title: 'Attendance', to: '/Attendance', icon: 'fa fa-calendar-alt' },
					],
				},
				{
					title: 'Vacations',
					children: [
						{ title: 'Request Vacation', to: '/Vacations' },
						{ title: 'My Requests', to: '/VacationRequests' },
						{ title: 'View All', to: '/VacationApproval' },
					],
				},
			]
		} else if (this.user.role == 'employee') {
			this.sideNavigationLinks = [
				{ title: 'Dashboard', to: '/', icon: 'fa fa-home' },
				{ title: 'Documents', to: '/Documents', icon: 'fa fa-file-contract' },
				{ title: 'My Attendance', to: { name: 'Attendance', params: { username: this.user.username } }, icon: 'fa fa-calendar-alt' },
				{
					title: 'Vacations',
					children: [
						{ title: 'Request Vacation', to: '/Vacations' },
						{ title: 'My Requests', to: '/VacationRequests' },
					],
				},
			]
		}
	},
}
</script>

<style scoped>
.sidenav {
	background-color: #060b23;
	align-items: flex-start;
	flex-direction: column;
	overflow-x: hidden;
	text-align: left;
	position: fixed;
	height: 100%;
	max-width: 425px;
	width: 100vw;
	z-index: 1;
	top: 4rem;
	gap: 4px;
	left: 0;
}
.sidenav a {
	width: 100%;
}
</style>
