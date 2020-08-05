import result from './results.json';

export const fetchAirlines = () => {
	return Promise.resolve(result.airlines);
};

export const fetchFlights = () => {
	return Promise.resolve(result.flights);
}