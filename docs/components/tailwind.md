# Tailwind

Use this component to add [Tailwind CSS](https://tailwindcss.com/) compatible pagination to your application.

```vue
<template>
  <TailwindPagination
      :data="laravelData"
      @pagination-change-page="getResults"
  />
</template>

<script setup>
import { TailwindPagination } from 'laravel-vue-pagination';
</script>
```

See the Tailwind specific [props](/api/tailwind-props.html) for this component.