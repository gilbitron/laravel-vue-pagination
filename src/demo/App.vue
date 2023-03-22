<template>
    <div class="container mt-5">
        <h1 class="mb-3">Laravel Vue Pagination Demo</h1>
        <form class="mb-5" @submit.prevent>
            <div class="row mb-3">
                <div class="col" v-if="style !== 'tailwind'">
                    <label class="form-label" for="limit">Limit</label><br>
                    <input type="number" id="limit" class="form-control" v-model="limit">
                </div>
                <div class="col">
                    <label class="form-label" for="size">Size</label><br>
                    <select id="size" class="form-select" v-model="size">
                        <option value="small">Small</option>
                        <option value="default">Default</option>
                        <option value="large">Large</option>
                    </select>
                </div>
                <div class="col">
                    <label class="form-label" for="align">Align</label><br>
                    <select id="align" class="form-select" v-model="align">
                        <option value="left">Left</option>
                        <option value="center">Center</option>
                        <option value="right">Right</option>
                    </select>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="keep-length" v-model="keepLength">
                        <label class="form-check-label" for="keep-length">Keep Length</label>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="show-disabled" v-model="showDisabled">
                        <label class="form-check-label" for="show-disabled">Show Disabled</label>
                    </div>
                </div>
            </div>
        </form>

        <div class="card">
            <div class="card-body p-5">
                <h3 class="mb-2">Bootstrap 4</h3>
                <RenderToIFrame>
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
                    <Bootstrap4Pagination
                        class="mb-0"
                        :data="laravelData"
                        :limit="limit"
                        :keep-length="keepLength"
                        :show-disabled="showDisabled"
                        :size="size"
                        :align="align"
                        @pagination-change-page="getResults"
                    />
                </RenderToIFrame>
              
                <h3 class="mt-3 mb-2">Bootstrap 5</h3>
                <RenderToIFrame>
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css">
                    <Bootstrap5Pagination
                        class="mb-0"
                        :data="laravelData"
                        :limit="limit"
                        :keep-length="keepLength"
                        :show-disabled="showDisabled"
                        :size="size"
                        :align="align"
                        @pagination-change-page="getResults"
                    />
                </RenderToIFrame>

                <h3 class="mt-3 mb-2">Tailwind CSS</h3>
                <RenderToIFrame :is-tailwind="true">
                    <TailwindPagination
                        :data="laravelData"
                        :limit="limit"
                        :keep-length="keepLength"
                        @pagination-change-page="getResults"
                    />
                </RenderToIFrame>
            </div>
        </div>
    </div>
</template>

<script>
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import { Bootstrap4Pagination, Bootstrap5Pagination, TailwindPagination } from '../lib';
import RenderToIFrame from './components/RenderToIframe';

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
            keepLength: false,
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
        keepLength (newVal) {
            this.keepLength = Boolean(newVal);
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
