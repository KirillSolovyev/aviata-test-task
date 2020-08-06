<template>
	<div class="ticket rounded flex">
		<div class="ticket__info-block flex flex-column flex-1-1">
			<div class="ticket__info flex items-center flex-1-1">
				<div class="ticket__company-name flex items-center">
					<img 
						class="mr-2" 
						:src="`https://aviata.kz/static/airline-logos/80x80/${this.getCarrier().id}.png`" 
						:alt="this.getCarrier().name"
					>
					{{ this.getCarrier().name }}
				</div>
				<div class="ticket__date-block flex items-center">
					<div class="ticket__date mr-3">
						<p class="black-p">
							{{ getFlightDate().dep.date }}
						</p>
						<p class="ticket__time">
							{{ getFlightDate().dep.time }}
						</p>
					</div>
					<div class="flight-path">
						<div class="flight-path__header">
							<span class="gray-p">
								{{ getFlightPathCode().origin }}
							</span>
							<span class="black-p">
								{{ getFlightTime() }}
							</span>
							<span class="gray-p">
								{{ getFlightPathCode().dest }}
							</span>
						</div>
						<div class="flight-path__path">
							<span></span>
						</div>
						<div class="flight-path__footer">
							<p v-if="isDirect()" class="green-p">прямой</p>
							<p v-else class="orange-p">
								{{ getSegmets() }}
							</p>
						</div>
					</div>
					<div class="ticket__date ml-3">
						<p class="black-p">
							{{ getFlightDate().arr.date }}
							<!-- <span class="orange-p">+1</span> -->
						</p>
						<p class="ticket__time">
							{{ getFlightDate().arr.time }}
						</p>
					</div>
				</div>
			</div>
			<div class="ticket__more-details flex">
				<a href="#" class="dashed-link mr-4">Детали перелета</a>
				<a href="#" class="dashed-link mr-4">Условия тарифа</a>
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
					{{ getBaggageService() }}
				</p>
				<button class="purple-btn">+ Добавить багаж</button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'ticket',
		props: {
			flight: Object
		},
		methods: {
			getCarrier() {
				const data = this.flight.itineraries[0][0];
				return {
					name: data.carrier_name,
					id: data.carrier
				};
			},

			getFlightDate() {
				const data = this.flight.itineraries[0][0].segments;
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
			},

			getFlightTime() {
				const data = this.flight.itineraries[0][0].traveltime;
				return this.fromSecondsToTime(data);
			},

			fromSecondsToTime(data) {
				const hours = Math.floor(data / 3600);
				const minutes = data / 60 - hours * 60;
				return `${ hours } ч ${ minutes } м`;
			},

			getFlightPathCode() {
				const data = this.flight.itineraries[0][0].segments;
				return {
					origin: data[0].origin_code,
					dest: data[data.length - 1].dest_code
				};
			},

			isDirect() {
				const data = this.flight.itineraries[0][0].segments;
				return data.length < 2;
			},

			getSegmets() {
				const data = this.flight.itineraries[0][0].segments;
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
			},

			getBaggageService() {
				const data = this.flight.services;
				const baggage = data[Object.keys(data)[0]].value;
				return baggage;
			}
		},
		mounted() {
			console.log(this.flight);
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