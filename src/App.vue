<template>
	<div>
		<MainNavigation v-if="activeEmployee" @toggleSideNav="(hideNav) => (sideNavToggle = hideNav)" />
		<div class="mt-[102px] mb-[38px]" :class="editClass()">
			<router-view />
		</div>
		<WarningModal :show-modal="showWarning" @closeModal="showWarning = false" />
	</div>
</template>

<script>
import { mapState } from 'vuex'

import WarningModal from '@/components/modal/WarningModal'
import MainNavigation from '@/components/navigation/MainNavigation'

export default {
	name: 'App',
	components: { MainNavigation, WarningModal },

	data() {
		return {
			sideNavToggle: false,
			events: ['click', 'mousemove', 'mousedown', 'scroll', 'keypress', 'load'],
			warningTimer: null,
			logoutTimer: null,
			showWarning: false,
		}
	},
	computed: {
		...mapState(['activeEmployee']),
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
		editClass() {
			if (this.activeEmployee) {
				if (!this.sideNavToggle) {
					return 'active mr-[38px] hidden sm:block'
				} else {
					return 'mr-[38px] close'
				}
			} else {
				return 'mx-auto'
			}
		},
		resetTimer() {
			clearTimeout(this.warningTimer)
			clearTimeout(this.logoutTimer)
			this.setTimers()
		},
		setTimers() {
			if (this.activeEmployee) {
				this.warningTimer = setTimeout(this.warningMessage, 14 * 60 * 1000)
				this.logoutTimer = setTimeout(this.logout, 15 * 60 * 1000)
			}
		},
		warningMessage() {
			this.showWarning = true
		},
		logout() {
			this.showWarning = false
			this.$store.dispatch('logout').then(() => {
				this.$router.push('/Login')
			})
		},
	},
}
</script>

<style scoped>
.active {
	animation: slide-in 1000ms forwards;
}
.close {
	animation: slide-out 1000ms forwards;
}

@keyframes slide-out {
	0% {
		margin-left: 18rem;
	}
	100% {
		margin-left: 38px;
	}
}

@keyframes slide-in {
	0% {
		margin-left: 0rem;
	}
	100% {
		margin-left: 18rem;
	}
}
</style>
