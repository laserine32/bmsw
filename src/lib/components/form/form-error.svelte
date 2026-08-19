<script lang="ts">
	let {
		errors = [],
		class: className = ''
	}: {
		errors?: (string | undefined)[];
		class?: string;
	} = $props();
</script>

{#if errors.length > 0}
	{#each errors as error, index (`${index}${error}`)}
		{#if error}
			<span class="text-[0.8rem] font-medium text-red-500 {className}">
				{error}
			</span>
		{/if}
	{/each}
{/if}
