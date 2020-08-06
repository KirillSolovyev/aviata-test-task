<template>
	<div class="sidebar flex flex-column col-lg-3">
		<div class="sidebar__header_mobile flex justify-between items-center">
			<button class="sidebar-btn">Закрыть</button>
			<p class="filter-block__title">Фильтры</p>
			<button class="sidebar-btn">Сбросить</button>
		</div>
		<div class="sidebar__inner flex-1-1">
			<filter-block :title="'Опции тарифа'" class="mb-3">
				<label class="main-checkbox">
					<input type="checkbox"/>
					<span>Air Astana</span>
				</label>
				<label class="main-checkbox">
					<input type="checkbox"/>
					<span>Air Astana</span>
				</label>
			</filter-block>
			<filter-block :title="'Авиакомпании'">
				<label class="main-checkbox">
					<input type="checkbox" checked="checked" />
					<span>Все</span>
				</label>
				<vue-custom-scrollbar  v-if="airlines" class="companies-scroll" :settings="scrollSettings">
					<label v-for="(airline, airlineId) in airlines" :key="airlineId" class="main-checkbox">
						<input 
							type="checkbox" 
							:value="airlineId" 
							:checked="hasAirline(airlineId)"
							@change="selectAirline(airlineId)"
							/>
						<span>{{ airline }}</span>
					</label>
				</vue-custom-scrollbar>
			</filter-block>
			<p class="dashed-link dashed-link_sidebar" @click="clearAirlinesFilter">Сбросить все фильтры</p>
		</div>
		<fixed-bottom-menu :btnText="'Закрыть'" @btn:clicked="closeSidebar"/>
	</div>
</template>

<script>
	import vueCustomScrollbar from 'vue-custom-scrollbar';
	import { mapGetters } from 'vuex';

	import FilterBlock from './FilterBlock';
	import FixedBottomMenu from './FixedBottomMenu';
	import { FILTER } from '../store/types';

	export default {
		name: 'sidebar',
		components: {
			vueCustomScrollbar,
			FilterBlock,
			FixedBottomMenu
		},
		data() {
			return {
				scrollSettings: {
					wheelPropagation: false,
					suppressScrollX: true
				},
			};
		},
		methods: {
			closeSidebar() {},

			selectAirline(airlineId) {
				const hasAirline = this.hasAirline(airlineId);
				if(hasAirline) {
					console.log(`Deleted ${airlineId}`);
					this.$store.dispatch(FILTER.COMPANIES.DELETE, airlineId);
				} else {
					console.log(`Added ${airlineId}`);
					this.$store.dispatch(FILTER.COMPANIES.ADD, airlineId);
				}
			},

			clearAirlinesFilter() {
				this.$store.dispatch(FILTER.COMPANIES.CLEAR);
			}
		},
		computed: {
			...mapGetters(['airlines', 'hasAirline', 'filter']),
		}
	}
</script>

<style>
	.sidebar_active {
		opacity: 1 !important;
		z-index: 1500 !important;
	}

	.sidebar__header_mobile {
		border-bottom: 1px solid #dbdbdb;
		opacity: 0;
		z-index: -1;
		position: absolute;
	}

	.sidebar-btn {
		background-color: transparent;
		padding: 10px;
		font-size: 14px;
	}

	.filter-block_scroll {
		max-height: 320px;
		overflow-y: hidden;
	}

	.custom-scroll {
		overflow-y: auto;
	}

	.main-checkbox {
		display: block;
		position: relative;
		padding: 10px 12px;
		font-size: 12px;
		cursor: pointer;
		margin: 0;
		user-select: none;
		transition: 0.3s;
	}

	.main-checkbox:hover {
		background-color: #ebebeb;
	}

	.main-checkbox > span {
		display: flex;
		align-items: center;
	}

	.main-checkbox > span::before {
		content: '';
		width: 12px;
		height: 12px;
		margin-right: 12px;
		border-radius: 2px;
		display: inline-block;
		border: 1px solid #B9B9B9;
		background-repeat: no-repeat;
		background-position: center center;
		background-size: 80%;
	}

	.main-checkbox > input:checked + span::before {
		background-color: #55BB06;
		border-color: #55BB06;
		background-image: url(../assets/images/check-white.svg);
	}

	.main-checkbox:hover > span::before {
		background-image: url(../assets/images/check-gray.svg);
	}

	.main-checkbox input {
		position: absolute;
		z-index: -1;
		opacity: 0;
	}

	.companies-scroll {
		max-height: 320px;
		position: relative;
	}

	.ps__rail-y {
		z-index: 10;
	}

	@media screen and (max-width: 768px) {
		.sidebar {
			position: fixed;
			background-color: #fff;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			z-index: -1;
			opacity: 0;
			transition: 0.3s;
			padding: 0;
		}

		.sidebar__inner {
			overflow-y: auto;
		}

		.sidebar__header_mobile {
			z-index: 1;
			opacity: 1;
			position: -webkit-sticky;
			position: sticky;
		}

		.filter-block {
			background-color: transparent;
		}

		.dashed-link_sidebar {
			display: none;
		}

		.clear-filter {
			display: none;
		}
	}
</style>