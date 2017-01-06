const Vue = require('vue');
const LaravelVuePagination = require('../src/laravel-vue-pagination');

function getComponent(Component, propsData) {
	const Ctor = Vue.extend(Component);
	return new Ctor({ propsData }).$mount();
}

var exampleData = {
	current_page: 1,
	data: [
		{ id: 1 },
		{ id: 2 },
		{ id: 3 },
		{ id: 4 },
		{ id: 5 },
	],
	from: 1,
	last_page: 3,
	next_page_url: 'http://example.com/page/2',
	per_page: 2,
	prev_page_url: null,
	to: 3,
	total: 5,
};

describe('LaravelVuePagination', function() {
	it('has correct DOM structure', function() {
		const vm = getComponent(LaravelVuePagination, {
			data: exampleData
		});

		expect(vm.$el.nodeName).toBe('UL');
		expect(vm.$el.getElementsByTagName('li').length).toBe(4);
		expect(vm.$el.getElementsByTagName('li')[0].classList).toContain('active');
	});

	it('has correct DOM structure when on page 2', function() {
		exampleData.current_page = 2;
		exampleData.next_page_url = 'http://example.com/page/1';
		exampleData.prev_page_url = 'http://example.com/page/3';

		const vm = getComponent(LaravelVuePagination, {
			data: exampleData
		});

		expect(vm.$el.getElementsByTagName('li').length).toBe(5);
		expect(vm.$el.getElementsByTagName('li')[2].classList).toContain('active');
	});

	it('emits correct event', function() {
		const vm = getComponent(LaravelVuePagination, {
			data: exampleData
		});

		vm.$on('pagination-change-page', function (page) {
			expect(page).toBe(2);
		});

		vm.selectPage(2);
	});
});
