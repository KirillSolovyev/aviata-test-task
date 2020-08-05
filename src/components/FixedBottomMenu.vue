<template>
	<div class="mobile-fixed-block mobile-fixed-block_sidebar flex justify-center">
		<div class="mobile-fixed-block__inner">
			<button 
				class="mobile-fixed-block__btn flex items-center"
				@click="$emit('btn:clicked')"
			>
				{{ btnText }}
			</button>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'fixed-bottom-menu',
		props: {
			btnText: String
		},
	}
</script>

<style>
	.mobile-fixed-block {
		position: fixed;
		bottom: 30px;
		width: 100%;
		z-index: -1;
		opacity: 0;
	}

	.mobile-fixed-block__inner {
		background-color: #707276;
		border-radius: 24px;
		box-shadow: 0 4px 6px -1px rgba(0,0,0,.1), 0 2px 4px -1px rgba(0,0,0,.06);
	}

	.mobile-fixed-block__btn {
		background-color: transparent;
		padding: 12px 16px;
		color: #fff;
		font-size: 14px;
		font-weight: 600;
	}

	.mobile-fixed-block__btn img {
		width: 15px;
	}

	.mobile-fixed-block_sidebar {
		position: sticky;
	}

	@media screen and (max-width: 768px) {
		.mobile-fixed-block {
			z-index: 1000;
			opacity: 1;
		}
	}
</style>