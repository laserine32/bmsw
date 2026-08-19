<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.ico';
	import { page } from '$app/stores';
	import Navbar from '$lib/components/navbar.svelte';
	import LoadingBar from '$lib/components/loading-bar.svelte';

	let { children } = $props();

	let pageTitle = $derived($page.data.title);
	let finalTitle = $derived(pageTitle ? `${pageTitle} | BMSW` : 'BMSW');
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>{finalTitle}</title>
</svelte:head>
<div class="flex min-h-full flex-col">
	<LoadingBar />
	<Navbar />
	<div class="px-2 py-4 pb-40 md:px-10">
		{@render children()}
	</div>
	<!-- toaster -->
</div>
