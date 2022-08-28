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
				<template v-else-if="mode === 'update'" #ModalHeader>
					<div class="flex justify-between items-center">
						<span>Update User</span>
						<v-button
							class="w-full self-center"
							:type="'button'"
							:text="'Delete User'"
							:variant="'danger'"
							:method="deleteUser"
						/>
					</div>
				</template>
				<template #ModalBody>
					<form autocomplete="off" @submit.prevent="submit">
						<div v-if="error.show" class="text-red-500 text-left mt-2 text-lg">
							<font-awesome-icon icon="fa fa-exclamation-triangle" />&nbsp;
							{{ error.message }}
						</div>

						<div class="flex gap-8 flex-wrap">
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
						</div>
						<div class="flex gap-8 flex-wrap">
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
						</div>

						<div class="flex gap-8 flex-wrap">
							<v-select
								:select-i-d="'role'"
								:disabled="mode !== 'profile' ? false : true"
								:select-value="form.role"
								:items="roles"
								:select-label="'Account Role'"
								@roleChange="(selectContent) => (form.role = selectContent)"
							/>
						</div>
						<v-button
							v-if="mode === 'create'"
							:type="'submit'"
							:text="'Add User'"
							class="w-full self-center"
						/>
						<v-button
							v-else-if="mode === 'update' || mode === 'profile'"
							:type="'submit'"
							:text="'Update'"
							class="w-full self-center"
						/>
						<v-button
							:type="'button'"
							:text="'Cancel'"
							:variant="'danger'"
							:method="resetForm"
							class="w-full self-center"
						/>
					</form>
				</template>
			</v-modal>
		</teleport>
	</span>
</template>
<script>
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
			error: {
				show: false,
				message: 'Username is already in use.',
			},
			roles: null,
			form: null,
			test: null,
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
					username: '',
					password: '',
					role: '',
					firstName: '',
					lastName: '',
					yearlyVacation: 21,
					hireDate: new Date().toLocaleDateString(),
					attendance: [],
				}
			} else if (this.mode === 'update') {
				this.form = Object.assign({}, this.user)
			} else if (this.mode === 'profile') {
				this.form = Object.assign({}, this.user)
			}

			this.error.show = false
			this.isModalOpen = false
			this.$emit('tableRefresh')
		},
		submit() {
			if (UsersManager.getUser(this.form.username)) {
				if (UsersManager.getUser(this.form.username).username != this.user.username && (this.mode === 'create' || this.mode === 'profile')) {
					this.error.show = true
					this.error.message = 'Username is already in use.'
				} else {
					if (this.mode === 'create') {
						UsersManager.addUser(this.form)
						this.resetForm()
					} else if (this.mode === 'update') {
						UsersManager.replaceUser(this.user.username, this.form)
						this.resetForm()
					} else if (this.mode === 'profile') {
						UsersManager.setActiveUser(this.form)
						UsersManager.replaceUser(this.user.username, this.form)
						this.resetForm()
					}
				}
			} else if (this.mode === 'create') {
				UsersManager.addUser(this.form)
				this.resetForm()
			} else if (this.mode === 'update') {
				UsersManager.replaceUser(this.user.username, this.form)
				this.resetForm()
			} else if (this.mode === 'profile') {
				UsersManager.setActiveUser(this.form)
				UsersManager.replaceUser(this.user.username, this.form)
				this.resetForm()
			}
		},
		deleteUser() {
			UsersManager.deleteUser(this.user.username)
			this.error.show = false
			this.isModalOpen = false
		},

		setRoles() {
			if (this.activeUser.role === 'admin') {
				this.roles = [
					{
						title: 'Select a role',
						value: '',
						hidden: true,
					},
					{
						title: 'Employee',
						value: 'employee',
						hidden: false,
					},
					{
						title: 'Human Resources',
						value: 'human resources',
						hidden: false,
					},
					{
						title: 'Admin',
						value: 'admin',
						hidden: false,
					},
					// eslint-disable-next-line no-mixed-spaces-and-tabs
				]
			} else if (this.activeUser.role === 'SuperAdmin') {
				this.roles = [
					{
						title: 'Select a role',
						value: '',
						hidden: true,
					},
					{
						title: 'SuperAdmin',
						value: 'SuperAdmin',
						hidden: true,
					},
					{
						title: 'Employee',
						value: 'employee',
						hidden: false,
					},
					{
						title: 'Human Resources',
						value: 'human resources',
						hidden: false,
					},
					{
						title: 'Admin',
						value: 'admin',
						hidden: false,
					},
					// eslint-disable-next-line no-mixed-spaces-and-tabs
				]
			} else {
				this.roles = [
					{
						title: 'Select a role',
						value: '',
						hidden: true,
					},
					{
						title: 'Employee',
						value: 'employee',
						hidden: false,
					},
					{
						title: 'Human Resources',
						value: 'human resources',
						hidden: false,
					},
					// eslint-disable-next-line no-mixed-spaces-and-tabs
				]
			}
		},
	},
}
</script>
<style></style>
