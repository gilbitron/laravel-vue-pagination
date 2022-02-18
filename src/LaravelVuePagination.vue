<template>
    <RenderlessLaravelVuePagination
        :data="data"
        :limit="limit"
        :show-disabled="showDisabled"
        :size="size"
        :align="align"
        @pagination-change-page="onPaginationChangePage"
        v-slot="slotProps"
    >
        <ul
            v-bind="$attrs"
            class="pagination"
            :class="{
                'pagination-sm': slotProps.size == 'small',
                'pagination-lg': slotProps.size == 'large',
                'justify-content-center': slotProps.align == 'center',
                'justify-content-end': slotProps.align == 'right'
            }"
            v-if="slotProps.computed.total > slotProps.computed.perPage">

            <li class="page-item pagination-prev-nav" :class="{'disabled': !slotProps.computed.prevPageUrl}" v-if="slotProps.computed.prevPageUrl || slotProps.showDisabled">
                <a class="page-link" href="#" aria-label="Previous" :tabindex="!slotProps.computed.prevPageUrl && -1" v-on="slotProps.prevButtonEvents">
                    <slot name="prev-nav">
                        <span aria-hidden="true">&laquo;</span>
                        <span class="sr-only">Previous</span>
                    </slot>
                </a>
            </li>

            <li class="page-item pagination-page-nav" v-for="(page, key) in slotProps.computed.pageRange" :key="key" :class="{ 'active': page == slotProps.computed.currentPage }">
                <a class="page-link" href="#" v-on="slotProps.pageButtonEvents(page)">
                    {{ page }}
                    <span class="sr-only" v-if="page == slotProps.computed.currentPage">(current)</span>
                </a>
            </li>

            <li class="page-item pagination-next-nav" :class="{'disabled': !slotProps.computed.nextPageUrl}" v-if="slotProps.computed.nextPageUrl || slotProps.showDisabled">
                <a class="page-link" href="#" aria-label="Next" :tabindex="!slotProps.computed.nextPageUrl && -1" v-on="slotProps.nextButtonEvents">
                    <slot name="next-nav">
                        <span aria-hidden="true">&raquo;</span>
                        <span class="sr-only">Next</span>
                    </slot>
                </a>
            </li>

        </ul>
    </RenderlessLaravelVuePagination>
</template>

<script>
import RenderlessLaravelVuePagination from './RenderlessLaravelVuePagination.vue';

export default {
    inheritAttrs: false,

    emits: ['pagination-change-page'],

    components: {
        RenderlessLaravelVuePagination
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
        showDisabled: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            default: 'default',
            validator: value => {
                return ['small', 'default', 'large'].indexOf(value) !== -1;
            }
        },
        align: {
            type: String,
            default: 'left',
            validator: value => {
                return ['left', 'center', 'right'].indexOf(value) !== -1;
            }
        }
    },

    methods: {
        onPaginationChangePage (page) {
            this.$emit('pagination-change-page', page);
        }
    }
}
</script>
