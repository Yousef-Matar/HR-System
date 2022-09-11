<template>
	<div class="sidenav px-3 py-2" :class="hideNav ? 'close' : 'active'">
		<template v-for="link in sideNavigationLinks">
			<n-accordion
				v-if="link.children"
				:key="'accordion' + link.title"
				:link="link"
				class="w-full"
			/>
			<router-link
				v-else
				:key="'button' + link.title"
				class="w-full text-left text-base rounded-3xl p-2 shadow text-primary border-primary hover:shadow-[#adffff]"
				:to="link.to"
			>
				<font-awesome-icon :icon="link.icon" /> &nbsp;
				{{ link.title }}
			</router-link>
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
	watch: {
		user: {
			handler(newUser) {
				if (newUser == null) {
					this.sideNavigationLinks = []
				} else if (newUser.role == 'admin' || newUser.role === 'SuperAdmin') {
					this.sideNavigationLinks = [
						{ title: 'Dashboard', to: '/', icon: 'fa fa-home' },
						{ title: 'Documents', to: '/Documents', icon: 'fa fa-file-contract' },
						{ title: 'My Attendance', to: { name: 'Attendance', params: { username: newUser.username } }, icon: 'fa fa-calendar-alt' },
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
				} else if (newUser.role == 'human resources') {
					this.sideNavigationLinks = [
						{ title: 'Dashboard', to: '/', icon: 'fa fa-home' },
						{ title: 'Documents', to: '/Documents', icon: 'fa fa-file-contract' },
						{ title: 'My Attendance', to: { name: 'Attendance', params: { username: newUser.username } }, icon: 'fa fa-calendar-alt' },
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
				} else if (newUser.role == 'employee') {
					this.sideNavigationLinks = [
						{ title: 'Dashboard', to: '/', icon: 'fa fa-home' },
						{ title: 'Documents', to: '/Documents', icon: 'fa fa-file-contract' },
						{ title: 'My Attendance', to: { name: 'Attendance', params: { username: newUser.username } }, icon: 'fa fa-calendar-alt' },
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
			// force eager callback execution
			immediate: true,
		},
	},
	mounted() {
		// Fetch all the details element.
		const details = document.querySelectorAll('details')

		// Add the onclick listeners.
		details.forEach((targetDetail) => {
			targetDetail.addEventListener('click', () => {
				// Close all the details that are not targetDetail.
				details.forEach((detail) => {
					if (detail !== targetDetail) {
						detail.removeAttribute('open')
					}
				})
			})
		})
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
	max-width: 250px;
	position: fixed;
	display: flex;
	height: 100%;
	width: 100vw;
	z-index: 1;
	top: 4rem;
	gap: 4px;
	left: 0;
}
.sidenav a {
	width: 100%;
}
.router-link-active {
	border-width: 1px;
}
.sidenav.active {
	animation: slide-in 1000ms forwards;
}
.sidenav.close {
	animation: slide-out 1000ms forwards;
}

@keyframes slide-out {
	0% {
		transform: translateX(0%);
	}
	100% {
		transform: translateX(-100%);
	}
}

@keyframes slide-in {
	0% {
		transform: translateX(-100%);
	}
	100% {
		transform: translateX(0%);
	}
}
</style>
