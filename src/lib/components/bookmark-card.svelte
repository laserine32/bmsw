<script lang="ts">
	import type { BookmarkType } from '$lib/server/db/query/bookmark';
	import LazyImage from './lazy-image.svelte';

	let { data }: { data: BookmarkType } = $props();
</script>

<div
	data-slot="card"
	data-size="default"
	class="group/card has-[&gt;img:first-child]:pt-0 flex flex-col gap-1 overflow-hidden rounded-xl bg-card py-0 text-sm text-card-foreground shadow-xs ring-1 ring-foreground/10 data-[size=sm]:gap-4 data-[size=sm]:py-4 md:gap-2 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl"
>
	<div class="aspect-video w-full overflow-hidden">
		<a
			target="_blank"
			class="fade-in transition-opacity duration-200 hover:opacity-70"
			href={data.url}
			rel="external"
		>
			<div class="h-full w-full">
				<LazyImage
					alt={data.siteName ?? ``}
					className="h-full w-full object-cover object-center opacity-100 transition-opacity duration-300"
					src={data.type === 'ADT' ? `/api/image/${data.id}/online` : `/api/image/${data.id}`}
				/>
			</div>
		</a>
	</div>
	<div
		data-slot="card-header"
		class="group/card-header @container/card-header block auto-rows-min items-start gap-1 rounded-t-xl px-1.5 group-data-[size=sm]/card:px-4 has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] md:px-2 [.border-b]:pb-6 group-data-[size=sm]/card:[.border-b]:pb-4"
	>
		<div class="w-full">
			<p class="mt-0 truncate text-xxs text-foreground/50 md:mt-2 md:text-xs">
				{data.url}
			</p>
			<h4 class="truncate text-xs hover:underline md:text-sm">
				<a target="_blank" href={data.url} rel="external">{data.title}</a>
			</h4>
			<p class="mb-2 truncate text-xxs text-foreground/50 md:text-xs">
				{data.description}
			</p>
		</div>
	</div>
</div>
