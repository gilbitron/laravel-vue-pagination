# Props

These props are available on all components.

## data 

* `Object`

An object containing the structure of a [Laravel paginator](https://laravel.com/docs/9.x/pagination) response or a [Laravel API Resource](https://laravel.com/docs/9.x/eloquent-resources) response. 

## limit 

* `Number` (optional) 

Limit of pages to be rendered. `0` shows all pages (default). `-1` will hide numeric pages and leave only arrow navigation. Any positive integer (e.g. `2`) will define how many pages should be shown on either side of the current page when only a range of pages are shown.

## keepLength

* `Boolean` (optional)

When `true`, the pagination component will keep the same length regardless of the position of the page number. This is useful when you want to keep the pagination component always the same size and not vary at the first or last pages. The `limit` prop is used to determine the length of the pagination.

## lang

* `String` (optional)

The default lang value is `en-US`. Translating page numbers depends on Javascript toLocaleString method.
