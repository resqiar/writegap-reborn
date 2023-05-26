<script lang="ts">
	export let heroTitle: string;
	export let heroDesc: string;
</script>

<div class="hero bg-base-200 py-12">
	<div class="hero-content">
		<div class="max-w-2xl text-center">
			<h1 class="text-4xl font-bold tracking-widest">{heroTitle}</h1>

			<p class="py-4 tracking-wide">
				{heroDesc}
			</p>
		</div>
	</div>
</div>
