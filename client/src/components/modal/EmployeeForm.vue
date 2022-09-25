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
					<form class="formContainer" @submit.prevent="submit">
						<div v-if="error != ''">
							<form-errors :error="error" />
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
								:type="'text'"
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
import { mapState } from 'vuex'

import SelectOptions from '@/util/SelectOptions'

export default {
	props: {
		mode: {
			type: String,
			required: true,
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
	emits: ['closeModal'],
	data() {
		return {
			roles: null,
			form: null,
			dummyPassword: '',
			accountStatus: SelectOptions.getAccountStatus(),
		}
	},
	computed: {
		...mapState(['error']),
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
			this.$store.dispatch('hideError')
		},
		submit() {
			if (this.mode == 'create') {
				this.form.password = this.dummyPassword
				this.$store.dispatch('createEmployee', this.form).then(() => {
					if (this.error == '') this.$emit('closeModal')
				})
			} else if (this.mode == 'update') {
				if (this.dummyPassword != '') {
					this.form.password = this.dummyPassword
				}
				this.$store.dispatch('updateEmployee', this.form).then(() => {
					if (this.error == '') this.$emit('closeModal')
				})
			} else if (this.mode == 'profile') {
				if (this.dummyPassword != '') {
					this.form.password = this.dummyPassword
				}
				this.$store.dispatch('updateActiveEmployee', this.form).then(() => {
					if (this.error == '') this.$emit('closeModal')
				})
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
