import { mount } from '@vue/test-utils';
import RenderlessPagination from '@/RenderlessPagination.vue';

var paginateData = {
    current_page: 1,
    data: [...Array(10).keys()],
    first_page_url: 'https://example.com/pagination?page=1',
    from: 1,
    last_page: 10,
    last_page_url: 'https://example.com/pagination?page=10',
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
    expect(wrapper.vm.firstPageUrl).toEqual(paginateData.first_page_url);
    expect(wrapper.vm.from).toEqual(paginateData.from);
    expect(wrapper.vm.lastPage).toEqual(paginateData.last_page);
    expect(wrapper.vm.lastPageUrl).toEqual(paginateData.last_page_url);
    expect(wrapper.vm.nextPageUrl).toEqual(paginateData.next_page_url);
    expect(wrapper.vm.perPage).toEqual(paginateData.per_page);
    expect(wrapper.vm.prevPageUrl).toEqual(paginateData.prev_page_url);
    expect(wrapper.vm.to).toEqual(paginateData.to);
    expect(wrapper.vm.total).toEqual(paginateData.total);
    //expect(wrapper.vm.pageRange).toEqual(1);
});
