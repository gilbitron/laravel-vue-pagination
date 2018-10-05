<template>
    <div class="p-5">
        <p>Paginator Response:</p>
        <pagination :data="laravelData" :limit="2" @pagination-change-page="getResults" />

        <p>API Resource Response:</p>
        <pagination :data="laravelResourceData" :limit="2" @pagination-change-page="getResourceResults" />
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
            laravelResourceData: {}
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

    components: {
        'pagination': LaravelVuePagination
    }
}
</script>
