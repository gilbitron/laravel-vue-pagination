# Installation

## Requirements

* [Vue.js](https://vuejs.org/) 3
* [Laravel](http://laravel.com/docs/) 5+
* [Bootstrap](http://getbootstrap.com/) 4/5
* [Tailwind CSS](https://tailwindcss.com/) 3

::: tip
For Vue 2 support use [v2](https://github.com/gilbitron/laravel-vue-pagination/releases/tag/2.3.2)
:::

## Install

Install with yarn or npm:

:::: code-group
::: code-group-item YARN
```bash:no-line-numbers
yarn add laravel-vue-pagination
```
:::
::: code-group-item NPM
```bash:no-line-numbers
npm install laravel-vue-pagination
```
:::
::::

Then, import and register the pagination component required for your project:

```js
import { Bootstrap4Pagination } from 'laravel-vue-pagination';
import { Bootstrap5Pagination } from 'laravel-vue-pagination';
import { TailwindPagination } from 'laravel-vue-pagination';
```
