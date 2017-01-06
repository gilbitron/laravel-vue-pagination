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
	to: 3,
	total: 11,
};

describe('LaravelVuePagination', function() {
	it('has correct DOM structure', function() {
		const vm = getComponent(LaravelVuePagination, {
			data: exampleData
		});

		expect(vm.$el.nodeName).toBe('UL');
		expect(vm.$el.getElementsByTagName('li').length).toBe(7);
		expect(vm.$el.getElementsByTagName('li')[0].classList).toContain('active');
	});

	it('has correct DOM structure with 1 link limit on page 3', function() {
		exampleData.current_page = 3;
		exampleData.next_page_url = 'http://example.com/page/4';
		exampleData.prev_page_url = 'http://example.com/page/2';

		const vm = getComponent(LaravelVuePagination, {
			data: exampleData,
			limit: 1
		});

		expect(vm.$el.nodeName).toBe('UL');
		expect(vm.$el.getElementsByTagName('li').length).toBe(5);
		expect(vm.$el.getElementsByTagName('li')[2].classList).toContain('active');
	});

	it('has correct DOM structure when on page 2', function() {
		exampleData.current_page = 2;
		exampleData.next_page_url = 'http://example.com/page/3';
		exampleData.prev_page_url = 'http://example.com/page/1';

		const vm = getComponent(LaravelVuePagination, {
			data: exampleData
		});

		expect(vm.$el.getElementsByTagName('li').length).toBe(8);
		expect(vm.$el.getElementsByTagName('li')[2].classList).toContain('active');
	});

	it('emits correct event', function(done) {
		const vm = getComponent(LaravelVuePagination, {
			data: exampleData
		});

		vm.$on('pagination-change-page', function (page) {
			expect(page).toBe(2);
			done();
		});

		vm.selectPage(2);
	});
});
