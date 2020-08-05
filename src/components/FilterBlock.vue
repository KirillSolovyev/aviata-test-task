<template>
	<div class="filter-block rounded">
		<p class="filter-block__title flex justify-between items-center">
			{{ title }}
			<span class="clear-filter">
				<button></button>
				<span class="rounded">Сбросить выбор</span>
			</span>
		</p>
		<div class="filter-block__body">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'filter-block',
		props: {
			title: String
		},
	}
</script>

<style>
	.filter-block {
		background-color: #F5F5F5;
		padding-bottom: 12px;
	}

	.filter-block__title {
		font-weight: bold;
		font-size: 14px;
		padding: 12px;
		margin-bottom: 0;
	}

	.clear-filter {
		width: 25px;
		height: 25px;
		position: relative;
	}

	.clear-filter button {
		width: 100%;
		height: 100%;
		position: relative;
		background-color: transparent;
		background-image: url(../assets/images/clear-filter.svg);
		background-size: 18px auto;
		background-repeat: no-repeat;
		background-position: 50% 50%;
	}

	.clear-filter:hover button{
		background-image: url(../assets/images/clear-filter-active.svg);
	}

	.clear-filter span{
		position: absolute;
		left: -37.5px;
		top: -55px;
		font-size: 12px;
		font-weight: normal;
		width: 116px;
		padding: 8px;
		background-color: #fff;
		filter: drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.05)), drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.1));
		opacity: 0;
		z-index: -1;
		transition: 0.3s;
	}

	.clear-filter span:after{
		content: "";
		width: 10px;
		height: 10px;
		position: absolute;
		background-color: inherit;
		bottom: -5px;
		left: calc(50% - 5px);
		transform: rotate(45deg);
	}

	.clear-filter:hover span{
		opacity: 1;
		z-index: 1;
	}
</style>