<template>
    <ul class="pagination" v-if="data.total > data.per_page">
        <li class="page-item pagination-prev-nav" v-if="data.prev_page_url">
            <a class="page-link" href="#" aria-label="Previous" @click.prevent="selectPage(--data.current_page)">
                <slot name="prev-nav">
                    <span aria-hidden="true">&laquo;</span>
                    <span class="sr-only">Previous</span>
                </slot>
            </a>
        </li>
        <li class="page-item pagination-page-nav" v-for="(n, key) in getPages()" :key="key" :class="{ 'active': n == data.current_page }">
            <a class="page-link" href="#" @click.prevent="selectPage(n)">{{ n }}</a>
        </li>
        <li class="page-item pagination-next-nav" v-if="data.next_page_url">
            <a class="page-link" href="#" aria-label="Next" @click.prevent="selectPage(++data.current_page)">
                <slot name="next-nav">
                    <span aria-hidden="true">&raquo;</span>
                    <span class="sr-only">Next</span>
                </slot>
            </a>
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            default: () => {
                return {
                    current_page: 1,
                    data: [],
                    from: 1,
                    last_page: 1,
                    next_page_url: null,
                    per_page: 10,
                    prev_page_url: null,
                    to: 1,
                    total: 0
                }
            }
        },
        limit: {
            type: Number,
            default: 0
        }
    },

    methods: {
        selectPage (page) {
            if (page === '...') {
                return;
            }

            this.$emit('pagination-change-page', page);
        },
        getPages () {
            if (this.limit === -1) {
                return 0;
            }

            if (this.limit === 0) {
                return this.data.last_page;
            }

            var current = this.data.current_page;
            var last = this.data.last_page;
            var delta = this.limit;
            var left = current - delta;
            var right = current + delta + 1;
            var range = [];
            var pages = [];
            var l;

            for (var i = 1; i <= last; i++) {
                if (i === 1 || i === last || (i >= left && i < right)) {
                    range.push(i);
                }
            }

            range.forEach(function (i) {
                if (l) {
                    if (i - l === 2) {
                        pages.push(l + 1);
                    } else if (i - l !== 1) {
                        pages.push('...');
                    }
                }
                pages.push(i);
                l = i;
            });

            return pages;
        }
    }
}
</script>
