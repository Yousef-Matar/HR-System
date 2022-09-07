<template>
	<div>
		<MainNavigation />
		<div class="mt-[102px] mb-[38px]" :class="checkActiveUser() ? 'ml-72 mr-[38px]' : 'mx-[38px]'">
			<router-view />
		</div>
		<WarningModal :show-modal="showWarning" @closeModal="showWarning = false" />
	</div>
</template>

<script>
import WarningModal from '@/components/modal/WarningModal'

import MainNavigation from '@/components/navigation/MainNavigation'

import AttendanceManager from '@/util/AttendanceManager'
import UsersManager from '@/util/UsersManager'

export default {
	name: 'App',
	components: { MainNavigation, WarningModal },

	data() {
		return {
			events: ['click', 'mousemove', 'mousedown', 'scroll', 'keypress', 'load'],
			warningTimer: null,
			logoutTimer: null,
			showWarning: false,
		}
	},
	mounted() {
		this.$store.commit('init')
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
			this.showWarning = true
		},
		checkActiveUser() {
			if (UsersManager.getActiveUser()) {
				return true
			} else {
				return false
			}
		},
		logout() {
			this.showWarning = false
			AttendanceManager.userCheckOut(UsersManager.getActiveUser())
			UsersManager.logout()
			this.$router.push('/')
		},
	},
}
</script>

<style>
html {
	min-height: 100vh;
	background: linear-gradient(to bottom right, #38a2d7, #561139);
}
body {
	font-family: 'Roboto', sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #18ffff;
}
button {
	max-width: 20rem;
}
details,
button,
label {
	user-select: none;
}
</style>
