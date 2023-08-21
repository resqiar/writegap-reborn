<script>
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';
	import MetaHead from '../../components/meta/MetaHead.svelte';
	import MainHeader from '../../components/header/MainHeader.svelte';
	import UserProfileBody from '../../components/body/UserProfileBody.svelte';

	// Mount saved theme from local storage
	onMount(async () => {
		themeChange(false);
	});
</script>

<!-- META TAG -->
<MetaHead title="Resqi Ageng Rahmatullah - @resqiar Profile | Resqiar.com" />

<main>
	<MainHeader user={null} active={-1} />

	<UserProfileBody />
</main>
