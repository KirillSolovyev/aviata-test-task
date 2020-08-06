<template>
	<div class="col-lg-8 content">
		<template v-if="flights.length">
			<ticket v-for="flight in flights" :flight="flight" :key="flight.id" />
		</template>
		<div v-else class="rounded tickets-not-found">Рейсов не найдено</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';

	import Ticket from '../Ticket/Ticket.vue';
	import { fetchFlights } from '../../services/main-service';
	import { Ticket as TicketModel } from '../../models/ticket';

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
				const response = await fetchFlights({ airlines: this.filter.companies, options: this.filter.options });
				this.flights = response.map(item => new TicketModel(item));
			}
		},
		computed: {
			...mapGetters(['filter']),
		},
		watch: {
			filter: {
				deep: true,
				handler() {
					this.getFlights();
				}
			},
		},
	}
</script>

<style>
	.tickets-not-found {
		background-color: #fff;
		padding: 12px;
		font-size: 18px;
		text-align: center;
	}
</style>