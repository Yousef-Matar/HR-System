<template>
	<details class="flex flex-col text-left">
		<summary class="text-base rounded-3xl p-2 shadow cursor-pointer text-primary border-primary hover:shadow-[#adffff] flex justify-between">
			{{ link.title }}
		</summary>

		<router-link
			v-for="child in link.children"
			:key="child.title"
			class="levelOneButton w-full text-left text-base rounded-3xl p-2 shadow text-primary border-primary hover:shadow-[#adffff]"
			:to="child.to"
		>
			<font-awesome-icon :icon="child.icon" /> &nbsp;
			{{ child.title }}
		</router-link>
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
.router-link-active {
	border-width: 1px;
}
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
	content: '\27A4';
	transform: rotate(90deg);
	transition: color ease 2s, transform ease 1s;
}
details[open] summary ~ * {
	animation: fade 1.5s ease-in-out;
}

@keyframes fade {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}
details[open] > summary:after {
	transform: rotate(270deg);
	color: #ef4444 !important;
	transition: color ease 2s, transform ease 1s;
}
</style>
