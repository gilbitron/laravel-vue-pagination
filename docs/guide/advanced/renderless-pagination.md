# Renderless Pagination

All of the pre-built pagination components in this library use a `RenderlessPagination` component under the hood. If you want to build your own pagination component, you can use the `RenderlessPagination` component to handle all of the pagination logic while leaving the UI up to you.

## Example

Below is an example of how you might use the `RenderlessPagination` component to build a custom pagination component:

```vue
<template>
    <RenderlessPagination
        :data="data"
        :limit="limit"
        @pagination-change-page="onPaginationChangePage"
        v-slot="slotProps"
    >
        <nav
            v-bind="$attrs"
            aria-label="Pagination"
            v-if="slotProps.computed.total > slotProps.computed.perPage"
        >
            <button
                :disabled="!slotProps.computed.prevPageUrl"
                v-on="slotProps.prevButtonEvents"
            >
                <slot name="prev-nav">
                    Previous
                </slot>
            </button>

            <button
                :aria-current="slotProps.computed.currentPage ? 'page' : null"
                v-for="(page, key) in slotProps.computed.pageRange"
                :key="key"
                v-on="slotProps.pageButtonEvents(page)"
            >
                {{ page }}
            </button>

            <button
                :disabled="!slotProps.computed.nextPageUrl"
                v-on="slotProps.nextButtonEvents"
            >
                <slot name="next-nav">
                    Next
                </slot>
            </button>
        </nav>
    </RenderlessPagination>
</template>

<script>
import RenderlessPagination from 'laravel-vue-pagination/src/RenderlessPagination.vue';

export default {
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
    },

    methods: {
        onPaginationChangePage(page) {
            this.$emit('pagination-change-page', page);
        }
    }
}
</script>
```

## Scoped Slot Props
The `RenderlessPagination` component has the same [pros](/guide/api/props.html) and [events](/guide/api/events.html) as the pre-built pagination components. However, it also exposes the following scoped slot props:

### data

The `data` prop that was passed to the `RenderlessPagination` component.

### limit

The `limit` prop that was passed to the `RenderlessPagination` component.

### computed

Some computed properties that are used by the `RenderlessPagination` component:

* `isApiResource` - Boolean indicating whether the `data` prop is an API resource
* `currentPage` - Integer indicating the current page
* `firstPageUrl` - The URL for the first page
* `from` - Integer indicating the first item on the current page
* `lastPage` - Integer indicating the last page
* `lastPageUrl` - The URL for the last page
* `nextPageUrl` - The URL for the next page
* `perPage` - Integer indicating the number of items per page
* `prevPageUrl` - The URL for the previous page
* `to` - Integer indicating the last item on the current page
* `total` - Integer indicating the total number of items
* `pageRange` - An array of integers indicating the page range

### prevButtonEvents

An object containing the event listeners for the previous button:

* `click` - Event listener for the `click` event

### nextButtonEvents

An object containing the event listeners for the next button:

* `click` - Event listener for the `click` event

### pageButtonEvents

An function containing the event listeners for a page button. Takes the `page` number as an argument:

* `click` - Event listener for the `click` event