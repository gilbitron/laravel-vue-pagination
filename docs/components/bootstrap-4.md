# Bootstrap 4

Use this component to add [Bootstrap 4](https://getbootstrap.com/docs/4.6/) compatible pagination to your application.

```vue
<template>
    <Bootstrap4Pagination
        :data="laravelData"
        @pagination-change-page="getResults"
    />
</template>

<script setup>
import { Bootstrap4Pagination } from 'laravel-vue-pagination';
</script>
```

See the Bootstrap specific [props](/api/bootstrap-props.html) for this component.