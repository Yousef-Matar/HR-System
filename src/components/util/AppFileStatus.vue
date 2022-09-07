<template>
	<div class="p-2 text-sm font-normal text-gray-400 bg-gray-800 bg-clip-padding border shadow border-gray-600 rounded m-0 flex justify-between items-center">
		<div class="flex items-start flex-col">
			<p>File Type: {{ file.documentType }}</p>
			<p>Request Status: {{ file.status.toUpperCase() }}</p>
		</div>
		<div class="flex gap-3">
			<font-awesome-icon
				v-for="icon in iconAction"
				:key="icon.icon"
				:icon="icon.icon"
				:size="icon.size"
				:class="icon.class"
				@click="icon.action"
			/>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		file: {
			type: Object,
			required: true,
		},
		iconAction: {
			type: Array,
			default: () => [],
		},
	},
}
</script>

<style></style>
