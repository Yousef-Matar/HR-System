<template>
	<table class="w-full text-base text-left text-gray-400">
		<thead class="text-xs text-gray-400 uppercase bg-gray-700">
			<tr>
				<th
					v-for="header in headers"
					:key="header"
					scope="col"
					class="p-2 border border-gray-400 whitespace-nowrap"
				>
					{{ header }}
				</th>
			</tr>
		</thead>
		<tbody>
			<tr
				v-for="row in tableData"
				:key="row.user.username"
				class="bg-gray-800"
			>
				<th scope="row" class="p-2 font-medium whitespace-nowrap text-white border border-gray-600">
					{{ row.user.username }}
				</th>
				<td class="p-2 border border-gray-600">
					{{ row.user.role }}
				</td>
				<td class="p-2 border border-gray-600">
					{{ row.coveredHours }}
				</td>
			</tr>
		</tbody>
	</table>
</template>

<script>
export default {
	props: {
		headers: {
			type: Array,
			required: true,
		},
		tableData: {
			type: Array,
			required: true,
		},
	},
}
</script>

<style></style>
