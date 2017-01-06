[![Build Status](https://travis-ci.org/gilbitron/laravel-vue-pagination.svg?branch=master)](https://travis-ci.org/gilbitron/laravel-vue-pagination)

# Laravel Vue Pagination
A Vue.js pagination component for Laravel paginators that works with Bootstrap.

## Requirements

* [Vue.js](https://vuejs.org/) 2.x
* [Laravel](http://laravel.com/docs/) 5.x
* [Bootstrap](http://getbootstrap.com/) 3.x

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

## API

### Props

| Name | Type | Description |
| --- | --- | --- |
| `data` | Object | An object containing the structure of a [Laravel paginator](https://laravel.com/docs/5.3/pagination) response. See below for default value. |

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

### Events

| Name | Description |
| --- | --- |
| `pagination-change-page` | Triggered when a user changes page. Passes the new `page` index as a parameter. |

## Credits

Laravel Vue Pagination was created by [Gilbert Pellegrom](http://gilbert.pellegrom.me) from
[Dev7studios](http://dev7studios.co). Released under the MIT license.
