<template>
	<span>
		<v-button
			v-if="mode === 'create'"
			:method="() => (isModalOpen = true)"
			:text="'Add User'"
		/>
		<v-button
			v-else-if="mode === 'update'"
			:method="() => (isModalOpen = true)"
			:text="'Update User'"
		/>
		<span
			v-else-if="mode === 'profile'"
			class="p-2 rounded-3xl shadow-md cursor-pointer"
			@click="isModalOpen = true"
		>
			<font-awesome-icon icon="fa fa-user" /> &nbsp;
			{{ getActiveUser().username.toUpperCase() }}
		</span>
		<teleport to="body">
			<ReusableModal v-if="isModalOpen" @closeModal="resetForm()">
				<template v-if="mode === 'create'" #ModalHeader> Add New User </template>
				<template v-else-if="mode === 'profile'" #ModalHeader> Account Details </template>
				<template v-else-if="mode === 'update'" #ModalHeader>
					<div class="flex justify-between items-center">
						<span>Update User</span>
						<v-button
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

						<div class="flex gap-8">
							<div class="inputGroup">
								<input
									id="username"
									v-model="form.username"
									placeholder=" "
									type="text"
									required
								>
								<label for="username">Username</label>
							</div>
							<div class="inputGroup">
								<input
									id="password"
									v-model="form.password"
									placeholder=" "
									:type="mode === 'update' ? 'password' : 'text'"
									:disabled="mode === 'update' ? true : false"
									required
								>
								<label for="password">Password</label>
							</div>
						</div>
						<div class="flex gap-8">
							<div class="inputGroup">
								<input
									id="firstName"
									v-model="form.firstName"
									placeholder=" "
									type="text"
									required
									:disabled="mode === 'update' ? true : false"
								>
								<label for="firstName">First Name</label>
							</div>
							<div class="inputGroup">
								<input
									id="lastName"
									v-model="form.lastName"
									placeholder=" "
									type="text"
									required
									:disabled="mode === 'update' ? true : false"
								>
								<label for="lastName">Last Name</label>
							</div>
						</div>

						<div class="flex gap-8">
							<div class="inputGroup">
								<select
									id="role"
									v-model="form.role"
									:disabled="mode !== 'profile' ? false : true"
									required
								>
									<option value="" hidden="hidden">Select a role</option>
									<option
										v-for="role in roles"
										:key="role.value"
										:value="role.value"
									>
										{{ role.title }}
									</option>
								</select>
								<label>Account Role</label>
							</div>
						</div>
						<v-button
							v-if="mode === 'create'"
							:type="'submit'"
							:text="'Add User'"
						/>
						<v-button
							v-else-if="mode === 'update' || mode === 'profile'"
							:type="'submit'"
							:text="'Update'"
						/>
						<v-button
							:type="'button'"
							:text="'Cancel'"
							:variant="'danger'"
							:method="resetForm"
						/>
					</form>
				</template>
			</ReusableModal>
		</teleport>
	</span>
</template>
<script>
import ReusableModal from '@/components/util/ReusableModal'
import UsersManager from '@/util/UsersManager'

export default {
	components: { ReusableModal },
	props: {
		mode: {
			type: String,
			default: 'create',
			required: true,
			validator: (value) => ['create', 'edit', 'profile'].includes(value),
		},
		user: {
			type: Object,
			default: null,
		},
	},
	data() {
		return {
			isModalOpen: false,
			error: {
				show: false,
				message: 'Username is already in use.',
			},
			form: {},
			roles: {},
		}
	},
	mounted() {
		this.resetForm()
		this.setRoles()
		console.log(this.form)
	},
	methods: {
		resetForm() {
			if (this.mode === 'create') {
				this.form.username = ''
				this.form.password = ''
				this.form.role = ''
				this.form.firstName = ''
				this.form.lastName = ''
				this.form.hireDate = new Date().toLocaleDateString()
				this.form.attendance = []
			} else if (this.mode === 'update') {
				this.form = Object.assign({}, this.user)
			} else if (this.mode === 'profile') {
				this.form = Object.assign({}, this.getActiveUser())
			}
			this.error.show = false
			this.isModalOpen = false
		},
		submit() {
			if (UsersManager.getUser(this.form.username).username != this.getActiveUser().username && (this.mode === 'create' || this.mode === 'profile')) {
				this.error.show = true
				this.error.message = 'Username is already in use.'
			} else if (this.mode === 'create') {
				UsersManager.addUser(this.form)
			} else if (this.mode === 'update') {
				UsersManager.replaceUser(this.user, this.form)
			} else if (this.mode === 'profile') {
				//UsersManager.replaceUser(this.user, this.form);
				UsersManager.setActiveUser(this.form)
			}
		},
		deleteUser() {
			UsersManager.deleteUser(this.user)
			this.error.show = false
			this.isModalOpen = false
		},

		setRoles() {
			this.roles =
				this.getActiveUser().role === 'admin'
					? [
							{
								title: 'Employee',
								value: 'employee',
							},
							{
								title: 'Human Resources',
								value: 'human resources',
							},
							{
								title: 'Admin',
								value: 'admin',
							},
							// eslint-disable-next-line no-mixed-spaces-and-tabs
					  ]
					: [
							{
								title: 'Employee',
								value: 'employee',
							},
							{
								title: 'Human Resources',
								value: 'human resources',
							},
							// eslint-disable-next-line no-mixed-spaces-and-tabs
					  ]
		},
		getActiveUser() {
			return UsersManager.getActiveUser()
		},
	},
}
</script>
<style></style>
