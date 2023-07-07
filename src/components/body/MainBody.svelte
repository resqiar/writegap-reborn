<script>
	import MainHero from '../hero/MainHero.svelte';
	import { showcaseData } from '../../data/showcases';
	import Carousel from 'svelte-carousel';
	import { browser } from '$app/environment';
</script>

<div>
	<!-- Hero -->
	<MainHero />

	<!-- Projects Showcase -->
	<div class="mx-4 my-12 lg:mx-28">
		<div class="mb-6 mt-12">
			<h1 class="text-2xl font-bold">Projects Showcase</h1>
			<p class="mt-2 text-justify font-medium lg:max-w-[80%]">
				Discover featured projects that I worked. From impressive websites, servers, AI, IoT, to
				just sandbox. Please note that this is just a selection of my recent work; you can find more
				projects in my <a href="https://github.com/resqiar" target="_blank" class="underline"
					>GitHub repositories</a
				>. Take a moment to explore, and feel free to reach out if you have any questions or
				collaboration opportunities.
			</p>
		</div>

		<div class="flex flex-col gap-8">
			{#each showcaseData as data}
				<div class="flex flex-col items-center gap-8 rounded-lg lg:flex-row">
					<div class="w-full lg:w-[400px]">
						<a href={data.sourceURL} target="_blank">
							{#if browser}
								<Carousel
									arrows={false}
									autoplay
									autoplayDuration={5000}
									autoplayProgressVisible
									pauseOnFocus
								>
									{#each data.images as img}
										<img
											class="h-[250px] w-[400px] object-cover"
											src={img}
											alt="item"
											width="100"
											height="50"
											loading="lazy"
										/>
									{/each}
								</Carousel>
							{/if}
						</a>
					</div>

					<div class="flex flex-col gap-2">
						<h1 class="text-2xl font-bold">{data.title}</h1>
						<p class="text-justify font-medium">
							{data.description}
						</p>

						<div class="my-2">
							<p class="font-bold">Technologies used:</p>

							<div class="mt-2 flex gap-3">
								{#each data.techs as stack}
									<img
										src={stack.url}
										class="h-[35px] object-cover"
										alt={stack.title}
										title={stack.title}
									/>
								{/each}
							</div>
						</div>

						<div class="mt-2 flex gap-2">
							{#if data.demoURL}
								<a href={data.demoURL} target="_blank" class="btn">Demo</a>
							{/if}
							<a href={data.sourceURL} target="_blank" class="btn">Source Code</a>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<div class="flex w-full flex-col items-center bg-base-300 px-4 py-8 lg:px-28 lg:py-28">
		<div class="my-8">
			<h1 class="text-4xl font-bold">Statistic Speaks for Itself</h1>

			<img
				src="https://wakatime.com/badge/user/e1e04b0c-4ecc-489e-b9aa-00c30a1aab60.svg"
				alt="Total Hours"
				class="mb-4 mt-1"
				loading="lazy"
			/>

			<p>
				Wakatime count and generates insightful charts based on my programming activities and the
				tools I've used over time. Details are available in my account.
			</p>
			<a href="https://wakatime.com/@resqiar" class="text-primary hover:underline"
				>See Wakatime account detail</a
			>
		</div>

		<div>
			<img
				alt="Wakatime Stats"
				src="https://github-readme-stats.vercel.app/api/wakatime?username=resqiar&theme=midnight-purple&layout=compact"
				loading="lazy"
			/>
		</div>
	</div>
</div>
