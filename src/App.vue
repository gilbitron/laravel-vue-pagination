<template>
    <div class="p-5">
        <h1 class="mb-5">Laravel Vue Pagination Demo</h1>
        <p>
            <label for="limit">Limit</label><br>
            <input type="number" id="limit" v-model="limit">
        </p>
        <p class="mb-5">
            <label for="show-disabled">Show Disabled</label><br>
            <input type="checkbox" id="show-disabled" v-model="showDisabled">
        </p>

        <p>Paginator Response:</p>
        <pagination :data="laravelData" @pagination-change-page="getResults" :limit="limit" :show-disabled="showDisabled" />

        <p>API Resource Response:</p>
        <pagination :data="laravelResourceData" @pagination-change-page="getResourceResults" :limit="limit" :show-disabled="showDisabled" />
    </div>
</template>

<script>
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import LaravelVuePagination from './LaravelVuePagination.vue';

const dummyData = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
    { id: 10 },
    { id: 11 },
    { id: 12 },
    { id: 13 },
    { id: 14 },
    { id: 15 },
    { id: 16 },
    { id: 17 },
    { id: 18 },
    { id: 19 },
    { id: 20 }
];

export default {
    data () {
        return {
            laravelData: {},
            laravelResourceData: {},
            limit: 0,
            showDisabled: false
        }
    },

    mounted () {
        this.getResults();
        this.getResourceResults();
    },

    methods: {
        getResults (page) {
            if (!page) {
                page = 1;
            }

            this.laravelData = {
                current_page: page,
                data: dummyData,
                from: page,
                last_page: dummyData.length,
                next_page_url: page < dummyData.length ? 'http://example.com/page/2' : null,
                per_page: 1,
                prev_page_url: page > 1 ? 'http://example.com/page/1' : null,
                to: page + 1,
                total: dummyData.length
            };
        },
        getResourceResults (page) {
            if (!page) {
                page = 1;
            }

            this.laravelResourceData = {
                data: dummyData,
                links: {
                    first: 'http://example.com/page/1',
                    last: 'http://example.com/page/' + dummyData.length,
                    prev: page > 1 ? 'http://example.com/page/1' : null,
                    next: page < dummyData.length ? 'http://example.com/page/2' : null
                },
                meta: {
                    current_page: page,
                    from: page,
                    last_page: dummyData.length,
                    path: 'http://example.com/page',
                    per_page: 1,
                    to: page + 1,
                    total: dummyData.length
                }
            };
        }
    },

    watch: {
        limit (newVal) {
            this.limit = parseInt(newVal);
        }
    },

    components: {
        'pagination': LaravelVuePagination
    }
}
</script>
