import result from './results.json';
import { Ticket } from '../models/ticket';

export const fetchAirlines = () => {
	return Promise.resolve(result.airlines);
};

export const fetchFlights = ({ airlines, options } = {}) => {
	let response = result.flights;
	if(airlines && airlines.length) {
		response = response.filter(item => airlines.includes(item.validating_carrier));
	}
	if(options && options.length) {
		response = response.filter(ticket => {
			const tic = new Ticket(ticket);
			let filter = true;
			for(let option of options) {
				if(option === 'onlyDirect') filter = filter && tic.isDirect();
				else if (option === 'withBaggage') filter = filter && tic.getBaggageService() !== '0 PC';
				else if (option === 'withRefund') filter = filter && tic.refundable;
			}
			if(filter) return ticket;
		});
	}
	return Promise.resolve(response);
}