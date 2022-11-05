# Demo

## Bootstrap 4

<RenderToIFrame>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
    <Bootstrap4Pagination
        class="mb-0"
        :data="laravelData"
        :limit="limit"
        :show-disabled="showDisabled"
        :size="size"
        :align="align"
        @pagination-change-page="getResults"
    />
</RenderToIFrame>

## Bootstrap 5

<RenderToIFrame>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css">
    <Bootstrap5Pagination
        class="mb-0"
        :data="laravelData"
        :limit="limit"
        :show-disabled="showDisabled"
        :size="size"
        :align="align"
        @pagination-change-page="getResults"
    />
</RenderToIFrame>

## Tailwind CSS

<RenderToIFrame :is-tailwind="true">
    <TailwindPagination
        :data="laravelData"
        :limit="limit"
        @pagination-change-page="getResults"
    />
</RenderToIFrame>

<script>
import { Bootstrap4Pagination, Bootstrap5Pagination, TailwindPagination } from '@/lib';
import RenderToIFrame from '@/demo/components/RenderToIframe';

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
    components: {
        RenderToIFrame,
        Bootstrap4Pagination,
        Bootstrap5Pagination,
        TailwindPagination,
    },

    data () {
        return {
            laravelData: {},
            laravelResourceData: {},
            style: 'bootstrap4',
            limit: 2,
            showDisabled: false,
            size: 'default',
            align: 'left'
        }
    },

    mounted () {
        this.getResults(10);
        // this.getResourceResults();
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
            if (this.limit < 0) {
                this.limit = 0;
            }
        },
    },
}
</script>

<style scoped>
iframe {
    border: 0;
    overflow: auto;
    width: 100%;
    height: 4rem;
    background-color: transparent;
}
</style>