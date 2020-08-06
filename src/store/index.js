import Vue from 'vue';
import Vuex from 'vuex';

import { FILTER, AIRLINES } from './types';
import actions from './actions';

Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		filter: {
			companies: [],
			options: []
		},
		airlines: {}
	},
	getters: {
		filter: state => state.filter,
		airlines: state => state.airlines,
		hasAirline: state => airlineId => state.filter.companies.filter(airline => airline === airlineId)[0] !== undefined,
	},
	mutations: {
		[FILTER.OPTIONS.ADD]: (state, payload) => {
			state.filter.options.push(payload);
		},
		[FILTER.OPTIONS.DELETE]: (state, payload) => {
			state.filter.options = state.filter.options.filter(option => option !== payload);
		},
		[FILTER.OPTIONS.CLEAR]: (state) => {
			state.filter.options = [];
		},
		[FILTER.COMPANIES.ADD]: (state, payload) => {
			state.filter.companies.push(payload);
		},
		[FILTER.COMPANIES.DELETE]: (state, payload) => {
			state.filter.companies = state.filter.companies.filter(company => company !== payload);
		},
		[FILTER.COMPANIES.CLEAR]: (state) => {
			state.filter.companies = [];
		},
		[AIRLINES.SET]: (state, payload) => {
			state.airlines = payload;
		},
	},
	actions: {
		...actions
	}
});