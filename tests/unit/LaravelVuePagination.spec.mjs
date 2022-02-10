import { mount } from '@vue/test-utils';
import LaravelVuePagination from '@/LaravelVuePagination.vue';

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
    const wrapper = mount(LaravelVuePagination, {
        props: {
            data: exampleData,
        },
    });

    expect(wrapper.find('ul').exists()).toBe(true);
    expect(wrapper.findAll('li').length).toBe(7);
    expect(wrapper.findAll('li').at(0).element.classList).toContain('active');
});

test('shows disabled links', function () {
    const wrapper = mount(LaravelVuePagination, {
        props: {
            data: exampleData,
            showDisabled: true,
        },
    });
    expect(wrapper.findAll('li').at(0).element.classList).toContain('disabled');
    expect(wrapper.findAll('a').at(0).element.tabIndex).toBe(-1);
    expect(wrapper.findAll('.disabled').length).toEqual(1);
});

test('does not show disabled links', function () {
    const wrapper = mount(LaravelVuePagination, {
        props: {
            data: exampleData,
        },
    });
    expect(wrapper.findAll('li').at(0).element.classList).not.toContain(
        'disabled'
    );
    expect(wrapper.findAll('a').at(0).element.tabIndex).toBe(0);
    expect(wrapper.findAll('.disabled').length).toEqual(0);
});

test('has correct DOM structure with -1 limit on page 2', function () {
    exampleData.current_page = 2;
    exampleData.next_page_url = 'http://example.com/page/3';
    exampleData.prev_page_url = 'http://example.com/page/1';

    const wrapper = mount(LaravelVuePagination, {
        props: {
            data: exampleData,
            limit: -1,
        },
    });

    expect(wrapper.find('ul').exists()).toBe(true);
    expect(wrapper.findAll('li').length).toBe(2);
});

test('has correct DOM structure with 1 link limit on page 5', function () {
    exampleData.current_page = 5;
    exampleData.last_page = 11;
    exampleData.per_page = 1;
    exampleData.next_page_url = 'http://example.com/page/6';
    exampleData.prev_page_url = 'http://example.com/page/4';

    const wrapper = mount(LaravelVuePagination, {
        props: {
            data: exampleData,
            limit: 1,
        },
    });

    expect(wrapper.find('ul').exists()).toBe(true);
    expect(wrapper.findAll('li').length).toBe(9);
    expect(wrapper.findAll('li').at(4).element.classList).toContain('active');
});

test('has correct DOM structure when on page 2', function () {
    exampleData.current_page = 2;
    exampleData.last_page = 6;
    exampleData.per_page = 2;
    exampleData.next_page_url = 'http://example.com/page/3';
    exampleData.prev_page_url = 'http://example.com/page/1';

    const wrapper = mount(LaravelVuePagination, {
        props: {
            data: exampleData,
        },
    });

    expect(wrapper.findAll('li').length).toBe(8);
    expect(wrapper.findAll('li').at(2).element.classList).toContain('active');
});

test('emits correct event', function () {
    const wrapper = mount(LaravelVuePagination, {
        props: {
            data: exampleData,
        },
    });

    wrapper.findAll('li').at(2).find('a').trigger('click');

    const event = wrapper.emitted('pagination-change-page');
    expect(event).toHaveLength(1);
    expect(event[0]).toEqual([2]);
});

test('has correct DOM structure when using slots', function () {
    const wrapper = mount(LaravelVuePagination, {
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
    const wrapper = mount(LaravelVuePagination, {
        props: {
            data: exampleResourceData,
        },
    });

    expect(wrapper.find('ul').exists()).toBe(true);
    expect(wrapper.findAll('li').length).toBe(7);
    expect(wrapper.findAll('li').at(0).element.classList).toContain('active');
});

test('has correct size', function () {
    let wrapper = mount(LaravelVuePagination, {
        props: {
            data: exampleData,
            size: 'small',
        },
    });

    expect(wrapper.find('.pagination').element.classList).toContain(
        'pagination-sm'
    );

    wrapper = mount(LaravelVuePagination, {
        props: {
            data: exampleData,
            size: 'large',
        },
    });

    expect(wrapper.find('.pagination').element.classList).toContain(
        'pagination-lg'
    );
});

test('has correct align', function () {
    let wrapper = mount(LaravelVuePagination, {
        props: {
            data: exampleData,
            align: 'center',
        },
    });

    expect(wrapper.find('.pagination').element.classList).toContain(
        'justify-content-center'
    );

    wrapper = mount(LaravelVuePagination, {
        props: {
            data: exampleData,
            align: 'right',
        },
    });

    expect(wrapper.find('.pagination').element.classList).toContain(
        'justify-content-end'
    );
});
