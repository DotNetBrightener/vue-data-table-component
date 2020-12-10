<template src="./templates/pagination-component.template.html"></template>

<script>
import {
  defaultMixins
} from '../default-mixins';
const defaultCss = {
  paginationWrapper: "pagination-wrapper",
  paginationLegend: "",
  paginationElements: "",
  paginationItem: "pagination-item",
  goToPreviousPage: "move-previous-page",
  goToNextPage: "move-next-page",
  pageNumber: "page-number",
  pageBtn: "page-btn",
  activePageItem: "active",
  goToPageDropdown: "active"
};
export default {
  name: 'datatable-pagination-component',
  props: {
    totalItems: {
      type: Number,
      required: true
    },
    currentPageRecords: {
      type: Number,
      required: true
    },
    itemsPerPage: {
      type: Number,
      default: 10
    },
    page: {
      type: Number,
      default: 0
    },
    showPageSelection: {
      type: Boolean,
      default: false
    },
    moveNextPage: {
      type: Boolean,
      default: true
    },
    movePreviousPage: {
      type: Boolean,
      default: true
    },
    css: {
      type: Object,
      default: () => defaultCss
    }
  },
  mixins: [defaultMixins],
  data: function () {
    return {
      pageSize: this.itemsPerPage,
      currentPage: this.page
    };
  },
  computed: {
    switchPageIndex: {
      get () {
        return this.page;
      },
      set (value) {
        console.log('switch page value:', value);
        this.changePage(value);
      }
    },
    computedCss () {
      return {
        ...defaultCss,
        ...this.css
      };
    },
    goToPageOptions () {
      let pages = Array.apply(null, {
        length: this.lastPage
      })
        .map(
          (_, index) => ({
            pageIndex: index,
            pageNumber: index + 1
          })
        );

      return pages;
    },
    qntPages () {
      const numberOfPages = this.lastPage;

      let pages = Array.apply(null, {
        length: numberOfPages
      })
        .map(
          (_, index) => ({
            pageIndex: index,
            pageNumber: index + 1
          })
        );

      if (numberOfPages < 5) {
        return pages;
      } else {
        pages = pages.slice(1, numberOfPages - 1);
        if (this.currentPage + 2 >= numberOfPages - 1) {
          pages = [
            {
              pageIndex: -10,
              pageNumber: '...',
              disabled: true
            },
            ...pages.slice(this.currentPage - 2, numberOfPages)
          ];
        } else if (this.currentPage - 2 >= 1) {
          pages = [
            {
              pageIndex: -10,
              pageNumber: '...',
              disabled: true
            },
            ...pages.slice(this.currentPage - 2, this.currentPage + 1),

            {
              pageIndex: -10,
              pageNumber: '...',
              disabled: true
            }
          ];
        } else {
          pages = [
            ...pages.slice(0, 2),
            {
              pageIndex: -10,
              pageNumber: '...',
              disabled: true
            }
          ];
        }

        return [
          // the first page
          {
            pageIndex: 0,
            pageNumber: 1
          },

          ...pages,

          // the last page
          {
            pageIndex: numberOfPages - 1,
            pageNumber: numberOfPages
          }
        ];
      }
    },
    lastPage () {
      return Math.ceil(this.totalItems / this.pageSize);
    },
    start () {
      if (!this.currentPageRecords) { return 0; }

      return this.currentPage * this.itemsPerPage + 1;
    },
    end () {
      return this.currentPage * this.itemsPerPage + this.currentPageRecords;
    }
  },
  watch: {
    page (newPage) {
      this.currentPage = newPage;
    },
    itemsPerPage (newitemsPerPage) {
      this.pageSize = newitemsPerPage;
      this.checkCurrentPageExist();
    }
  },
  methods: {
    pageClass (currentPage) {
      return this.currentPage === currentPage
        ? `${this.computedCss.paginationItem} ${this.computedCss.activePageItem}`
        : this.computedCss.paginationItem;
    },
    changePage (pageToGo) {
      if (pageToGo <= this.lastPage && pageToGo >= 0) {
        this.$emit("on-update", pageToGo);
      }
    },
    isActionDisabled: function (action) {
      switch (action) {
        case "firstPage":
          return this.currentPage === 0;
        case "previousPage":
          return this.currentPage === 0;
        case "lastPage":
          return (
            this.currentPage === this.lastPage ||
                        !this.totalItems ||
                        this.currentPage * this.itemsPerPage >= this.totalItems
          );
        case "nextPage":
          return (
            this.currentPage === this.lastPage ||
                        !this.totalItems ||
                        this.currentPage * this.itemsPerPage >= this.totalItems
          );
      }
    },
    checkCurrentPageExist: function () {
      if (this.qntPages.indexOf(this.currentPage) === -1) {
        const nextPage = this.qntPages.length ? this.qntPages.length : 0;
        this.$emit("update-current-page", nextPage);
      }
    }
  }
}
</script>
