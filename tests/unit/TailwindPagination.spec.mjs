import { mount } from '@vue/test-utils';
import TailwindPagination from '@/TailwindPagination.vue';

var exampleData = {
    current_page: 1,
    data: [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 },
        { id: 7 },
        { id: 8 },
        { id: 9 },
        { id: 10 },
        { id: 11 },
    ],
    from: 1,
    last_page: 6,
    next_page_url: 'http://example.com/page/2',
    per_page: 2,
    prev_page_url: null,
    to: 2,
    total: 11,
};

var exampleResourceData = {
    data: [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 },
        { id: 7 },
        { id: 8 },
        { id: 9 },
        { id: 10 },
        { id: 11 },
    ],
    links: {
        first: 'http://example.com/page/1',
        last: 'http://example.com/page/6',
        prev: null,
        next: 'http://example.com/page/2',
    },
    meta: {
        current_page: 1,
        from: 1,
        last_page: 6,
        path: 'http://example.com/page',
        per_page: 2,
        to: 2,
        total: 11,
    },
};

test('has correct DOM structure', function () {
    const wrapper = mount(TailwindPagination, {
        props: {
            data: exampleData,
        },
    });

    expect(wrapper.find('nav').exists()).toBe(true);
    expect(wrapper.findAll('button').length).toBe(8);
});

test('has correct DOM structure with -1 limit on page 2', function () {
    exampleData.current_page = 2;
    exampleData.next_page_url = 'http://example.com/page/3';
    exampleData.prev_page_url = 'http://example.com/page/1';

    const wrapper = mount(TailwindPagination, {
        props: {
            data: exampleData,
            limit: -1,
        },
    });

    expect(wrapper.find('nav').exists()).toBe(true);
    expect(wrapper.findAll('button').length).toBe(2);
});

test('has correct DOM structure with 1 link limit on page 5', function () {
    exampleData.current_page = 5;
    exampleData.last_page = 11;
    exampleData.per_page = 1;
    exampleData.next_page_url = 'http://example.com/page/6';
    exampleData.prev_page_url = 'http://example.com/page/4';

    const wrapper = mount(TailwindPagination, {
        props: {
            data: exampleData,
            limit: 1,
        },
    });

    expect(wrapper.find('nav').exists()).toBe(true);
    expect(wrapper.findAll('button').length).toBe(9);
});

test('has correct DOM structure when on page 2', function () {
    exampleData.current_page = 2;
    exampleData.last_page = 6;
    exampleData.per_page = 2;
    exampleData.next_page_url = 'http://example.com/page/3';
    exampleData.prev_page_url = 'http://example.com/page/1';

    const wrapper = mount(TailwindPagination, {
        props: {
            data: exampleData,
        },
    });

    expect(wrapper.findAll('button').length).toBe(8);
});

test('emits correct event', function () {
    const wrapper = mount(TailwindPagination, {
        props: {
            data: exampleData,
        },
    });

    wrapper.findAll('button').at(2).trigger('click');

    const event = wrapper.emitted('pagination-change-page');
    expect(event).toHaveLength(1);
    expect(event[0]).toEqual([2]);
});

test('has correct DOM structure when using slots', function () {
    const wrapper = mount(TailwindPagination, {
        props: { data: exampleData },
        slots: {
            'prev-nav': '<span class="custom-prev-nav">Previous</span>',
            'next-nav': '<span>Next</span>',
        },
    });

    expect(wrapper.html()).toContain(
        '<span class="custom-prev-nav">Previous</span>'
    );
    expect(wrapper.html()).toContain('<span>Next</span>');
});

test('has correct DOM structure for Laravel API Resource responses', function () {
    const wrapper = mount(TailwindPagination, {
        props: {
            data: exampleResourceData,
        },
    });

    expect(wrapper.find('nav').exists()).toBe(true);
    expect(wrapper.findAll('button').length).toBe(8);
});
