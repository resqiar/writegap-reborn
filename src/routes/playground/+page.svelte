<script>
	import ComingSoonBody from '../../components/body/ComingSoonBody.svelte';
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';
	import MetaHead from '../../components/meta/MetaHead.svelte';

	// Mount saved theme from local storage
	onMount(async () => {
		themeChange(false);
	});
</script>

<!-- META TAG -->
<MetaHead title="Coming Soon | Resqiar.com" />

<main>
	<ComingSoonBody />
</main>
