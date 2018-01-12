<template>
    <div id="app">
        <pagination :data="laravelData" :limit="2" v-on:pagination-change-page="getResults"></pagination>
    </div>
</template>

<style>
    #app { padding: 50px; }
</style>


<script>
    export default {
        data () {
            return {
                laravelData: {},
            }
        },

        mounted() {
            this.getResults();
        },

        methods: {
            getResults(page) {
                if (!page) {
                    page = 1;
                }

                var dummyData = [
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
                    { id: 20 },
                ];

                this.laravelData = {
                    current_page: page,
                    data: dummyData,
                    from: page,
                    last_page: dummyData.length,
                    next_page_url: page < dummyData.length ? 'http://example.com/page/2' : null,
                    per_page: 1,
                    prev_page_url: page > 1 ? 'http://example.com/page/1' : null,
                    to: page + 1,
                    total: dummyData.length,
                };
            }
        }
    }
</script>
