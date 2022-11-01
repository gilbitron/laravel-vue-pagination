# Bootstrap 5

Use this component to add [Bootstrap 5](https://getbootstrap.com/docs/5.2/) compatible pagination to your application.

```vue
<template>
  <Bootstrap5Pagination
      :data="laravelData"
      @pagination-change-page="getResults"
  />
</template>

<script setup>
import { Bootstrap5Pagination } from 'laravel-vue-pagination';
</script>
```

See the Bootstrap specific [props](/api/bootstrap-props.html) for this component.