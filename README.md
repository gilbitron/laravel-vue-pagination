[![Build Status](https://travis-ci.org/gilbitron/laravel-vue-pagination.svg?branch=master)](https://travis-ci.org/gilbitron/laravel-vue-pagination) [![npm](https://img.shields.io/npm/v/laravel-vue-pagination.svg)](https://www.npmjs.com/package/laravel-vue-pagination) [![Downloads](https://img.shields.io/npm/dt/laravel-vue-pagination.svg)](https://www.npmjs.com/package/laravel-vue-pagination)

# Laravel Vue Pagination
A Vue.js pagination component for Laravel paginators that works with Bootstrap.

## Requirements

* [Vue.js](https://vuejs.org/) 2.x
* [Laravel](http://laravel.com/docs/) 5.x
* [Bootstrap](http://getbootstrap.com/) 3/4

## Install

```bash
npm install laravel-vue-pagination
// or
yarn add laravel-vue-pagination
```

## Usage

Register the component:

```javascript
Vue.component('pagination', require('laravel-vue-pagination'));
```

Use the component:

```html
<ul>
    <li v-for="post in laravelData.data" v-text="post.title"></li>
</ul>

<pagination :data="laravelData" v-on:pagination-change-page="getResults"></pagination>
```

```javascript
Vue.component('example-component', {

	data() {
		return {
			// Our data object that holds the Laravel paginator data
			laravelData: {},
		}
	},

	created() {
		// Fetch initial results
		this.getResults();
	},

	methods: {
		// Our method to GET results from a Laravel endpoint
		getResults(page) {
			if (typeof page === 'undefined') {
				page = 1;
			}

			// Using vue-resource as an example
			this.$http.get('example/results?page=' + page)
				.then(response => {
					return response.json();
				}).then(data => {
					this.laravelData = data;
				});
		}
	}

});
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
| `data` | Object | An object containing the structure of a [Laravel paginator](https://laravel.com/docs/5.4/pagination) response. See below for default value. |
| `limit` | Number | (optional) Limit of pages to be rendered. Default `0` (unlimited pages) `-1` will hide numeric pages and leave only arrow navigation. Any positive integer (e.g. `2`) will define how many pages should be shown on either side of the current page when only a range of pages are shown (see below for example output). |

**Default `data`**

```javascript
{
	current_page: 1,
	data: [],
	from: 1,
	last_page: 1,
	next_page_url: null,
	per_page: 10,
	prev_page_url: null,
	to: 1,
	total: 0,
}
```

**Example `limit`**

![screen shot 2018-01-12 at 4 47 50 pm](https://user-images.githubusercontent.com/203882/34885624-8001513e-f7b8-11e7-9922-236e2b07caa0.png)

### Events

| Name | Description |
| --- | --- |
| `pagination-change-page` | Triggered when a user changes page. Passes the new `page` index as a parameter. |

## Credits

Laravel Vue Pagination was created by [Gilbert Pellegrom](https://gilbitron.me) from [Dev7studios](https://dev7studios.co). Released under the MIT license.
