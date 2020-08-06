export class Ticket {
	constructor(ticket) {
		this.ticket = ticket;
		this.price = ticket.price;
		this.refundable = ticket.refundable;
	}

	getCarrier() {
		const data = this.ticket.itineraries[0][0];
		return {
			name: data.carrier_name,
			id: data.carrier
		};
	}

	getFlightDate() {
		const data = this.ticket.itineraries[0][0].segments;
		const dep = data[0].dep_time;
		const arr = data[data.length - 1].arr_time;
		return {
			dep: {
				date: dep.substring(0, dep.length - 5),
				time: dep.substring(dep.length - 5)
			},
			arr: {
				date: arr.substring(0, arr.length - 5),
				time: arr.substring(arr.length - 5)
			}
		};
	}

	getFlightTime() {
		const data = this.ticket.itineraries[0][0].traveltime;
		return this.fromSecondsToTime(data);
	}

	fromSecondsToTime(data) {
		const hours = Math.floor(data / 3600);
		const minutes = data / 60 - hours * 60;
		return `${ hours } ч ${ minutes } м`;
	}

	getFlightPathCode() {
		const data = this.ticket.itineraries[0][0].segments;
		return {
			origin: data[0].origin_code,
			dest: data[data.length - 1].dest_code
		};
	}

	isDirect() {
		const data = this.ticket.itineraries[0][0].segments;
		return data.length < 2;
	}

	getSegmets() {
		const data = this.ticket.itineraries[0][0].segments;
		if(data.length < 2) return '';
		let segmentsStr = 'через ';
		for(let index in data) {
			if(index == data.length - 1) break;
			const segment = data[index];
			const dep = new Date(segment.dep_time_iso);
			const arr = new Date(segment.arr_time_iso);
			const time = this.fromSecondsToTime((arr - dep) / 1000);
			segmentsStr += `${segment.dest}, ${time} \n`;
		}
		return segmentsStr;
	}

	getBaggageService() {
		const data = this.ticket.services;
		const baggage = data[Object.keys(data)[0]].value;
		return baggage;
	}
}