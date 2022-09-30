<script>
export default {
    emits: ['pagination-change-page'],

    props: {
        data: {
            type: Object,
            default: () => {}
        },
        limit: {
            type: Number,
            default: 0
        },
    },

    computed: {
        isApiResource () {
            return !!this.data.meta;
        },
        currentPage () {
            return this.isApiResource ? this.data.meta.current_page : this.data.current_page;
        },
        firstPageUrl () {
            return this.isApiResource ? this.data.links.first : null;
        },
        from () {
            return this.isApiResource ? this.data.meta.from : this.data.from;
        },
        lastPage () {
            return this.isApiResource ? this.data.meta.last_page : this.data.last_page;
        },
        lastPageUrl () {
            return this.isApiResource ? this.data.links.last : null;
        },
        nextPageUrl () {
            return this.isApiResource ? this.data.links.next : this.data.next_page_url;
        },
        perPage () {
            return this.isApiResource ? this.data.meta.per_page : this.data.per_page;
        },
        prevPageUrl () {
            return this.isApiResource ? this.data.links.prev : this.data.prev_page_url;
        },
        to () {
            return this.isApiResource ? this.data.meta.to : this.data.to;
        },
        total () {
            return this.isApiResource ? this.data.meta.total : this.data.total;
        },
        pageRange () {
            if (this.limit === -1) {
                return 0;
            }

            if (this.limit === 0) {
                return this.lastPage;
            }

            var current = this.currentPage;
            var last = this.lastPage;
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
            this.selectPage((this.currentPage - 1));
        },
        nextPage () {
            this.selectPage((this.currentPage + 1));
        },
        selectPage (page) {
            if (page === '...') {
                return;
            }

            this.$emit('pagination-change-page', page);
        }
    },

    render () {
        return this.$slots.default({
            data: this.data,
            limit: this.limit,
            computed: {
                isApiResource: this.isApiResource,
                currentPage: this.currentPage,
                firstPageUrl: this.firstPageUrl,
                from: this.from,
                lastPage: this.lastPage,
                lastPageUrl: this.lastPageUrl,
                nextPageUrl: this.nextPageUrl,
                perPage: this.perPage,
                prevPageUrl: this.prevPageUrl,
                to: this.to,
                total: this.total,
                pageRange: this.pageRange
            },
            prevButtonEvents: {
                click: (e) => {
                    e.preventDefault();
                    this.previousPage();
                }
            },
            nextButtonEvents: {
                click: (e) => {
                    e.preventDefault();
                    this.nextPage();
                }
            },
            pageButtonEvents: page => ({
                click: (e) => {
                    e.preventDefault();
                    this.selectPage(page);
                }
            })
        });
    }
}
</script>
