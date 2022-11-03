# Quick Start

Here is a simple copy-paste example to get you started.

```vue
<template>
  <div>
    <ul>
      <li v-for="post in laravelData.data" :key="post.id">{{ post.title }}</li>
    </ul>

    <TailwindPagination
        :data="laravelData"
        @pagination-change-page="getResults"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TailwindPagination } from 'laravel-vue-pagination';

const laravelData = ref({});

const getResults = async (page = 1) => {
    const response = await fetch(`https://example.com/results?page=${page}`);
    laravelData.value = await response.json();
}

getResults();
</script>
```

A short explanation of the above example:

1. We use the `getResults()` method to fetch some data from a Laravel application. This method is called when the component is created. The initial data could also be passed as a prop to the component.
1. We use the `v-for` directive to loop through the data and display it on the page.
1. We use the `<TailwindPagination>` component to display the pagination links. We use the `:data` [prop](/guide/api/props.html) to pass the paginator data from Laravel to the pagination component.
1. We use the `@pagination-change-page` [event](/guide/api/events.html) to call the `getResults()` method when the user changes page. This event passes the new page number as a parameter.
