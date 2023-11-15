import { mount } from '@vue/test-utils';
import RenderlessPagination from '@/RenderlessPagination.vue';

const paginateData = {
    current_page: 1,
    data: [...Array(10).keys()],
    first_page_url: 'https://example.com/pagination?page=1',
    from: 1,
    last_page: 10,
    last_page_url: 'https://example.com/pagination?page=10',
    links: [
        {
            url: null,
            label: '\u00ab Previous',
            active: false,
        },
        {
            url: 'https://example.com/pagination?page=1',
            label: '1',
            active: true,
        },
        {
            url: 'https://example.com/pagination?page=2',
            label: '2',
            active: false,
        },
        {
            url: 'https://example.com/pagination?page=3',
            label: 'Next \u00bb',
            active: false,
        },
    ],
    next_page_url: 'https://example.com/pagination?page=2',
    path: 'https://example.com/pagination',
    per_page: 10,
    prev_page_url: null,
    to: 10,
    total: 100,
};

test('parses paginate data', function () {
    const wrapper = mount(RenderlessPagination, {
        slots: {
            default: '<div></div>',
        },
        propsData: {
            data: paginateData,
        },
    });

    expect(wrapper.vm.isApiResource).toEqual(false);
    expect(wrapper.vm.currentPage).toEqual(paginateData.current_page);
    expect(wrapper.vm.firstPageUrl).toEqual(null); // TODO fix this
    expect(wrapper.vm.from).toEqual(paginateData.from);
    expect(wrapper.vm.lastPage).toEqual(paginateData.last_page);
    expect(wrapper.vm.lastPageUrl).toEqual(null); // TODO fix this
    expect(wrapper.vm.nextPageUrl).toEqual(paginateData.next_page_url);
    expect(wrapper.vm.perPage).toEqual(paginateData.per_page);
    expect(wrapper.vm.prevPageUrl).toEqual(paginateData.prev_page_url);
    expect(wrapper.vm.to).toEqual(paginateData.to);
    expect(wrapper.vm.total).toEqual(paginateData.total);
    expect(wrapper.vm.pageRange).toEqual(10);
});

const simplePaginateData = {
    current_page: 1,
    data: [...Array(10).keys()],
    first_page_url: 'https://example.com/pagination?page=1',
    from: 1,
    next_page_url: 'https://example.com/pagination?page=2',
    path: 'https://example.com/pagination',
    per_page: 10,
    prev_page_url: null,
    to: 10,
};

test('parses paginate data', function () {
    const wrapper = mount(RenderlessPagination, {
        slots: {
            default: '<div></div>',
        },
        propsData: {
            data: simplePaginateData,
        },
    });

    expect(wrapper.vm.isApiResource).toEqual(false);
    expect(wrapper.vm.currentPage).toEqual(simplePaginateData.current_page);
    expect(wrapper.vm.firstPageUrl).toEqual(null); // TODO fix this
    expect(wrapper.vm.from).toEqual(simplePaginateData.from);
    expect(wrapper.vm.lastPage).toBeUndefined(); // TODO fix this
    expect(wrapper.vm.lastPageUrl).toEqual(null);
    expect(wrapper.vm.nextPageUrl).toEqual(simplePaginateData.next_page_url);
    expect(wrapper.vm.perPage).toEqual(simplePaginateData.per_page);
    expect(wrapper.vm.prevPageUrl).toEqual(simplePaginateData.prev_page_url);
    expect(wrapper.vm.to).toEqual(simplePaginateData.to);
    expect(wrapper.vm.total).toBeUndefined(); // TODO fix this
    expect(wrapper.vm.pageRange).toBeUndefined(); // TODO fix this
});

const resourcePaginateData = {
    data: [...Array(10).keys()],
    links: {
        first: 'https://example.com/pagination?page=1',
        last: 'https://example.com/pagination?page=10',
        prev: null,
        next: 'https://example.com/pagination?page=2',
    },
    meta: {
        current_page: 1,
        from: 1,
        last_page: 10,
        links: [
            {
                url: null,
                label: '\u00ab Previous',
                active: false,
            },
            {
                url: 'https://example.com/pagination?page=1',
                label: '1',
                active: true,
            },
            {
                url: 'https://example.com/pagination?page=2',
                label: '2',
                active: false,
            },
            {
                url: 'https://example.com/pagination?page=3',
                label: 'Next \u00bb',
                active: false,
            },
        ],
        path: 'https://example.com/pagination',
        per_page: 10,
        to: 10,
        total: 100,
    },
};

test('parses paginate data', function () {
    const wrapper = mount(RenderlessPagination, {
        slots: {
            default: '<div></div>',
        },
        propsData: {
            data: resourcePaginateData,
        },
    });

    expect(wrapper.vm.isApiResource).toEqual(true);
    expect(wrapper.vm.currentPage).toEqual(
        resourcePaginateData.meta.current_page
    );
    expect(wrapper.vm.firstPageUrl).toEqual(resourcePaginateData.links.first);
    expect(wrapper.vm.from).toEqual(resourcePaginateData.meta.from);
    expect(wrapper.vm.lastPage).toEqual(resourcePaginateData.meta.last_page);
    expect(wrapper.vm.lastPageUrl).toEqual(resourcePaginateData.links.last);
    expect(wrapper.vm.nextPageUrl).toEqual(resourcePaginateData.links.next);
    expect(wrapper.vm.perPage).toEqual(resourcePaginateData.meta.per_page);
    expect(wrapper.vm.prevPageUrl).toEqual(resourcePaginateData.links.prev);
    expect(wrapper.vm.to).toEqual(resourcePaginateData.meta.to);
    expect(wrapper.vm.total).toEqual(resourcePaginateData.meta.total);
    expect(wrapper.vm.pageRange).toEqual(10);
});
