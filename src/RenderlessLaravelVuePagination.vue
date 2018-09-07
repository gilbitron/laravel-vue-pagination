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

    computed: {
        pageRange () {
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
    },

    methods: {
        previousPage () {
            this.selectPage(--this.data.current_page);
        },
        nextPage () {
            this.selectPage(++this.data.current_page);
        },
        selectPage (page) {
            if (page === '...') {
                return;
            }

            this.$emit('pagination-change-page', page);
        }
    },

    render () {
        return this.$scopedSlots.default({
            data: this.data,
            limit: this.limit,
            pageRange: this.pageRange,
            prevButtonEvents: {
                click: this.previousPage
            },
            nextButtonEvents: {
                click: this.nextPage
            },
            pageButtonEvents: page => ({
                click: () => {
                    this.selectPage(page);
                }
            })
        });
    }
}
</script>
