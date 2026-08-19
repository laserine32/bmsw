<script lang="ts">
	let { children } = $props();
</script>

<div
	data-slot="field-group"
	class="group/field-group @container/field-group flex w-full flex-col gap-7 data-[slot=checkbox-group]:gap-3 *:data-[slot=field-group]:gap-4"
>
	<div
		role="group"
		data-slot="field"
		data-orientation="vertical"
		class="group/field [&amp;&gt;.sr-only]:w-auto flex w-full flex-col gap-3 *:w-full data-[invalid=true]:text-destructive"
		data-invalid="false"
	>
		{@render children()}
	</div>
</div>

<!-- 

<label
			data-slot="field-label"
			class="group/field-label peer/field-label has-[&gt;[data-slot=field]]:rounded-md has-[&gt;[data-slot=field]]:border has-[&gt;[data-slot=field]]:w-full has-[&gt;[data-slot=field]]:flex-col flex w-fit items-center gap-2 text-sm leading-snug font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 group-data-[disabled=true]/field:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 has-data-checked:border-primary/30 has-data-checked:bg-primary/5 *:data-[slot=field]:p-3 dark:has-data-checked:border-primary/20 dark:has-data-checked:bg-primary/10"
			for="field-url">Url</label
		><input
			data-slot="input"
			class="h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-2.5 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40"
			id="field-url"
			aria-invalid="false"
			placeholder="Url"
			autocomplete="off"
			type="url"
			value=""
			name="url"
		/>

-->
