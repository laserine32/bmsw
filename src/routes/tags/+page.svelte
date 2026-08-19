<script lang="ts">
	import { resolve } from '$app/paths';
	import Badge from '$lib/components/badge.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<div class="flex items-center justify-center gap-4">
	<h1 class="text-2xl font-bold">Tags</h1>
</div>
{#await data.streamed.tagsPromise}
	<p>Loading...</p>
{:then tags}
	<div class="my-8 flex w-full flex-wrap items-center justify-center gap-2">
		{#each tags as tag (tag.id)}
			<a href={resolve(`/tags/${tag.id}` as '/')} aria-label={tag.tag}>
				<Badge text={tag.tag} count={tag.count} />
			</a>
		{/each}
	</div>
{/await}
