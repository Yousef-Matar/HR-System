<template>
	<span class="flex items-center">
		<v-button
			v-if="mode === 'create'"
			:method="openModal"
			:text="'Add User'"
			class="w-full self-center"
		/>
		<v-button
			v-else-if="mode === 'update'"
			:method="openModal"
			:text="'Update User'"
			class="w-full self-center"
		/>
		<v-button
			v-else-if="mode === 'profile'"
			:method="openModal"
			:text="user.username.toUpperCase()"
			:icon="'fa fa-user'"
			:has-border="false"
			class="w-full self-center"
		/>
		<teleport to="body">
			<v-modal
				v-if="isModalOpen"
				:variant="'primary'"
				@closeModal="resetForm()"
			>
				<template v-if="mode === 'create'" #ModalHeader> Add New User </template>
				<template v-else-if="mode === 'profile'" #ModalHeader> Account Details </template>
				<template v-else-if="mode === 'update'" #ModalHeader> Update User </template>
				<template #ModalBody>
					<form class="formContainer" @submit.prevent="validateForm">
						<div v-if="errors.length">
							<form-errors
								v-for="error in errors"
								:key="error.message"
								:error="error"
							/>
						</div>
						<v-input
							:input-i-d="'username'"
							:type="'text'"
							:input-label="'Username'"
							:input-value="form.username"
							@usernameChange="(inputContent) => (form.username = inputContent)"
						/>

						<v-input
							:input-i-d="'password'"
							:type="mode === 'update' ? 'password' : 'text'"
							:input-label="'Password'"
							:input-value="form.password"
							:disabled="mode === 'update' ? true : false"
							@passwordChange="(inputContent) => (form.password = inputContent)"
						/>

						<v-input
							:input-i-d="'firstName'"
							:type="'text'"
							:input-label="'First Name'"
							:input-value="form.firstName"
							:disabled="mode === 'update' ? true : false"
							@firstNameChange="(inputContent) => (form.firstName = inputContent)"
						/>
						<v-input
							:input-i-d="'lastName'"
							:type="'text'"
							:input-label="'Last Name'"
							:input-value="form.lastName"
							:disabled="mode === 'update' ? true : false"
							@lastNameChange="(inputContent) => (form.lastName = inputContent)"
						/>
						<v-select
							:select-i-d="'role'"
							:disabled="mode !== 'profile' ? false : true"
							:select-value="form.role"
							:items="roles"
							:select-label="'Account Role'"
							@roleChange="(selectContent) => (form.role = selectContent)"
						/>
						<v-select
							:select-i-d="'accountStatus'"
							:disabled="mode !== 'profile' ? false : true"
							:select-value="form.status"
							:items="accountStatus"
							:select-label="'Account Status'"
							@accountStatusChange="(selectContent) => (form.status = selectContent)"
						/>
						<v-button
							:type="'submit'"
							:text="mode == 'create' ? 'Add User' : 'Update'"
							class="w-full"
						/>
						<v-button
							:type="'button'"
							:text="'Cancel'"
							:variant="'danger'"
							:method="resetForm"
							class="w-full"
						/>
					</form>
				</template>
			</v-modal>
		</teleport>
	</span>
</template>
<script>
import FormValidation from '@/util/FormValidation'
import SelectOptions from '@/util/SelectOptions'
import UsersManager from '@/util/UsersManager'

export default {
	props: {
		mode: {
			type: String,
			default: 'create',
			required: true,
		},
		user: {
			type: Object,
			default: null,
		},
	},
	data() {
		return {
			activeUser: UsersManager.getActiveUser(),
			isModalOpen: false,
			errors: [],
			roles: null,
			form: null,
			accountStatus: SelectOptions.getAccountStatus(),
		}
	},
	mounted() {
		this.setRoles()
	},
	methods: {
		openModal() {
			this.resetForm()
			this.isModalOpen = true
		},
		resetForm() {
			if (this.mode === 'create') {
				this.form = {
					ID: UsersManager.getUserID(),
					username: '',
					password: '',
					role: '',
					firstName: '',
					lastName: '',
					yearlyVacation: 21,
					status: 'active',
					hireDate: new Date().toLocaleDateString(),
					attendance: [],
				}
			} else if (this.mode === 'update') {
				this.form = Object.assign({}, this.user)
			} else if (this.mode === 'profile') {
				this.form = Object.assign({}, this.user)
			}
			this.errors = []
			this.isModalOpen = false
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
			if (FormValidation.noSpace(this.form.password)) {
				this.errors.push({
					show: true,
					message: 'Password field cannot have whitespace.',
				})
			}
			if (UsersManager.getUserByUsername(this.form.username)) {
				if (UsersManager.getUserByUsername(this.form.username).username != this.user.username && (this.mode === 'create' || this.mode === 'profile')) {
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
			if (this.mode === 'create') {
				UsersManager.addUser(this.form)
				this.resetForm()
			} else if (this.mode === 'update') {
				UsersManager.replaceUser(this.user.ID, this.form)
				this.resetForm()
			} else if (this.mode === 'profile') {
				UsersManager.setActiveUser(this.form)
				UsersManager.replaceUser(this.user.ID, this.form)
				this.resetForm()
			}
			this.$emit('tableRefresh')
		},

		setRoles() {
			if (this.activeUser.role === 'admin') {
				this.roles = SelectOptions.getAdminRoles()
			} else if (this.activeUser.role === 'SuperAdmin') {
				this.roles = SelectOptions.getSuperAdminRoles()
			} else {
				this.roles = SelectOptions.getHRRoles()
			}
		},
	},
}
</script>
<style></style>
