<script lang="ts">
	import { resolve } from '$app/paths';
	import BookmarkCard from '$lib/components/bookmark-card.svelte';
	import OnlineSiteFilter from '$lib/components/online-site-filter.svelte';
	import Pagination from '$lib/components/paginations/pagination.svelte';
	import SkeletonsMainPage from '$lib/components/skeletons/skeletons-main-page.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<div class="flex items-center justify-between gap-4">
	<h1 class="text-2xl font-bold">MSVPH</h1>
	<a
		data-slot="button"
		data-variant="default"
		data-size="default"
		class="group/button [&amp;_svg]:pointer-events-none [&amp;_svg]:shrink-0 [&amp;_svg:not([class*='size-'])]:size-4 inline-flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-md border border-transparent bg-primary bg-clip-padding px-2.5 text-sm font-medium whitespace-nowrap text-primary-foreground transition-all outline-none select-none hover:bg-primary/80 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40"
		href={resolve(`/online/random` as `/`)}>Random</a
	>
</div>
{#await data.streamed.siteNamePromise then osites}
	<div class="m-2">
		<OnlineSiteFilter sites={osites} />
	</div>
{/await}
{#await data.streamed.bookmarkPromise}
	<div class="my-8 grid grid-cols-1 gap-4 md:grid-cols-6 md:gap-6">
		<SkeletonsMainPage />
	</div>
{:then bookmarks}
	<div class="my-8 grid grid-cols-1 gap-4 md:grid-cols-6 md:gap-6">
		{#each bookmarks as bookmark (bookmark.id)}
			<BookmarkCard data={bookmark} />
		{/each}
	</div>
{:catch error}
	<div class="rounded-lg bg-red-100 p-4 text-red-700">
		<p>Gagal memuat data Bookmarks: {error.message}</p>
	</div>
{/await}
{#await data.streamed.totalPagePromise then totalPage}
	<div class="my-28 flex justify-center">
		<Pagination totalPages={totalPage} />
	</div>
{/await}
