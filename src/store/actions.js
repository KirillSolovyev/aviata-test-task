import { AIRLINES, FILTER } from './types';
import { fetchAirlines } from '../services/main-service';

export default {
	[AIRLINES.SET]: async (context) => {
		const airlines = await fetchAirlines();
		context.commit(AIRLINES.SET, airlines);
	},
	[FILTER.COMPANIES.ADD]: (context, payload) => {
		context.commit(FILTER.COMPANIES.ADD, payload);
	},
	[FILTER.COMPANIES.DELETE]: (context, payload) => {
		context.commit(FILTER.COMPANIES.DELETE, payload);
	},
	[FILTER.COMPANIES.CLEAR]: (context) => {
		context.commit(FILTER.COMPANIES.CLEAR);
	},
	[FILTER.OPTIONS.ADD]: (context, payload) => {
		context.commit(FILTER.OPTIONS.ADD, payload);
	},
	[FILTER.OPTIONS.DELETE]: (context, payload) => {
		context.commit(FILTER.OPTIONS.DELETE, payload);
	},
	[FILTER.OPTIONS.CLEAR]: (context) => {
		context.commit(FILTER.OPTIONS.CLEAR);
	},
}