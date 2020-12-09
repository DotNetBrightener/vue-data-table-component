<template src="./templates/pagination-component.template.html"></template>

<script>
import {
    defaultMixins
} from '../default-mixins';
const defaultCss = {
    paginationItem: "pagination-item",
    goToFirstPage: "move-first-page",
    goToPreviousPage: "move-previous-page",
    goToNextPage: "move-next-page",
    goToLastPage: "move-last-page",
    pageNumber: "page-number",
    pageBtn: "page-btn",
};
export default {
    name: 'datatable-pagination-component',
    props: {
        totalItems: {
            type: Number,
            required: true,
        },
        currentPageRecords: {
            type: Number,
            required: true,
        },
        itemsPerPage: {
            type: Number,
            default: 10,
        },
        page: {
            type: Number,
            default: 1,
        },
        moveLastPage: {
            type: Boolean,
            default: true,
        },
        moveFirstPage: {
            type: Boolean,
            default: true,
        },
        moveNextPage: {
            type: Boolean,
            default: true,
        },
        movePreviousPage: {
            type: Boolean,
            default: true,
        },
        css: {
            type: Object,
            default: () => defaultCss,
        },
    },
    mixins: [defaultMixins],
    data: function () {
        return {
            perPage: this.itemsPerPage,
            currPage: this.page,
        };
    },
    computed: {
        computedCss() {
            return {
                ...defaultCss,
                ...this.css
            };
        },
        qntPages() {
            const nrPages = this.lastPage;
            if (nrPages > 4) {
                if (this.currPage <= 3) {
                    return Array.apply(null, {
                        length: 5
                    }).map((_, index) => index + 1);
                } else if (this.currPage + 2 >= nrPages) {
                    return Array.apply(null, {
                            length: nrPages
                        })
                        .map((_, index) => index + 1)
                        .slice(nrPages - 5, nrPages);
                } else {
                    return Array.apply(null, {
                            length: nrPages
                        })
                        .map((_, index) => index + 1)
                        .slice(this.currPage - 3, this.currPage + 2);
                }
            } else {
                return Array.apply(null, {
                    length: nrPages
                }).map(
                    (_, index) => index + 1
                );
            }
        },
        lastPage() {
            return Math.ceil(this.totalItems / this.perPage);
        },
        start() {
            if (!this.currentPageRecords)
                return 0;

            return this.currPage * this.itemsPerPage + 1;
        },
        end() {
            return this.currPage * this.itemsPerPage + this.currentPageRecords;
        },
    },
    watch: {
        page (newPage) {
            this.currPage = newPage;
        },
        itemsPerPage (newItemsPerPage) {
            this.perPage = newItemsPerPage;
            this.checkCurrentPageExist();
        },
    },
    methods: {
        pageClass (currentPage) {
            return this.currPage === currentPage ?
                `${this.css.paginationItem} selected` :
                this.css.paginationItem;
        },
        changePage (pageToGo) {
            if (pageToGo <= this.lastPage && pageToGo >= 1) {
                this.$emit("on-update", pageToGo);
            }
        },
        isActionDisabled: function (action) {
            switch (action) {
                case "firstPage":
                    return this.currPage === 1;
                case "previousPage":
                    return this.currPage === 1;
                case "lastPage":
                    return (
                        this.currPage === this.lastPage ||
                        !this.totalItems ||
                        this.currPage * this.itemsPerPage >= this.totalItems
                    );
                case "nextPage":
                    return (
                        this.currPage === this.lastPage ||
                        !this.totalItems ||
                        this.currPage * this.itemsPerPage >= this.totalItems
                    );
            }
        },
        checkCurrentPageExist: function () {
            if (this.qntPages.indexOf(this.currPage) === -1) {
                const nextPage = this.qntPages.length ? this.qntPages.length : 0;
                this.$emit("update-current-page", nextPage);
            }
        },
    },
}
</script>
