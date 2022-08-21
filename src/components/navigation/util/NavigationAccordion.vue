<template>
	<details class="flex flex-col text-left">
		<summary class="text-base rounded-3xl p-2 shadow cursor-pointer text-primary border-primary hover:shadow-[#adffff] flex justify-between">
			{{ link.title }}
		</summary>
		<v-button
			v-for="child in link.children"
			:key="child.title"
			class="levelOneButton"
			:text="child.title"
			:icon="child.icon"
			:has-border="hasBorder"
			:method=" () => { $router.push(child.to) } "
		/>
	</details>
</template>

<script>
export default {
	props: {
		link: {
			type: Object,
			required: true,
		},
		hasBorder: {
			type: Boolean,
			default: false,
		},
	},
}
</script>

<style scoped>
.levelOneButton {
	width: calc(100% - 12px);
	text-align: left;
	margin-left: 12px;
}
details > summary {
	list-style: none;
}
summary::-webkit-details-marker {
	display: none;
}
details summary::after {
	content: '\25BC';
	display: inline-block;
}
</style>
