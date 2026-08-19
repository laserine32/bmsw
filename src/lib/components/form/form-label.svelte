<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	let {
		children,
		for: htmlFor,
		class: className = ''
	}: {
		children: Snippet;
		for?: string;
		class?: string;
	} = $props();
</script>

<label
	for={htmlFor}
	data-slot="field-label"
	class={cn(
		className,
		'group/field-label peer/field-label has-[&gt;[data-slot=field]]:rounded-md has-[&gt;[data-slot=field]]:border has-[&gt;[data-slot=field]]:w-full has-[&gt;[data-slot=field]]:flex-col flex w-fit items-center gap-2 text-sm leading-snug font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 group-data-[disabled=true]/field:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 has-data-checked:border-primary/30 has-data-checked:bg-primary/5 *:data-[slot=field]:p-3 dark:has-data-checked:border-primary/20 dark:has-data-checked:bg-primary/10'
	)}
>
	{@render children()}
</label>
