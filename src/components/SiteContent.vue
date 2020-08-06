<template>
	<div class="col-lg-8 content">
		<ticket v-for="flight in flights" :flight="flight" :key="flight.id" />
	</div>
</template>

<script>
	import Ticket from './Ticket.vue';
	import { fetchFlights } from '../services/main-service';

	export default {
		name: 'site-content',
		components: {
			Ticket
		},
		data() {
			return {
				flights: []
			};
		},
		mounted() {
			this.getFlights();
		},
		methods: {
			async getFlights() {
				const response = await fetchFlights();
				this.flights = response;
			}
		},
	}
</script>

<style></style>