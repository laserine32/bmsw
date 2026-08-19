<script lang="ts">
	import BookmarkCard from '$lib/components/bookmark-card.svelte';
	import Pagination from '$lib/components/paginations/pagination.svelte';
	import SkeletonsMainPage from '$lib/components/skeletons/skeletons-main-page.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<div class="flex items-center justify-center gap-4">
	<h1 class="text-2xl font-bold">{data.title}</h1>
</div>
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
