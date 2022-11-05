<template>
    <RenderlessPagination
        :data="data"
        :limit="limit"
        @pagination-change-page="onPaginationChangePage"
        v-slot="slotProps"
    >
        <nav
            v-bind="$attrs"
            class="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
            v-if="slotProps.computed.total > slotProps.computed.perPage"
        >
            <button
                class="relative inline-flex items-center rounded-l-md border px-2 py-2 text-sm font-medium focus:z-20 disabled:opacity-50"
                :class="itemClasses"
                :disabled="!slotProps.computed.prevPageUrl"
                v-on="slotProps.prevButtonEvents"
            >
                <slot name="prev-nav">
                    <span class="sr-only">Previous</span>
                    <svg
                        class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke-width="1.5" stroke="currentColor"
                    >
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/>
                    </svg>
                </slot>
            </button>

            <button
                class="relative inline-flex items-center border px-4 py-2 text-sm font-medium focus:z-20"
                :class="[
                    page == slotProps.computed.currentPage ? activeClasses : itemClasses,
                    page == slotProps.computed.currentPage ? 'z-30' : '',
                ]"
                :aria-current="slotProps.computed.currentPage ? 'page' : null"
                v-for="(page, key) in slotProps.computed.pageRange"
                :key="key"
                v-on="slotProps.pageButtonEvents(page)"
            >
                {{ page }}
            </button>

            <button
                class="relative inline-flex items-center rounded-r-md border px-2 py-2 text-sm font-medium focus:z-20 disabled:opacity-50"
                :class="itemClasses"
                :disabled="!slotProps.computed.nextPageUrl"
                v-on="slotProps.nextButtonEvents"
            >
                <slot name="next-nav">
                    <span class="sr-only">Next</span>
                    <svg
                        class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke-width="1.5" stroke="currentColor"
                    >
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/>
                    </svg>
                </slot>
            </button>
        </nav>
    </RenderlessPagination>
</template>

<script>
import RenderlessPagination from './RenderlessPagination.vue';

export default {
    compatConfig: {
        MODE: 3
    },
  
    inheritAttrs: false,

    emits: ['pagination-change-page'],

    components: {
        RenderlessPagination
    },

    props: {
        data: {
            type: Object,
            default: () => {}
        },
        limit: {
            type: Number,
            default: 0
        },
        itemClasses: {
            type: Array,
            default: () => [
                'bg-white',
                'text-gray-500',
                'border-gray-300',
                'hover:bg-gray-50',
            ],
        },
        activeClasses: {
            type: Array,
            default: () => [
                'bg-blue-50',
                'border-blue-500',
                'text-blue-600',
            ],
        },
    },

    methods: {
        onPaginationChangePage(page) {
            this.$emit('pagination-change-page', page);
        }
    }
}
</script>
