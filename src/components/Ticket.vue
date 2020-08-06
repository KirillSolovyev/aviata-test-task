<template>
	<div class="ticket rounded flex">
		<div class="ticket__info-block flex flex-column flex-1-1">
			<div class="ticket__info flex items-center flex-1-1">
				<div class="ticket__company-name flex items-center">
					<img 
						class="mr-2" 
						:src="`https://aviata.kz/static/airline-logos/80x80/${flight.getCarrier().id}.png`" 
						:alt="flight.getCarrier().name"
					>
					{{ flight.getCarrier().name }}
				</div>
				<div class="ticket__date-block flex items-center">
					<div class="ticket__date mr-3">
						<p class="black-p">
							{{ flight.getFlightDate().dep.date }}
						</p>
						<p class="ticket__time">
							{{ flight.getFlightDate().dep.time }}
						</p>
					</div>
					<div class="flight-path">
						<div class="flight-path__header">
							<span class="gray-p">
								{{ flight.getFlightPathCode().origin }}
							</span>
							<span class="black-p">
								{{ flight.getFlightTime() }}
							</span>
							<span class="gray-p">
								{{ flight.getFlightPathCode().dest }}
							</span>
						</div>
						<div class="flight-path__path">
							<span></span>
						</div>
						<div class="flight-path__footer">
							<p v-if="flight.isDirect()" class="green-p">прямой</p>
							<p v-else class="orange-p">
								{{ flight.getSegmets() }}
							</p>
						</div>
					</div>
					<div class="ticket__date ml-3">
						<p class="black-p">
							{{ flight.getFlightDate().arr.date }}
							<!-- <span class="orange-p">+1</span> -->
						</p>
						<p class="ticket__time">
							{{ flight.getFlightDate().arr.time }}
						</p>
					</div>
				</div>
			</div>
			<div class="ticket__more-details flex">
				<a href="#" class="dashed-link mr-4" @click.prevent>Детали перелета</a>
				<a href="#" class="dashed-link mr-4" @click.prevent>Условия тарифа</a>
				<p v-if="!flight.refundable" class="gray-p">
					<img style="width: 17px" src="../assets/images/no-refund.svg" alt="Невозвратный">
					невозвратный
				</p>
			</div>
		</div>
		<div class="ticket__price-block flex flex-column justify-between">
			<p class="ticket__price mb-2">{{ flight.price }}<span>₸</span></p>
			<button class="main-btn">Выбрать</button>
			<p class="gray-p ticket__price-note">Цена за всех пассажиров</p>
			<div class="flex justify-between ticket__baggage items-center">
				<p class="black-p">
					{{ flight.getBaggageService() }}
				</p>
				<button class="purple-btn">+ Добавить багаж</button>
			</div>
		</div>
	</div>
</template>

<script>
	import { Ticket } from '../models/ticket';

	export default {
		name: 'ticket',
		props: {
			flight: Ticket
		}
	}
</script>

<style>
	.ticket {
		width: 100%;
		height: 168px;
		margin-bottom: 12px;
		overflow: hidden;
		background-color: #fff;
		box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
	}

	.ticket:last-of-type {
		margin-bottom: 0;
	}

	.ticket__info-block {
		padding: 12px 20px;
	}

	.ticket__company-name {
		width: 120px;
		font-size: 14px;
		font-weight: bold;
	}

	.ticket__company-name img {
		width: 16px;
	}

	.ticket__price-block {
		width: 30%;
		padding: 12px 20px;
		background-color: #F5F5F5;
	}

	.ticket__price {
		font-size: 24px;
		margin-bottom: 0;
		text-align: center;
	}

	.ticket__price span {
		font-size: 0.7em;
	}

	.ticket__time {
		margin: 0;
		font-size: 24px;
		line-height: 1.2;
		font-weight: 600;
	}

	.flight-path {
		display: flex;
		flex-direction: column;
		width: 180px;
	}

	.flight-path__header {
		display: flex;
		justify-content: space-between;
	}

	.flight-path__header .gray-p {
		font-size: 0.65em;
		opacity: 0.65;
	}

	.flight-path__path {
		height: 1px;
		margin: 5px 0;
		position: relative;
		background-color: #B9B9B9;
	}

	.flight-path__path:after, .flight-path__path:before, .flight-path__path span {
		content: '';
		position: absolute;
		width: 5px;
		height: 5px;
		background-color: #fff;
		border-radius: 100%;
		border: 1px solid #B9B9B9;
		top: calc(50% - 2.5px);
	}

	.flight-path__path:before {
		left: -2.5px;
	}

	.flight-path__path:after {
		right: -2.5px;
	}

	.flight-path__path span {
		left: calc(50% - 2.5px);
	}

	.ticket__price-note {
		text-align: center;
	}

	.flight-path__footer p {
		text-align: center;
		font-size: 12px;
	}

	.ticket__baggage .black-p {
		font-size: 14px;
		text-align: center;
	}

	@media screen and (max-width: 768px) {
		.ticket {
			height: auto;
			flex-wrap: wrap;
		}

		.ticket__info-block {
			padding: 12px;
		}

		.ticket__info {
			flex-direction: column;
		}

		.ticket__company-name {
			width: auto;
			margin-bottom: 20px;
		}

		.ticket__date-block {
			margin-bottom: 20px;
			width: 100%;
		}

		.flight-path {
			flex: 1 1 auto;
			width: auto;
		}

		.ticket__price-block {
			width: 100%;
			padding: 12px;
			flex-direction: row !important;
			flex-wrap: wrap;
			align-items: center;
		}

		.ticket__price {
			width: 50%;
			margin-bottom: 0 !important;
		}

		.ticket__price-block .main-btn {
			width: 50%;
		}

		.ticket__baggage {
			width: 50%;
		}

		.ticket__price-note {
			width: 50%;
		}
	}
</style>