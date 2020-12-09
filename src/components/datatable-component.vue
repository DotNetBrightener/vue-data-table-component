<template src="./templates/datatable-component.template.html"></template>
<script>
import { defaultMixins } from '../default-mixins';
import draggable from 'vuedraggable';


export default {
  name: 'data-table-component',
  props: {
    headerFields: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    sortField: {
      type: String,
      default: null,
    },
    sort: {
      type: String,
      default: null,
    },
    notFoundMsg: {
      type: String,
      default: null,
    },
    trackBy: {
      type: String,
      default: "id",
    },
    css: {
      type: Object,
      default: () => ({
        table: "",
        thead: "thead",
        theadTr: "thead-tr",
        theadTh: "thead-th",
        tbody: "tbody",
        tbodyTr: "tbody-tr",
        tbodyTrSpinner: "tbody-tr-spinner",
        tbodyTd: "tbody-td",
        tbodyTdSpinner: "tbody-td-spinner",
        tfoot: "tfoot",
        tfootTd: "tfoot-td",
        tfootTr: "tfoot-tr",
        footer: "footer",
        thWrapper: "th-wrapper",
        thWrapperCheckboxes: "th-wrapper-checkboxes",
        arrowsWrapper: "arrows-wrapper",
        arrowUp: "arrow-up",
        arrowDown: "arrow-down",
        checkboxHeader: "checkbox-header",
        checkbox: "checkbox",
        notFoundTr: "not-found-tr",
        notFoundTd: "not-found-td",
      }),
    },
    tableHeight: {
      type: String,
      default: null,
    },
    defaultColumnWidth: {
      type: String,
      default: "150px",
    },
    headersSortable: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    draggable,
  },
  mixins: [defaultMixins],

  data: function () {
    return {
      sortedField: this.sortField,
      sortedDir: this.sort,
      notFoundMessage: this.notFoundMsg,
      loading: this.isLoading,
      checkedAll: false,
      itemsChecked: [],
    };
  },

  computed: {
    orderedHeaders: {
      get() {
        return this.headers;
      },
      set(value) {
        if (!this.headersSortable)
          return;
          
        this.$emit('header-fields-ordered', value.map(header => {
          if (header.__headerFieldType === "string") {
            return header.label;
          }

          return header;
        }));
      }
    },
    
    hasSlots () {
      return (this.$slots.pagination !== undefined || this.$slots.ItemsPerPage !== undefined);
    },

    headers () {
      if (this.headerFields &&
          this.headerFields.constructor === Array &&
          this.headerFields.length) {
        return Object.keys(this.headerFields).map((key) => {
          const field = this.headerFields[key];
          if (typeof field === "string") {
            return { label: field, name: field, __headerFieldType: "string" };
          }
          return field;
        });
      }

      return [];
    },
    tbodyStyle () {
      if (this.tableHeight) {
        return {
          height: this.tableHeight,
          display: "block",
          overflowX: "auto",
        };
      }
      return null;
    },
    theadStyle () {
      return this.tableHeight ? { display: "block" } : null;
    },
  },

  methods: {
    arrowsWrapper: function (field, className) {
      if (this.sortedField === field && this.sortedDir) {
        return `${className} centralized`;
      }
      return className;
    },

    updateData: function () {
      const params = {
        sortField: this.sortedField,
        sort: this.sortedDir,
      };

      this.$emit("on-update", params);
    },

    orderBy: function (field) {
      if (this.isFieldSortable(field)) {
        if (this.sortedField === field) {
          this.sortedDir = this.sortedDir === "asc" ? "desc" : "asc";
        } else {
          this.sortedDir = "asc";
          this.sortedField = field;
        }
        this.updateData();
      }
    },

    checkAll: function () {
      this.checkedAll = !this.checkedAll;
      if (this.checkedAll) {
        this.itemsChecked = this.data;
      } else {
        this.itemsChecked = [];
      }
      this.$emit("on-check-all", this.itemsChecked);
    },

    checkItem: function (item) {
      const found = this.itemsChecked.find(
        (itemChecked) => itemChecked[this.trackBy] === item[this.trackBy]
      );
      if (found) {
        this.itemsChecked = this.itemsChecked.filter(
          (itemChecked) => itemChecked[this.trackBy] !== item[this.trackBy]
        );
        this.$emit("on-unchecked-item", item);
      } else {
        this.itemsChecked = [...this.itemsChecked, item];
        this.$emit("on-checked-item", item);
      }
    },

    isCheckedItem: function (item) {
      return !!this.itemsChecked.find(
        (itemChecked) => itemChecked[this.trackBy] === item[this.trackBy]
      );
    },

    isFieldSortable: function (field) {
      const foundHeader = this.headerFields.find((item) => item.name === field);
      return foundHeader && foundHeader.sortable;
    },

    headerItemClass: function (item, className = []) {
      const classes = className.join(" ");
      return item && item.sortable ? classes : `${classes} no-sortable`;
    },

    isFieldSpecial: (field) => field.indexOf("__") > -1,

    extractArgs: (string) => string.split(":")[1],

    extractActionID: (string) => {
      const list = string.split(":");
      return list.length === 3 ? list[2] : "actions";
    },

    getColumnStyle: function (item) {
      if (item.name === "__slot:checkboxes") {
        return { width: "50px" };
      }

      const styleWidth = {};

      if (this.tableHeight) {
        styleWidth.width = item.width || this.defaultColumnWidth;
      }

      if (item.minWidth) {
        styleWidth["minWidth"] = item.minWidth;
      }

      if (item.style) {
        return {
          ...item.style,
          ...styleWidth,
        };
      }

      return styleWidth;
    },

    getCellClass: function (item) {
      return item.customCssClassses;
    },

    customElementName: ({ customElement, name }) =>
      typeof customElement === "string" ? customElement : name,

    customHeaderName: ({ customHeader, name }) =>
      typeof customHeader === "string" ? customHeader : `${name}:header`,

    showOrderArrow: function (item, sortDir) {
      return (
        this.sortedField !== item.name ||
        (this.sortedField === item.name && this.sortedDir === sortDir)
      );
    },
  },
}
</script>
