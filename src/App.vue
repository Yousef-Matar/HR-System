<template>
	<div>
		<TopNavigation />
		<SideNavigation />
		<div class="mt-14" :class="checkActiveUser() ? 'ml-[250px]' : ''">
			<router-view />
		</div>
	</div>
</template>

<script>
import SideNavigation from '@/components/navigation/SideNavigation'
import TopNavigation from '@/components/navigation/TopNavigation'

import AttendanceManager from '@/util/AttendanceManager'
import UsersManager from '@/util/UsersManager'

export default {
	name: 'App',
	components: { TopNavigation, SideNavigation },

	data() {
		return {
			events: ['click', 'mousemove', 'mousedown', 'scroll', 'keypress', 'load'],
			warningTimer: null,
			logoutTimer: null,
		}
	},
	mounted() {
		this.events.forEach((event) => {
			window.addEventListener(event, this.resetTimer)
		})
		this.setTimers()
	},
	Unmounted() {
		this.events.forEach((event) => {
			window.removeEventListener(event, this.resetTimer)
		})
		this.resetTimer()
	},
	methods: {
		resetTimer() {
			clearTimeout(this.warningTimer)
			clearTimeout(this.logoutTimer)
			this.setTimers()
		},
		setTimers() {
			if (UsersManager.getActiveUser() !== null) {
				this.warningTimer = setTimeout(this.warningMessage, 14 * 60 * 1000)
				this.logoutTimer = setTimeout(this.logout, 15 * 60 * 1000)
			}
		},
		warningMessage() {
			alert('Due to inactivity you will be logged out soon')
		},
		checkActiveUser() {
			if (UsersManager.getActiveUser()) {
				return true
			} else {
				return false
			}
		},
		logout() {
			AttendanceManager.userCheckOut(UsersManager.getActiveUser())
			UsersManager.logout()
		},
	},
}
</script>

<style>
#app {
	font-family: 'Roboto', sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #18ffff;
	min-height: 100vh;
	background-image: linear-gradient(to bottom right, #38a2d7, #561139);
}
</style>
