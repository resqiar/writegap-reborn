<script>
	import ComingSoonBody from '../../components/body/ComingSoonBody.svelte';
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';

	// Mount saved theme from local storage
	onMount(async () => {
		themeChange(false);
	});
</script>

<svelte:head>
	<!-- head content -->
	<title>Coming Soon</title>
</svelte:head>

<main>
	<ComingSoonBody />
</main>
