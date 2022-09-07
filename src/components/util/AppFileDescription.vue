<template>
	<div class="p-2 text-sm font-normal text-gray-400 bg-gray-800 bg-clip-padding border shadow border-gray-600 rounded m-0 flex justify-between items-center gap-3">
		<div class="min-w-0">
			<p class="text-left truncate">
				File Name: {{ file.name }}
			</p>
			<p class="text-left truncate">
				File Size: {{ formatFileSize }}
			</p>
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
	computed: {
		formatFileSize() {
			const sufixes = ['B', 'kB', 'MB', 'GB', 'TB']
			var i = Math.floor(Math.log(this.file.size) / Math.log(1024))
			return `${(this.file.size / Math.pow(1024, i)).toFixed(2)} ${sufixes[i]}`
		},
	},
}
</script>

<style></style>
