# Bootstrap 5

## Usage

Use the `Bootstrap5Pagination` component to add [Bootstrap 5](https://getbootstrap.com/docs/5.2/) compatible pagination to your application.

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

## Props

As well as the [global props](/guide/api/props.html), the following props are available for this component:

### show-disabled

* `Boolean` (optional)

Show disabled prev/next buttons instead of hiding them. `false` hides disabled buttons (default). `true` shows disables buttons.

### size

* `String` (optional)

One of `small`, `default` or `large`.

### align

* `String` (optional)

One of `left` (default), `center` or `right`.