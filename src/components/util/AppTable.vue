<template>
	<div>
		<div class="overflow-x-auto">
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
								class="flex justify-between gap-5 whitespace-nowrap items-center min-h-[25px] min-w-[25px] text-center cursor-pointer"
								@click="sort(header[tableFields[index]].toUpperCase())"
							>
								{{ header[tableFields[index]] }}
								<div class="flex flex-col">
									<font-awesome-icon icon="fa-solid fa-sort-up" :class="header[tableFields[index]].toUpperCase() === sortingAttribute && sortingType === 'ascendingly' ? 'text-primary' : ''" />
									<font-awesome-icon icon="fa-solid fa-sort-down" :class="header[tableFields[index]].toUpperCase() === sortingAttribute && sortingType === 'descendingly' ? 'text-primary' : ''" />
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
						v-for="row in sortedTableData"
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
		</div>
		<div class="mt-5 flex justify-between">
			<v-button
				:text="'Previous Page'"
				:method="prevPage"
				:disabled="currentPage == 1 ? true : false"
			/>
			<v-button
				:text="'Next Page'"
				:method="nextPage"
				:disabled="currentPage * pageSize >= sortedTableData.length ? true : false"
			/>
		</div>
	</div>
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
		pageSize: {
			type: Number,
			default: 10,
		},
	},
	data() {
		return {
			sortingAttribute: this.tableFields[0].toUpperCase(),
			sortingType: 'ascendingly',
			currentPage: 1,
			sortedTableData: this.tableData,
		}
	},
	methods: {
		prevPage() {
			if (this.currentPage > 1) {
				this.currentPage--
			}
		},
		nextPage() {
			if (this.currentPage * this.pageSize < this.sortedTableData.length) {
				this.currentPage++
			}
		},
		sort(tableHeader) {
			if (tableHeader === this.sortingAttribute) {
				this.sortingType = this.sortingType === 'ascendingly' ? 'descendingly' : 'ascendingly'
			}
			this.sortingAttribute = tableHeader
		},
		sortTable() {
			this.sortedTableData = this.sortedTableData
				.sort((a, b) => {
					let modifier = 1
					if (this.sortingType === 'descendingly') modifier = -1
					if (a[this.sortingAttribute] < b[this.sortingAttribute]) return -1 * modifier
					if (a[this.sortingAttribute] > b[this.sortingAttribute]) return 1 * modifier
					return 0
				})
				.filter((row, index) => {
					let start = (this.currentPage - 1) * this.pageSize
					let end = this.currentPage * this.pageSize
					if (index >= start && index < end) return true
				})
		},
	},
}
</script>

<style></style>
