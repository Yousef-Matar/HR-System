<template>
	<teleport to="body">
		<v-modal
			v-if="openModal"
			:variant="'primary'"
			@closeModal="$emit('closeModal')"
		>
			<template v-if="mode == 'create'" #ModalHeader>
				Add New User
			</template>
			<template v-else-if="mode == 'profile'" #ModalHeader>
				Account Details
			</template>
			<template v-else-if="mode == 'update'" #ModalHeader>
				Update User
			</template>
			<template #ModalBody>
				<div class="w-full flex justify-center">
					<form class="formContainer" @submit.prevent="validateForm">
						<div v-if="errors.length">
							<form-errors
								v-for="error in errors"
								:key="error.message"
								:error="error"
							/>
						</div>
						<div class="flex flex-wrap gap-8 justify-center">
							<v-input
								:input-i-d="'username'"
								:type="'text'"
								:input-label="'Username'"
								:input-value="form.username"
								@usernameChange="(inputContent) => (form.username = inputContent)"
							/>

							<v-input
								:input-i-d="'password'"
								:type="text"
								:input-label="'Password'"
								:input-value="dummyPassword"
								:transparent="mode == 'create' ? false : true"
								:disabled="mode == 'update' ? true : false"
								:required="mode == 'create' ? true : false"
								@passwordChange="(inputContent) => (dummyPassword = inputContent)"
							/>
						</div>
						<div class="flex flex-wrap gap-8 justify-center">
							<v-input
								:input-i-d="'firstName'"
								:type="'text'"
								:input-label="'First Name'"
								:input-value="form.firstName"
								:disabled="mode == 'update' ? true : false"
								@firstNameChange="(inputContent) => (form.firstName = inputContent)"
							/>
							<v-input
								:input-i-d="'lastName'"
								:type="'text'"
								:input-label="'Last Name'"
								:input-value="form.lastName"
								:disabled="mode == 'update' ? true : false"
								@lastNameChange="(inputContent) => (form.lastName = inputContent)"
							/>
						</div>
						<div class="flex flex-wrap gap-8 justify-center">
							<v-select
								:select-i-d="'role'"
								:disabled="mode != 'profile' ? false : true"
								:select-value="form.role"
								:items="roles"
								:select-label="'Account Role'"
								@roleChange="(selectContent) => (form.role = selectContent)"
							/>
							<v-select
								:select-i-d="'accountStatus'"
								:disabled="mode != 'profile' ? false : true"
								:select-value="form.status"
								:items="accountStatus"
								:select-label="'Account Status'"
								@accountStatusChange="(selectContent) => (form.status = selectContent)"
							/>
						</div>
						<div class="flex flex-wrap gap-8 justify-center">
							<v-button
								:type="'submit'"
								:disabled="disableUpdateButton"
								:text="mode == 'create' ? 'Add User' : 'Update'"
								class="w-full"
							/>
							<v-button
								:type="'button'"
								:text="'Cancel'"
								:variant="'danger'"
								:method="() => $emit('closeModal')"
								class="w-full"
							/>
						</div>
					</form>
				</div>
			</template>
		</v-modal>
	</teleport>
</template>
<script>
import employeesService from '@/plugins/services/employeesService'

import FormValidation from '@/util/FormValidation'
import SelectOptions from '@/util/SelectOptions'

export default {
	props: {
		mode: {
			type: String,
			required: true,
		},
		user: {
			type: Object,
			default: null,
		},
		openModal: {
			type: Boolean,
			required: true,
		},
		activeEmployee: {
			type: Object,
			required: true,
		},
		initalEmployee: {
			type: Object,
			required: true,
			default: () => {
				return {
					username: '',
					password: '',
					role: '',
					firstName: '',
					lastName: '',
					yearlyVacation: 21,
					status: 'active',
				}
			},
		},
	},
	data() {
		return {
			errors: [],
			roles: null,
			form: null,
			dummyPassword: '',
			accountStatus: SelectOptions.getAccountStatus(),
		}
	},
	computed: {
		disableUpdateButton() {
			if (this.initalEmployee.username == this.form.username && this.dummyPassword == '' && this.initalEmployee.role == this.form.role && this.initalEmployee.firstName == this.form.firstName && this.initalEmployee.lastName == this.form.lastName && this.initalEmployee.status == this.form.status) return true
			return false
		},
	},
	watch: {
		openModal: {
			handler(newData) {
				if (newData) this.resetForm()
			},
			immediate: true,
		},
	},
	mounted() {
		this.setRoles()
	},
	methods: {
		resetForm() {
			this.form = Object.assign({}, this.initalEmployee)
			delete this.form.password
			this.dummyPassword = ''
			this.errors = []
		},
		validateForm() {
			this.errors = []
			if (FormValidation.noSpace(this.form.username)) {
				this.errors.push({
					show: true,
					message: 'Username field cannot have whitespace.',
				})
			}
			if (FormValidation.noSpace(this.form.firstName)) {
				this.errors.push({
					show: true,
					message: 'First Name field cannot have whitespace.',
				})
			}
			if (FormValidation.noSpace(this.form.lastName)) {
				this.errors.push({
					show: true,
					message: 'Last Name field cannot have whitespace.',
				})
			}
			if (FormValidation.noSpace(this.dummyPassword)) {
				this.errors.push({
					show: true,
					message: 'Password field cannot have whitespace.',
				})
			}
			var employeeWithSameUsername = this.$store.state.allEmployees.find((employee) => employee.username == this.form.username)
			if (employeeWithSameUsername) {
				if (employeeWithSameUsername.username != this.activeEmployee.username) {
					this.errors.push({
						show: true,
						message: 'Username is already in use.',
					})
				}
			}
			if (this.errors.length == 0) {
				this.submit()
			}
		},
		submit() {
			if (this.mode == 'create') {
				this.form.password = this.dummyPassword
				employeesService
					.createEmployee(this.form)
					.then(() => {
						this.$store.commit('setAllEmployees')
						this.$emit('closeModal')
					})
					.catch((error) =>
						this.errors.push({
							show: true,
							message: error.response.data.message,
						})
					)
			} else if (this.mode == 'update') {
				if (this.dummyPassword != '') {
					this.form.password = this.dummyPassword
				}
				employeesService
					.updateEmployee(this.initalEmployee._id, this.form)
					.then(() => {
						this.$store.commit('setAllEmployees')
						this.$emit('closeModal')
					})
					.catch((error) =>
						this.errors.push({
							show: true,
							message: error.response.data.message,
						})
					)
			} else if (this.mode == 'profile') {
				if (this.dummyPassword != '') {
					this.form.password = this.dummyPassword
				}

				employeesService
					.updateEmployee(this.initalEmployee._id, this.form)
					.then(() => {
						this.$store.commit('setAllEmployees')
						this.$emit('closeModal')
					})
					.catch((error) =>
						this.errors.push({
							show: true,
							message: error.response.data.message,
						})
					)
			}
		},

		setRoles() {
			if (this.activeEmployee.role == 'admin') {
				this.roles = SelectOptions.getAdminRoles()
			} else if (this.activeEmployee.role == 'SuperAdmin') {
				this.roles = SelectOptions.getSuperAdminRoles()
			} else {
				this.roles = SelectOptions.getHRRoles()
			}
		},
	},
}
</script>
<style></style>
