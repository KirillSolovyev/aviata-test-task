import { AIRLINES } from './types';
import { fetchAirlines } from '../services/main-service';

export default {
	[AIRLINES.SET]: async (context) => {
		const airlines = await fetchAirlines();
		context.commit(AIRLINES.SET, airlines);
	},
}