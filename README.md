# vue-datatable-component

A lightweight component for rendering data tables for VueJS aapplications.

[![GitHub open issues](https://img.shields.io/github/issues/dotnetbrightener/vue-data-table-component.svg)](https://github.com/dotnetbrightener/vue-data-table-component/issues)
![GitHub](https://img.shields.io/github/license/dotnetbrightener/vue-data-table-component.svg)


## Features

[x] Provide a Pagination component

[x] Provide a PageSize component

[x] Make use of SortableJS (https://sortablejs.github.io/Vue.Draggable) to provide column ordering

## Installation
```
npm install @dotnetbrightener/vue-datatable-component
```

## Usage

In your `main.js`

```js
import { DatatableComponentLibrary } from '@dotnetbrightener/vue-datatable-component';


Vue.use(DatatableComponentLibrary.DataTablePlugin);
```

 If you don't want to reference entire plugin, you can define the component from your component
 
 ```js
import { 
		DataTableComponent, 
        DatatablePagesizeComponent, 
        DataTablePaginationComponent 
       } from '@dotnetbrightener/vue-datatable-component';
       
 export default {
 	components: {    	
        'datatable-component': () => DataTableComponent,
        'datatable-pagesize': () => DatatablePagesizeComponent,
        'datatable-pagination': () => DataTablePaginationComponent
    }
 }
 ```

In your component vue 

```html
<script>
    export default {
        data() {
            return {
                // indicates whether the data is being loaded
                isLoading: false,
                // data to render to the table
                usersList: [],
                // pagination options
                itemsPerPageOptions: [5, 10, 25, 50, 75, 100],
                itemsPerPage: 10,
                currentPageIndex: 0,
                // total records of the data (not the current page's records)
                totalRecords: 0,
                // indicates the column that is being sorted
                sortField: 'id',
                // the sort direction
                sort: 'asc',
                // custom css for page size component
                pageSizeCss: {
                    select: ''
                },
                // custom css for pagination component
                paginationCss: {
                    paginationWrapper: "d-flex flex-row pagination-wrapper",
                    paginationLegend: "col-5 pl-0 d-flex align-items-center",
                    paginationElements: "flex-row justify-content-end col pr-0",
                    paginationItem: "paginate_button page-item",
                    goToPreviousPage: "move-previous-page page-link",
                    goToNextPage: "move-next-page page-link",
                    pageNumber: "page-link",
                    pageBtn: "page-item",
                    activePageItem: "active",
                    goToPageDropdown: "col-3 pr-0 d-flex flex-row align-items-center"
                },
                // custom css for data table component
                datatableCss: {
                    table: 'table table-bordered table-hover table-striped table-center',
                    theadTr: 'header-item',
                    theadTh: 'custom-thead-th',
                    thWrapper: 'th-wrapper',
                    thWrapperCheckboxes: 'th-wrapper checkboxes',
                    arrowsWrapper: 'arrows-wrapper',
                    arrowUp: 'arrow up',
                    arrowDown: 'arrow down',
                    footer: 'footer d-flex flex-row'
                },
                // define the fields to render to header
                headerFields: [
                    {
                        name: 'id',
                        label: 'Id',
                        sortable: true
                    },
                        {
                        name: 'firstName',
                        label: 'First Name',
                        sortable: true
                    },
                        {
                        name: 'lastName',
                        label: 'Last Name',
                        sortable: true
                    },
                    '__slot:actions'
                ]
            };
        },
        methods: {
        	// load your data
			async loadData() {
            	async yourLoadDataLogic().then(data => {
                	this.usersList = data;
                    this.totalRecords = data.totalRecordsForTheEntireCollection;
                });
            },
            //  called when the header columns get sorted
            updateHeadersOrdering(orderedHeaderFields) {            
            	this.headerFields = orderedHeaderFields;
            },
            // called when the current ordering field changed
            onSortUpdated({ sortField, sort }) {
            	this.sortField = sortField;
              	this.sort = sort;
            },
            // called when the current page index changed
            async onPageUpdate(newIndex) {
              	this.currentPageIndex = newIndex;
              	await this.loadData();
            },
            // called when the page size selection is changed
            async updateItemsPerPage(newIndex) {
              	this.itemsPerPage = newIndex;
              	await this.loadData();
            },
        }
    }
</script>
```

In your component HTML:

```html
<datatable-component :header-fields="headerFields" 
                     :headers-sortable="true" 
                     :sort-field="sortField" 
                     :sort="sort"
                     :data="usersList || []" 
                     :is-loading="isLoading" 
                     :css="datatableCss" 
                     not-found-msg="Items not found"
                     @on-update="onSortUpdated" 
                     @header-fields-ordered="updateHeadersOrdering" 
                     track-by="id">

    <!-- start page size selection -->
    <!-- [can be moved outside of the table] -->
    <div class="items-per-page col-4" slot="pageSizeSelection">
        <label>Items per page</label>
        <datatable-pagesize :items-per-page-options="itemsPerPageOptions" 
                            :items-per-page="itemsPerPage"
                            :css="pageSizeCss"
                            @on-update="updateItemsPerPage" />
    </div>
    <!-- end page size selection -->

    <!-- start pagination -->
    <!-- [can be moved outside of the table] -->
    <div class="col-8" slot="pagination">
        <datatable-pagination :items-per-page="itemsPerPage" 
                            :page="currentPageIndex" 
                            :current-page-records="(usersList || []).length"
                            :total-items="totalRecords" 
                            :css="paginationCss" 
                            :show-page-selection="true"
                            @on-update="onPageUpdate" >
        
        <!-- render custom components -->
        <div slot="paginationLegend" slot-scope="props">
            Showing {{ props.start }} - {{ props.end }} of {{ props.total }} records
        </div>
        <!-- render previous button -->
        <span slot="previousButton" class="fas fa-chevron-left">
        </span>

        <!-- render next button -->
        <span slot="nextButton" class="fas fa-chevron-right">
        </span>

        <label slot="pageSelectionText" class="col goto-page-dropdown-label m-0 text-right">Select Page</label>
        </datatable-pagination>
    </div>
    <!-- end pagination -->

</datatable-component>
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
