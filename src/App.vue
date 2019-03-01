<template>
    <div class="container mt-5">
        <h1 class="mb-3">Laravel Vue Pagination Demo</h1>
        <p class="mb-5">A Vue.js pagination component for Laravel paginators that works with Bootstrap.</p>

        <form class="mb-5" @submit.prevent>
            <div class="form-row">
                <div class="form-group col-md-4">
                    <label for="limit">Limit</label><br>
                    <input type="number" id="limit" class="form-control" v-model="limit">
                </div>
                <div class="form-group col-md-4">
                    <label for="size">Size</label><br>
                    <select id="size" class="form-control" v-model="size">
                        <option value="small">Small</option>
                        <option value="default">Default</option>
                        <option value="large">Large</option>
                    </select>
                </div>
                <div class="form-group col-md-4">
                    <label for="align">Align</label><br>
                    <select id="align" class="form-control" v-model="align">
                        <option value="left">Left</option>
                        <option value="center">Center</option>
                        <option value="right">Right</option>
                    </select>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="show-disabled" v-model="showDisabled">
                        <label class="form-check-label" for="show-disabled">Show Disabled</label>
                    </div>
                </div>
            </div>
        </form>

        <div class="card bg-light">
            <div class="card-body p-5">
                <div class="overflow-auto">
                    <pagination
                        class="mb-0"
                        :data="laravelData"
                        @pagination-change-page="getResults"
                        :limit="limit"
                        :show-disabled="showDisabled"
                        :size="size"
                        :align="align" />

                    <!--pagination
                        :data="laravelResourceData"
                        @pagination-change-page="getResourceResults"
                        :limit="limit"
                        :show-disabled="showDisabled"
                        :size="size"
                        :align="align" /-->
                </div>
            </div>
        </div>

        <footer class="my-5 text-muted small">
            <div class="row">
                <div class="col-md-9">
                    <p>Laravel Vue Pagination was created by <a href="https://gilbitron.me">Gilbert Pellegrom</a> from <a href="https://dev7studios.co">Dev7studios</a>. Released under the MIT license.</p>
                </div>
                <div class="col-md-3 text-right">
                    <p><a href="https://github.com/gilbitron/laravel-vue-pagination">GitHub</a></p>
                </div>
            </div>
        </footer>
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
        }
    },

    components: {
        'pagination': LaravelVuePagination
    }
}
</script>
