<template>
	<div>
		<div class="overflow-x-auto">
			<table class="w-full text-base text-left text-gray-400">
				<thead class="text-xs text-gray-400 uppercase bg-gray-700">
					<tr>
						<template v-if="headers != null">
							<th
								v-for="(header, index) in headers"
								:key="'tableHeader' + header"
								class="p-2 border border-gray-400"
							>
								<div
									v-if="header.sortable == true"
									:key="'headerSort' + header.value"
									class="flex justify-between gap-5 whitespace-nowrap items-center min-h-[25px] min-w-[25px] text-center cursor-pointer"
									@click="sort(header.value)"
								>
									{{ header.value }}
									<div class="flex flex-col">
										<font-awesome-icon icon="fa-solid fa-sort-up" :class="header.value === sortingAttribute && sortingType === 'ascendingly' ? 'text-primary' : ''" />
										<font-awesome-icon icon="fa-solid fa-sort-down" :class="header.value === sortingAttribute && sortingType === 'descendingly' ? 'text-primary' : ''" />
									</div>
								</div>
								<div
									v-else
									:key="'headerUnSorted' + tableFields[index]"
									class="flex whitespace-nowrap items-center min-h-[25px] min-w-[25px] text-center justify-center"
								>
									{{ header.value }}
								</div>
							</th>
						</template>
						<th v-if="headerComponents" class="p-2 border border-gray-400">
							<slot name="tableHeaderComponents" />
						</th>
					</tr>
				</thead>
				<tbody>
					<template v-if="sortTable() != null">
						<tr
							v-for="row in sortTable()"
							:key="'tableRow' + row"
							class="bg-gray-800"
						>
							<template v-if="tableFields != null">
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
							</template>
							<td v-if="tableComponents" class="p-2 border border-gray-600">
								<slot name="tableBodyComponents" :row="row" />
							</td>
						</tr>
					</template>
					<tr v-if="sortTable().length == 0 && sortTable() != null && tableFields != null" class="bg-gray-800">
						<td
							v-for="dataField in tableFields"
							:key="'NoData' + dataField"
							class="p-2 border border-gray-600"
						>
							<div class="flex whitespace-nowrap items-center min-h-[25px] min-w-[25px] text-center justify-center">
								NO DATA IS AVAILABLE
							</div>
						</td>
						<td v-if="tableComponents && headerComponents" class="p-2 border border-gray-600">
							<div class="flex whitespace-nowrap items-center min-h-[25px] min-w-[25px] text-center justify-center">
								NO DATA IS AVAILABLE
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div v-if="pagination && sortedTableData != null && tableData != null" class="flex flex-col gap-8 mt-8">
			<div class="flex justify-between gap-8">
				<div>Showing {{ sortedTableData.length }} out of {{ tableData.length }} rows</div>
				<div>Page {{ currentPage }} out of {{ Math.ceil(tableData.length / pageSize) }} pages</div>
			</div>
			<div class="flex justify-between gap-8">
				<v-button
					class="w-full"
					:text="'Previous Page'"
					:method="prevPage"
					:disabled="currentPage == 1 ? true : false"
				/>
				<v-button
					class="w-full"
					:text="'Next Page'"
					:method="nextPage"
					:disabled="currentPage * pageSize >= sortedTableData.length ? true : false"
				/>
			</div>
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
		headerComponents: {
			type: Boolean,
			default: false,
		},
		pagination: {
			type: Boolean,
			default: false,
		},
		tableData: {
			type: Array,
			required: true,
		},
		tableComponents: {
			type: Boolean,
			default: false,
		},
		tableFields: {
			type: Array,
			required: true,
		},
		pageSize: {
			type: Number,
			default: 10,
		},
		sortType: {
			type: String,
			default: 'ascendingly',
		},
		sortField: {
			type: String,
			default: '',
		},
	},
	data() {
		return {
			sortingAttribute: this.sortField == '' ? this.tableFields[0] : this.sortField,
			sortingType: this.sortType,
			currentPage: 1,
			sortedTableData: this.tableData,
		}
	},
	watch: {
		tableData(newData) {
			this.sortedTableData = newData
		},
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
			if (this.sortedTableData == null) {
				this.sortedTableData = []
				return
			}
			return this.sortedTableData
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
