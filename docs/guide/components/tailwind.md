# Tailwind

## Usage

Use the `TailwindPagination` component to add [Tailwind CSS](https://tailwindcss.com/) compatible pagination to your application.

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

## Props

As well as the [global props](/guide/api/props.html), the following props are available for this component:

### item-classes

* `Array` (optional)

An array of Tailwind color classes to be applied to each pagination item. Default:

* `bg-white`
* `text-gray-500`
* `border-gray-300`
* `hover:bg-gray-50`

### active-classes

* `Array` (optional)

An array of Tailwind color classes to be applied to the active pagination item. Default:

* `bg-blue-50`
* `border-blue-500`
* `text-blue-600`