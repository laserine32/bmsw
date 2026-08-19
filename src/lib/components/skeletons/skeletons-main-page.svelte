<script lang="ts">
	import SkeletonCard from './skeleton-card.svelte';

	const data: Array<number> = [...Array(12).keys()];
</script>

{#each data as item (item)}
	<SkeletonCard />
{/each}
