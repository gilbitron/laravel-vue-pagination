module.exports = {
	props: {
		data: {
			type: Object,
			default() {
				return {
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
			}
		}
	},

	template: '<ul class="pagination" v-if="data.total > data.per_page">' +
	'	<li v-if="data.prev_page_url">' +
	'		<a href="#" aria-label="Previous" @click.prevent="selectPage(--data.current_page)"><span aria-hidden="true">&laquo;</span></a>' +
	'	</li>' +
	'	<li v-for="n in data.last_page" :class="{ \'active\': n == data.current_page }"><a href="#" @click.prevent="selectPage(n)">{{ n }}</a></li>' +
	'	<li v-if="data.next_page_url">' +
	'		<a href="#" aria-label="Next" @click.prevent="selectPage(++data.current_page)"><span aria-hidden="true">&raquo;</span></a>' +
	'	</li>' +
	'</ul>',

	methods: {
		selectPage(page) {
			this.$emit('pagination-change-page', page);
		}
	}
};
