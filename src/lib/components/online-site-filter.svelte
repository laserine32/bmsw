<script lang="ts">
	import { resolve } from '$app/paths';
	import { urlSafeBase64Encode } from '$lib/utils';
	import CarretDown from './icons/CarretDown.svelte';
	import CarretUp from './icons/CarretUp.svelte';

	let { sites }: { sites: Array<string | null> | null } = $props();

	let isOpen = $state(false);
	function toggleOpen() {
		isOpen = !isOpen;
	}
</script>

<div class="flex w-full flex-col">
	<div class="not-last:border-b">
		<h3 class="flex">
			<button
				type="button"
				aria-controls="15fivabtb"
				aria-expanded={isOpen}
				id="15fivabtb"
				class="relative flex flex-1 cursor-pointer items-start justify-between rounded-md border border-transparent bg-accent px-4 py-2 text-left text-sm font-medium text-accent-foreground transition-all outline-none hover:underline focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:after:border-ring disabled:pointer-events-none disabled:opacity-50 **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4 **:data-[slot=accordion-trigger-icon]:text-muted-foreground"
				onclick={toggleOpen}
			>
				Site Name
				{#if isOpen}
					<CarretUp class="pointer-events-none shrink-0" />
				{:else}
					<CarretDown class="pointer-events-none shrink-0" />
				{/if}
			</button>
		</h3>
		<div
			id="radix-_R_55fivabtb_"
			role="region"
			aria-labelledby="radix-_R_15fivabtb_"
			class="overflow-hidden text-sm"
		>
			{#if isOpen}
				<div
					class="[&amp;_a]:underline [&amp;_a]:underline-offset-3 [&amp;_a]:hover:text-foreground [&amp;_p:not(:last-child)]:mb-4 min-h-(--radix-accordion-content-height) bg-accent/50 p-2"
				>
					<div class="flex flex-wrap gap-2">
						{#each sites as site, index (`${index}${site}`)}
							{@const link = `/online/tags/${urlSafeBase64Encode(site ?? '')}`}
							<a
								class="group/button [&amp;_svg]:pointer-events-none [&amp;_svg]:shrink-0 [&amp;_svg:not([class*='size-'])]:size-4 inline-flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-md border border-transparent bg-primary bg-clip-padding px-2.5 text-sm font-medium whitespace-nowrap text-primary-foreground transition-all outline-none select-none hover:bg-primary/80 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40"
								href={resolve(link as `/`)}
								>{site}
							</a>
						{/each}
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	:root {
		--radix-accordion-content-height: var(--radix-collapsible-content-height);
		--radix-accordion-content-width: var(--radix-collapsible-content-width);
		--radix-collapsible-content-height: 96px;
		--radix-collapsible-content-width: 1226px;
	}
</style>
