<script lang="ts">
	let { children } = $props();
</script>

<div
	data-slot="card"
	data-size="default"
	class="group/card has-[&gt;img:first-child]:pt-0 flex flex-col gap-6 rounded-xl bg-card py-6 text-sm text-card-foreground shadow-xs ring-1 ring-foreground/10 data-[size=sm]:gap-4 data-[size=sm]:py-4 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl"
>
	<div data-slot="card-content" class="px-6 group-data-[size=sm]/card:px-4">
		{@render children()}
	</div>
</div>
