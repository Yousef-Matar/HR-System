<template>
	<table class="w-full text-base text-left text-gray-400">
		<thead class="text-xs text-gray-400 uppercase bg-gray-700">
			<tr>
				<th
					v-for="(header, index) in headers"
					:key="'tableHeader' + header"
					class="p-2 border border-gray-400"
				>
					<div
						v-if="header.sortable == true"
						:key="'headerSort' + tableFields[index]"
						class="flex justify-between gap-5 whitespace-nowrap items-center min-h-[25px] min-w-[25px] text-center"
					>
						{{ header[tableFields[index]] }}
						<div class="flex flex-col">
							<font-awesome-icon icon="fa-solid fa-sort-up" />
							<font-awesome-icon icon="fa-solid fa-sort-down" />
						</div>
					</div>
					<div
						v-else
						:key="'headerUnSorted' + tableFields[index]"
						class="flex whitespace-nowrap items-center min-h-[25px] min-w-[25px] text-center justify-center"
					>
						{{ header[tableFields[index]] }}
					</div>
				</th>
			</tr>
		</thead>
		<tbody>
			<tr
				v-for="row in tableData"
				:key="'tableRow' + row"
				class="bg-gray-800"
			>
				<template v-for="dataField in tableFields">
					<th
						v-if="tableFields.indexOf(dataField) == 0"
						:key="'tableDataFirst' + dataField"
						class="p-2 border border-gray-600 font-medium text-white"
					>
						<div class="flex whitespace-nowrap items-center min-h-[25px] min-w-[25px] text-center justify-center">
							{{ row[dataField] }}
						</div>
					</th>
					<td
						v-else
						:key="'tableDataSecond' + dataField"
						class="p-2 border border-gray-600"
					>
						<div class="flex whitespace-nowrap items-center min-h-[25px] min-w-[25px] text-center justify-center">
							{{ row[dataField] }}
						</div>
					</td>
				</template>
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
		tableFields: {
			type: Array,
			required: true,
		},
	},
}
</script>

<style></style>
