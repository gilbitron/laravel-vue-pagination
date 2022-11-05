# Laravel Paginators

This library supports the [JSON data structures](https://laravel.com/docs/9.x/pagination#converting-results-to-json) returned by Laravel's [`paginate()`](https://laravel.com/docs/9.x/pagination#paginating-query-builder-results) and [`simplePaginate()`](https://laravel.com/docs/9.x/pagination#simple-pagination) methods as well as Eloquent's [API Resource pagination](https://laravel.com/docs/9.x/eloquent-resources#pagination).

## paginate() example

```json
{
    "current_page": 1,
    "data": [
        ...
    ],
    "first_page_url": "https://example.com/pagination?page=1",
    "from": 1,
    "last_page": 10,
    "last_page_url": "https://example.com/pagination?page=10",
    "links": [
        ...
    ],
    "next_page_url": "https://example.com/pagination?page=2",
    "path": "https://example.com/pagination",
    "per_page": 15,
    "prev_page_url": null,
    "to": 15,
    "total": 150
}
```

## simplePaginate() example

```json
{
    "current_page": 1,
    "data": [
        ...
    ],
    "first_page_url": "https://example.com/pagination?page=1",
    "from": 1,
    "next_page_url": "https://example.com/pagination?page=2",
    "path": "https://example.com/pagination",
    "per_page": 15,
    "prev_page_url": null,
    "to": 15
}
```

## API Resource example

```json
{
    "data": [
        ...
    ],
    "links": {
        "first": "https://example.com/pagination?page=1",
        "last": "https://example.com/pagination?page=10",
        "prev": null,
        "next": "https://example.com/pagination?page=2"
    },
    "meta": {
        "current_page": 1,
        "from": 1,
        "last_page": 10,
        "links": [
            ...
        ],
        "path": "https://example.com/pagination",
        "per_page": 15,
        "to": 15,
        "total": 150
    }
}
```