<template>
	<div class="mx-auto p-8 rounded-3xl bg-background w-fit flex flex-col items-center">
		<h1 class="text-2xl mb-3">
			Register
		</h1>
		<div v-if="error != ''" class="mb-8">
			<form-errors :error="error" />
		</div>
		<form class="formContainer" @submit.prevent="validateForm">
			<v-input
				:input-i-d="'username'"
				:type="'text'"
				:input-label="'Username'"
				:input-value="form.username"
				@usernameChange="(inputContent) => (form.username = inputContent)"
			/>
			<v-input
				:input-i-d="'firstName'"
				:type="'text'"
				:input-label="'First Name'"
				:input-value="form.firstName"
				@firstNameChange="(inputContent) => (form.firstName = inputContent)"
			/>
			<v-input
				:input-i-d="'lastName'"
				:type="'text'"
				:input-label="'Last Name'"
				:input-value="form.lastName"
				@lastNameChange="(inputContent) => (form.lastName = inputContent)"
			/>

			<v-input
				:input-i-d="'password'"
				:type="'password'"
				:input-label="'Password'"
				:input-value="form.password"
				@passwordChange="(inputContent) => (form.password = inputContent)"
			/>
			<v-input
				:input-i-d="'confirmPassword'"
				:type="'password'"
				:input-label="'Confirm Password'"
				:input-value="confirmPassword"
				@confirmPasswordChange="(inputContent) => (confirmPassword = inputContent)"
			/>
			<v-button
				class="w-full"
				:text="'Sign Up'"
				:type="'submit'"
			/>
			<v-button
				class="w-full"
				:text="'Already have an account ?'"
				:type="'button'"
				:method=" () => { $router.push('/Login') } "
			/>
		</form>
	</div>
</template>

<script>
import { mapState } from 'vuex'

import FormValidation from '@/util/FormValidation'

export default {
	data() {
		return {
			form: {
				username: '',
				password: '',
				firstName: '',
				lastName: '',
				yearlyVacation: 21,
				role: 'employee',
				status: 'active',
			},
			confirmPassword: '',
		}
	},
	computed: {
		...mapState(['error']),
	},
	methods: {
		validateForm() {
			if (FormValidation.notMatching(this.form.password, this.confirmPassword)) {
				this.$store.dispatch('setError', 'Passwords do not match.')
			} else {
				this.$store.dispatch('hideError')
			}
			if (this.error == '') {
				this.submit()
			}
		},
		submit() {
			this.$store.dispatch('register', this.form).then(() => {
				this.$router.push('/')
			})
		},
	},
}
</script>

<style></style>
