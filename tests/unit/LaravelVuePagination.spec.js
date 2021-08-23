import { mount } from '@vue/test-utils'
import LaravelVuePagination from '@/LaravelVuePagination.vue';

function getComponent(Component, props) {
    const wrapper = mount(Component, {
        propsData: props
    });
    return wrapper;
}

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
        next: 'http://example.com/page/2'
    },
    meta: {
        current_page: 1,
        from: 1,
        last_page: 6,
        path: 'http://example.com/page',
        per_page: 2,
        to: 2,
        total: 11,
    }
};

describe('LaravelVuePagination', function() {
    it('has correct DOM structure', function() {
        const wrapper = getComponent(LaravelVuePagination, {
            data: exampleData
        });

        expect(wrapper.find('ul').exists()).toBe(true);
        expect(wrapper.findAll('li').length).toBe(7);
        expect(wrapper.findAll('li')[0].element.classList).toContain('active');
    });

    it('shows disabled links', function() {
        const wrapper = getComponent(LaravelVuePagination, {
            data: exampleData,
            showDisabled: true,
        });
        expect(wrapper.findAll('li')[0].element.classList).toContain('disabled');
        expect(wrapper.findAll('a')[0].element.tabIndex).toBe(-1);
        expect(wrapper.findAll('.disabled').length).toEqual(1);
    });

    it('does not show disabled links', function() {
        const wrapper = getComponent(LaravelVuePagination, {
            data: exampleData,
        });
        expect(wrapper.findAll('li')[0].element.classList).not.toContain('disabled');
        expect(wrapper.findAll('a')[0].element.tabIndex).toBe(0);
        expect(wrapper.findAll('.disabled').length).toEqual(0);
    });

    it('has correct DOM structure with -1 limit on page 2', function() {
        exampleData.current_page = 2;
        exampleData.next_page_url = 'http://example.com/page/3';
        exampleData.prev_page_url = 'http://example.com/page/1';

        const wrapper = getComponent(LaravelVuePagination, {
            data: exampleData,
            limit: -1
        });

        expect(wrapper.find('ul').exists()).toBe(true);
        expect(wrapper.findAll('li').length).toBe(2);
    });

    it('has correct DOM structure with 1 link limit on page 5', function() {
        exampleData.current_page = 5;
        exampleData.last_page = 11;
        exampleData.per_page = 1;
        exampleData.next_page_url = 'http://example.com/page/6';
        exampleData.prev_page_url = 'http://example.com/page/4';

        const wrapper = getComponent(LaravelVuePagination, {
            data: exampleData,
            limit: 1
        });

        expect(wrapper.find('ul').exists()).toBe(true);
        expect(wrapper.findAll('li').length).toBe(9);
        expect(wrapper.findAll('li')[4].element.classList).toContain('active');
    });

    it('has correct DOM structure when on page 2', function() {
        exampleData.current_page = 2;
        exampleData.last_page = 6;
        exampleData.per_page = 2;
        exampleData.next_page_url = 'http://example.com/page/3';
        exampleData.prev_page_url = 'http://example.com/page/1';

        const wrapper = getComponent(LaravelVuePagination, {
            data: exampleData
        });

        expect(wrapper.findAll('li').length).toBe(8);
        expect(wrapper.findAll('li')[2].element.classList).toContain('active');
    });

    it('emits correct event', function() {
        const wrapper = getComponent(LaravelVuePagination, {
            data: exampleData
        });

        wrapper.findAll('li')[2].find('a').trigger('click');

        expect(wrapper.emitted()['pagination-change-page'].length).toBe(1);
        expect(wrapper.emitted()['pagination-change-page'][0]).toEqual([2]);
    });

    it('has correct DOM structure when using slots', function() {
        const wrapper = mount(LaravelVuePagination, {
            props: { data: exampleData },
            slots: {
                'prev-nav': '<span class="custom-prev-nav">Previous</span>',
                'next-nav': '<span>Next</span>'
            }
        });

        expect(wrapper.html()).toContain('<span class="custom-prev-nav">Previous</span>');
        expect(wrapper.html()).toContain('<span>Next</span>');
    });

    it('has correct DOM structure for Laravel API Resource responses', function() {
        const wrapper = getComponent(LaravelVuePagination, {
            data: exampleResourceData
        });

        expect(wrapper.find('ul').exists()).toBe(true);
        expect(wrapper.findAll('li').length).toBe(7);
        expect(wrapper.findAll('li')[0].element.classList).toContain('active');
    });

    it('has correct size', function() {
        let wrapper = getComponent(LaravelVuePagination, {
            data: exampleData,
            size: 'small'
        });

        expect(wrapper.find('.pagination').element.classList).toContain('pagination-sm');

        wrapper = getComponent(LaravelVuePagination, {
            data: exampleData,
            size: 'large'
        });

        expect(wrapper.find('.pagination').element.classList).toContain('pagination-lg');
    });

    it('has correct align', function() {
        let wrapper = getComponent(LaravelVuePagination, {
            data: exampleData,
            align: 'center'
        });

        expect(wrapper.find('.pagination').element.classList).toContain('justify-content-center');

        wrapper = getComponent(LaravelVuePagination, {
            data: exampleData,
            align: 'right'
        });

        expect(wrapper.find('.pagination').element.classList).toContain('justify-content-end');
    });
});
