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
			<v-alert
				:text="error.message"
				:show="error.show"
				:variant="'error'"
			/>
			<v-modal
				v-if="isModalOpen"
				:variant="'primary'"
				@closeModal="resetForm()"
			>
				<template v-if="mode === 'create'" #ModalHeader> Add New User </template>
				<template v-else-if="mode === 'profile'" #ModalHeader> Account Details </template>
				<template v-else-if="mode === 'update'" #ModalHeader> Update User </template>
				<template #ModalBody>
					<form autocomplete="off" @submit.prevent="submit">
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
							<v-select
								:select-i-d="'accountStatus'"
								:disabled="mode !== 'profile' ? false : true"
								:select-value="form.status"
								:items="accountStatus"
								:select-label="'Account Status'"
								@accountStatusChange="(selectContent) => (form.status = selectContent)"
							/>
						</div>
						<v-button
							v-if="mode === 'create'"
							:disabled="error.show"
							:type="'submit'"
							:text="'Add User'"
							class="w-full self-center"
						/>
						<v-button
							v-else-if="mode === 'update' || mode === 'profile'"
							:disabled="error.show"
							:type="'submit'"
							:text="'Update'"
							class="w-full self-center"
						/>
						<v-button
							:disabled="error.show"
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
			error: {
				show: false,
				message: 'Username is already in use.',
			},
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
					ID: UsersManager.getAllUsers().length == 0 ? 1 : UsersManager.getAllUsers()[UsersManager.getAllUsers().length - 1].ID + 1,
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
			this.error.show = false
			this.isModalOpen = false
		},
		submit() {
			if (UsersManager.getUserByUsername(this.form.username)) {
				if (UsersManager.getUserByUsername(this.form.username).username != this.user.username && (this.mode === 'create' || this.mode === 'profile')) {
					this.error.show = true
					this.error.message = 'Username is already in use.'
					setTimeout(() => {
						this.error.show = false
					}, 2000)
				} else {
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
				}
			} else if (this.mode === 'create') {
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
