import Vue from 'vue';
import App from './App.vue';

Vue.component('pagination', require('../../src/laravel-vue-pagination'));

new Vue({
    el: '#app',
    render: h => h(App)
});
