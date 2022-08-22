<template>
	<div class="sidenav px-3 py-2">
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
	},
	data() {
		return {
			sideNavigationLinks: [],
		}
	},
	mounted() {
		if (this.user == null) {
			this.sideNavigationLinks = []
		} else if (this.user.role == 'admin') {
			this.sideNavigationLinks = [
				{ title: 'My Attendance', to: '/Attendance', icon: 'fa fa-calendar-alt' },
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
						{ title: 'Request Vacation', to: '/Vacations', icon: 'fa fa-users' },
						{ title: 'Vacation Requests', to: '/VacationRequests', icon: 'fa fa-users' },
						{ title: 'Approve Vacations', to: '/VacationApproval', icon: 'fa fa-users' },
					],
				},
			]
		} else if (this.user.role == 'human resources') {
			this.sideNavigationLinks = [
				{ title: 'My Attendance', to: '/Attendance', icon: 'fa fa-calendar-alt' },
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
						{ title: 'Request Vacation', to: '/Vacations', icon: 'fa fa-users' },
						{ title: 'Vacation Requests', to: '/VacationRequests', icon: 'fa fa-users' },
						{ title: 'Approve Vacations', to: '/VacationApproval', icon: 'fa fa-users' },
					],
				},
			]
		} else if (this.user.role == 'employee') {
			this.sideNavigationLinks = [
				{ title: 'My Attendance', to: '/Attendance', icon: 'fa fa-calendar-alt' },
				{
					title: 'Vacations',
					children: [
						{ title: 'Request Vacation', to: '/Vacations', icon: 'fa fa-users' },
						{ title: 'Vacation Requests', to: '/VacationRequests', icon: 'fa fa-users' },
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
	display: flex;
	height: 100%;
	width: 250px;
	z-index: 1;
	top: 4rem;
	gap: 4px;
	left: 0;
}
.sidenav a {
	width: 100%;
}
</style>
