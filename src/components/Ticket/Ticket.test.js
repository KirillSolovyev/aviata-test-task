import { shallowMount } from '@vue/test-utils';
import Ticket from './Ticket';
import { Ticket as TicketModel } from '@/models/ticket';
import result from '@/services/results.json';

const flight = new TicketModel(result.flights[0]);
const wrapper = shallowMount(Ticket, { propsData: { flight: flight } });

describe('Ticket component', () => {
	it('should render props', () => {
		expect(wrapper.find('.ticket__company-name').text()).toContain(flight.getCarrier().name);
		expect(wrapper.find('#depDate').text().trim()).toContain(flight.getFlightDate().dep.date.trim());
		expect(wrapper.find('#depTime').text().trim()).toContain(flight.getFlightDate().dep.time.trim());
		expect(wrapper.find('#arrDate').text().trim()).toContain(flight.getFlightDate().arr.date.trim());
		expect(wrapper.find('#arrTime').text().trim()).toContain(flight.getFlightDate().arr.time.trim());
		expect(wrapper.find('#origin').text().trim()).toContain(flight.getFlightPathCode().origin.trim());
		expect(wrapper.find('#dest').text().trim()).toContain(flight.getFlightPathCode().dest.trim());
		expect(wrapper.find('#flightTime').text().trim()).toContain(flight.getFlightTime().trim());
		expect(wrapper.find('#flightBaggage').text().trim()).toContain(flight.getBaggageService().trim());
		expect(wrapper.find('#flightPrice').text().trim()).toContain(flight.price);
		expect(wrapper.find('#noRefundBlock').exists()).toBe(true);
		expect(wrapper.find('#isDirect').exists()).toBe(false);
	});
});