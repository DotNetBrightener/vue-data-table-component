<template src="./templates/page-size-component.template.html">
</template>

<script>
import {
    defaultMixins
} from '../default-mixins';
export default {
    name: 'datatable-pagesize-component',
    mixins: [defaultMixins],
    props: {
        itemsPerPagePptions: {
            type: Array,
            default: () => [10, 30, 50, 100]
        },
        itemsPerPage: {
            type: Number,
            default: 10
        },
        css: {
            type: Object,
            default: () => ({
                select: ''
            })
        }
    },
    methods: {
        onUpdate: function (event) {
            this.$emit('on-update', event.target.value)
        }
    }

}
</script>
