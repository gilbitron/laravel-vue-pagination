[![Build Status](https://travis-ci.org/gilbitron/laravel-vue-pagination.svg?branch=master)](https://travis-ci.org/gilbitron/laravel-vue-pagination) [![npm](https://img.shields.io/npm/v/laravel-vue-pagination.svg)](https://www.npmjs.com/package/laravel-vue-pagination) [![Downloads](https://img.shields.io/npm/dt/laravel-vue-pagination.svg)](https://www.npmjs.com/package/laravel-vue-pagination)

# Laravel Vue Pagination
A Vue.js pagination component for Laravel paginators that works with Bootstrap.

## Requirements

* [Vue.js](https://vuejs.org/) 2.x
* [Laravel](http://laravel.com/docs/) 5.x
* [Bootstrap](http://getbootstrap.com/) 4

## Install

```bash
npm install laravel-vue-pagination
// or
yarn add laravel-vue-pagination
```

## Demo

See [https://laravel-vue-pagination.now.sh](https://laravel-vue-pagination.now.sh/)

## Usage

Register the component:

```javascript
Vue.component('pagination', require('laravel-vue-pagination'));
```

Use the component:

```html
<ul>
    <li v-for="post in laravelData.data" :key="post.id">{{ post.title }}</li>
</ul>

<pagination :data="laravelData" @pagination-change-page="getResults"></pagination>
```

```javascript
export default {

	data() {
		return {
			// Our data object that holds the Laravel paginator data
			laravelData: {},
		}
	},

	mounted() {
		// Fetch initial results
		this.getResults();
	},

	methods: {
		// Our method to GET results from a Laravel endpoint
		getResults(page = 1) {
			axios.get('example/results?page=' + page)
				.then(response => {
					this.laravelData = response.data;
				});
		}
	}

}
```

### Customizing Prev/Next Buttons

Prev/Next buttons can be customized using the `prev-nav` and `next-nav` slots:

```html
<pagination :data="laravelData">
	<span slot="prev-nav">&lt; Previous</span>
	<span slot="next-nav">Next &gt;</span>
</pagination>
```

## API

### Props

| Name | Type | Description |
| --- | --- | --- |
| `data` | Object | An object containing the structure of a [Laravel paginator](https://laravel.com/docs/5.7/pagination) response or a [Laravel API Resource](https://laravel.com/docs/5.7/eloquent-resources) response. |
| `limit` | Number | (optional) Limit of pages to be rendered. `0` shows all pages (default). `-1` will hide numeric pages and leave only arrow navigation. Any positive integer (e.g. `2`) will define how many pages should be shown on either side of the current page when only a range of pages are shown. |
| `show-disabled` | Boolean | (optional) Show disabled prev/next buttons instead of hiding them. `false` hides disabled buttons (default). `true` shows disables buttons. |
| `size` | String | (optional) One of `small`, `default` or `large` |
| `align` | String | (optional) One of `left` (default), `center` or `right` |

### Events

| Name | Description |
| --- | --- |
| `pagination-change-page` | Triggered when a user changes page. Passes the new `page` index as a parameter. |

## Development

To work on the library locally, run the following command:

```bash
npm run serve
```

To run the tests:

```bash
npm run test
```

## Credits

Laravel Vue Pagination was created by [Gilbert Pellegrom](https://gilbitron.me) from [Dev7studios](https://dev7studios.co). Released under the MIT license.
