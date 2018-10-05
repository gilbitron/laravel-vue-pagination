<template>
    <renderless-laravel-vue-pagination :data="data" :limit="limit" v-on:pagination-change-page="onPaginationChangePage">
        <ul class="pagination" v-if="computed.total > computed.perPage" slot-scope="{ data, limit, computed, prevButtonEvents, nextButtonEvents, pageButtonEvents }">
            <li class="page-item pagination-prev-nav" v-if="computed.prevPageUrl">
                <a class="page-link" href="#" aria-label="Previous" v-on="prevButtonEvents">
                    <slot name="prev-nav">
                        <span aria-hidden="true">&laquo;</span>
                        <span class="sr-only">Previous</span>
                    </slot>
                </a>
            </li>
            <li class="page-item pagination-page-nav" v-for="(page, key) in computed.pageRange" :key="key" :class="{ 'active': page == computed.currentPage }">
                <a class="page-link" href="#" v-on="pageButtonEvents(page)">{{ page }}</a>
            </li>
            <li class="page-item pagination-next-nav" v-if="computed.nextPageUrl">
                <a class="page-link" href="#" aria-label="Next" v-on="nextButtonEvents">
                    <slot name="next-nav">
                        <span aria-hidden="true">&raquo;</span>
                        <span class="sr-only">Next</span>
                    </slot>
                </a>
            </li>
        </ul>
    </renderless-laravel-vue-pagination>
</template>

<script>
import RenderlessLaravelVuePagination from './RenderlessLaravelVuePagination.vue';

export default {
    props: {
        data: {
            type: Object,
            default: () => {}
        },
        limit: {
            type: Number,
            default: 0
        }
    },

    methods: {
        onPaginationChangePage (page) {
            this.$emit('pagination-change-page', page);
        }
    },

    components: {
        RenderlessLaravelVuePagination
    }
}
</script>
