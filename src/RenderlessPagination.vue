<script>
export default {
    emits: ['pagination-change-page'],

    props: {
        data: {
            type: Object,
            default: () => {},
        },
        limit: {
            type: Number,
            default: 0,
        },
        keepLength: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        isApiResource() {
            return !!this.data.meta;
        },
        currentPage() {
            return this.isApiResource
                ? this.data.meta.current_page
                : this.data.current_page ?? null;
        },
        firstPageUrl() {
            return (
                this.data.first_page_url ??
                this.data.meta?.first_page_url ??
                this.data.links?.first ??
                null
            );
        },
        from() {
            return this.isApiResource
                ? this.data.meta.from
                : this.data.from ?? null;
        },
        lastPage() {
            return this.isApiResource
                ? this.data.meta.last_page
                : this.data.last_page ?? null;
        },
        lastPageUrl() {
            return (
                this.data.last_page_url ??
                this.data.meta?.last_page_url ??
                this.data.links?.last ??
                null
            );
        },
        nextPageUrl() {
            return (
                this.data.next_page_url ??
                this.data.meta?.next_page_url ??
                this.data.links?.next ??
                null
            );
        },
        perPage() {
            return this.isApiResource
                ? this.data.meta.per_page
                : this.data.per_page ?? null;
        },
        prevPageUrl() {
            return (
                this.data.prev_page_url ??
                this.data.meta?.prev_page_url ??
                this.data.links?.prev ??
                null
            );
        },
        to() {
            return this.isApiResource
                ? this.data.meta.to
                : this.data.to ?? null;
        },
        total() {
            return this.isApiResource
                ? this.data.meta.total
                : this.data.total ?? null;
        },
        pageRange() {
            if (this.limit === -1) {
                return 0;
            }

            if (this.limit === 0) {
                return this.lastPage;
            }

            var current = this.currentPage;
            var size = this.keepLength;
            var last = this.lastPage;
            var delta = this.limit;
            var left = current - delta;
            var right = current + delta;
            var leftPad = (delta + 2) * 2;
            var rightPad = (delta + 2) * 2 - 1;
            var range = [];
            var pages = [];
            var l;

            for (var i = 1; i <= last; i++) {
                // Item is first or last
                if (i === 1 || i === last) {
                    range.push(i);
                }
                // Item is within the delta
                else if (i >= left && i <= right) {
                    range.push(i);
                }
                // Item is before max left padding
                else if (size && i < leftPad && current < leftPad - 2) {
                    range.push(i);
                }
                // Item is after max right padding
                else if (
                    size &&
                    i > last - rightPad &&
                    current > last - rightPad + 2
                ) {
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
        },
    },

    methods: {
        previousPage() {
            this.selectPage(this.currentPage - 1);
        },
        nextPage() {
            this.selectPage(this.currentPage + 1);
        },
        selectPage(page) {
            if (page === '...' || page === this.currentPage) {
                return;
            }

            this.$emit('pagination-change-page', page);
        },
    },

    render() {
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
                pageRange: this.pageRange,
            },
            prevButtonEvents: {
                click: (e) => {
                    e.preventDefault();
                    this.previousPage();
                },
            },
            nextButtonEvents: {
                click: (e) => {
                    e.preventDefault();
                    this.nextPage();
                },
            },
            pageButtonEvents: (page) => ({
                click: (e) => {
                    e.preventDefault();
                    this.selectPage(page);
                },
            }),
        });
    },
};
</script>
