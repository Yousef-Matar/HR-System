<template>
	<div class="inputGroup">
		<select
			:id="selectID"
			v-model="selectContent"
			:required="required"
			:disabled="disabled"
			@change="(event) => $emit(selectID + 'Change', selectContent)"
		>
			<option
				v-for="item in items"
				:key="item.value"
				:value="item.value"
				:hidden="item.hidden"
			>
				{{ item.title }}
			</option>
		</select>
		<label :for="selectID">{{ selectLabel }}</label>
	</div>
</template>

<script>
export default {
	props: {
		selectID: {
			type: String,
			required: true,
		},
		selectValue: {
			type: [String, Number, Object],
			default: '',
		},
		selectLabel: {
			type: String,
			required: true,
			default: 'Select Label',
		},
		required: {
			type: Boolean,
			default: true,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		items: {
			type: Array,
			required: true,
		},
	},
	data() {
		return {
			selectContent: '',
		}
	},
	watch: {
		selectValue: {
			handler(newData) {
				this.selectContent = newData
			},
			// force eager callback execution
			immediate: true,
		},
	},
}
</script>
