import DataTableComponent from './components/datatable-component.vue'
import DatatablePagesizeComponent from './components/datatable-pagesize-component.vue'
import DataTablePaginationComponent from './components/datatable-pagination-component.vue'

export const DataTablePlugin = {
  install (Vue, options = {}) {
    Vue.component('datatable-component', DataTableComponent);
    Vue.component('datatable-pagesize', DatatablePagesizeComponent);
    Vue.component('datatable-pagination', DataTablePaginationComponent);
  },
  NAME: 'DataTablePlugin'
};

export const DatatableComponentLibrary = {
  DataTableComponent,
  DatatablePagesizeComponent,
  DataTablePaginationComponent,
  DataTablePlugin
}

export default DatatableComponentLibrary;
