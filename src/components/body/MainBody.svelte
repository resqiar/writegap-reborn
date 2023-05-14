<script>
	import MainHero from '../hero/MainHero.svelte';
	import { showcaseData } from '../../data/showcases';
</script>

<div class="mb-16">
	<!-- Hero -->
	<MainHero />

	<!-- Projects Showcase -->
	<div class="mx-28 my-12 flex flex-col gap-8">
		{#each showcaseData as data}
			<div class="flex items-center gap-8 rounded-lg">
				<a href={data.sourceURL} target="_blank">
					<img width="250" height="250" src={data.imageURL} alt="item" />
				</a>

				<div class="flex flex-col gap-2">
					<h1 class="text-2xl font-bold">{data.title}</h1>
					<p class="font-medium">
						{data.description}
					</p>

					<div class="my-2">
						<p class="font-bold">Technologies used:</p>

						<div class="mt-2 flex gap-2">
							{#each data.techs as stack}
								<img
									src={stack.url}
									class="h-[35px] w-[35px] object-cover"
									alt={stack.title}
									title={stack.title}
								/>
							{/each}
						</div>
					</div>

					<div class="mt-2 flex gap-2">
						<a href={data.demoURL} target="_blank" class="btn">Demo</a>
						<a href={data.sourceURL} target="_blank" class="btn">Source Code</a>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
