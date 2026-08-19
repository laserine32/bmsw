<script lang="ts">
	import { toast, Toaster } from 'svelte-sonner';
	import Card from '$lib/components/card.svelte';
	import FormError from '$lib/components/form/form-error.svelte';
	import FormField from '$lib/components/form/form-field.svelte';
	import FormInput from '$lib/components/form/form-input.svelte';
	import FormLabel from '$lib/components/form/form-label.svelte';
	import FormTags from '$lib/components/form/form-tags.svelte';
	import FormTextarea from '$lib/components/form/form-textarea.svelte';
	import SkeletonCard from '$lib/components/skeletons/skeleton-card.svelte';
	import type { PageProps } from './$types';
	import { enhance } from '$app/forms';

	let { data, form }: PageProps = $props();
	// let { dataTag = [], form }: { dataTag: Array<TagType>; form: any } = $props();
	let url = $state('');
	let siteName = $state('');
	let title = $state('');
	let description = $state('');
	let type = $state('');
	let imageUrl = $state('');
	let image = $state('');
	let tags = $state<string[]>([]);

	let isLoading = $state(false);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let cardData = $state<any>(null);

	let lastFetchedUrl = $state('');

	function urlChange() {
		if (url && url !== lastFetchedUrl) {
			lastFetchedUrl = url;
			fetchOG(url);
			console.log(url);
		}
	}

	async function fetchOG(targetUrl: string) {
		isLoading = true;
		try {
			const res = await fetch('/api/og', {
				method: 'POST',
				body: JSON.stringify({ url: targetUrl }),
				headers: { 'Content-Type': 'application/json' }
			});
			if (res.ok) {
				const data = await res.json();
				if (data) {
					title = data.title ?? '';
					description = data.description ?? '';
					siteName = data.site_name ?? '';
					type = data.type ?? '';
					imageUrl = data.image ?? '';
					image = data.image_base64 ?? '';
					cardData = [
						{
							id: '',
							url: targetUrl,
							siteName: data.site_name ?? '',
							title: data.title ?? '',
							description: data.description ?? '',
							type: data.type ?? '',
							imageUrl: data.image ?? '',
							image: data.image_base64 ?? '',
							date: ''
						}
					];
				}
			}
		} catch (err) {
			console.error('Failed to fetch OG data:', err);
		} finally {
			isLoading = false;
		}
	}

	const availableTags = $derived(data.allTags.map((e) => e.tag));
	function resetForm() {
		url = '';
		siteName = '';
		title = '';
		description = '';
		type = '';
		imageUrl = '';
		image = '';
		tags = [];
		cardData = null;
	}
</script>

<div class="flex items-center justify-center gap-4">
	<h1 class="text-2xl font-bold">Add Bookmark</h1>
</div>
<div class="my-8 grid grid-cols-1 gap-4 md:mx-40 md:grid-cols-2">
	<Card>
		<form
			id="form-add-bookmark"
			class="space-y-4"
			method="POST"
			use:enhance={({ formData }) => {
				// 1. Dijalankan sebelum request dikirim ke server
				isLoading = true;

				// Sisipkan state array `tags` ke FormData sebagai JSON string
				// const formValues = { url, siteName, title, description, type, imageUrl, image, tags };
				formData.set('url', url);
				formData.set('siteName', siteName);
				formData.set('title', title);
				formData.set('description', description);
				formData.set('type', type);
				formData.set('imageUrl', imageUrl);
				formData.set('image', image);
				formData.set('tags', JSON.stringify(tags));
				// 2. Dijalankan setelah mendapat response dari +page.server.ts
				return async ({ result, update }) => {
					isLoading = false;

					if (result.type === 'success') {
						toast.success('Bookmark added successfully!');
						resetForm();
						// update() otomatis menghapus error dan mereset form HTML
						await update({ reset: true });
					} else if (result.type === 'failure') {
						// result.data.error adalah pesan catch() dari server jika db gagal
						if (result.data && typeof result.data.error === 'string') {
							toast.error(result.data.error);
						} else {
							toast.error('Please check your form inputs');
						}
						await update({ reset: false }); // Pertahankan input pengguna
					} else {
						await update();
					}
				};
			}}
		>
			<FormField>
				<FormLabel for="field-url">URL</FormLabel>
				<FormInput
					id="field-url"
					type="url"
					bind:value={url}
					placeholder="Url"
					autocomplete="off"
					onblur={urlChange}
					class={form?.errors?.url ? 'border-red-500' : ''}
				/>
				<FormError errors={form?.errors?.url} />
			</FormField>
			<FormField>
				<FormLabel for="field-siteName">Site Name</FormLabel>
				<FormInput
					id="field-siteName"
					type="text"
					bind:value={siteName}
					placeholder="Site Name"
					class={form?.errors?.siteName ? 'border-red-500' : ''}
				/>
				<FormError errors={form?.errors?.siteName} />
			</FormField>
			<FormField>
				<FormLabel for="field-title">Title</FormLabel>
				<FormInput
					id="field-title"
					type="text"
					bind:value={title}
					placeholder="Title"
					class={form?.errors?.title ? 'border-red-500' : ''}
				/>
				<FormError errors={form?.errors?.title} />
			</FormField>
			<FormField>
				<FormLabel for="field-description">Description</FormLabel>
				<FormTextarea
					id="field-description"
					bind:value={description}
					placeholder="Description"
					class={form?.errors?.description ? 'border-red-500' : ''}
				/>
				<FormError errors={form?.errors?.description} />
			</FormField>
			<FormField>
				<FormLabel for="field-type">Type</FormLabel>
				<FormInput
					id="field-type"
					type="text"
					bind:value={type}
					placeholder="Type"
					class={form?.errors?.type ? 'border-red-500' : ''}
				/>
				<FormError errors={form?.errors?.type} />
			</FormField>
			<FormField>
				<FormLabel for="field-imageUrl">Image Url</FormLabel>
				<FormInput
					id="field-imageUrl"
					type="url"
					bind:value={imageUrl}
					placeholder="Image Url"
					class={form?.errors?.imageUrl ? 'border-red-500' : ''}
				/>
				<FormError errors={form?.errors?.imageUrl} />
			</FormField>
			<FormField>
				<FormLabel for="field-tags">Tags</FormLabel>
				<FormTags id="field-tags" bind:tags options={availableTags} />
				<FormError errors={form?.errors?.tags} />
			</FormField>

			<FormField>
				<div
					class="group/field flex w-full flex-row items-center gap-3 has-[>[data-slot=field-content]]:items-start data-[invalid=true]:text-destructive *:data-[slot=field-label]:flex-auto has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px"
				>
					<button
						onclick={resetForm}
						data-slot="button"
						data-variant="outline"
						data-size="default"
						class="group/button [&amp;_svg]:pointer-events-none [&amp;_svg]:shrink-0 [&amp;_svg:not([class*='size-'])]:size-4 inline-flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-md border border-border bg-background bg-clip-padding px-2.5 text-sm font-medium whitespace-nowrap shadow-xs transition-all outline-none select-none hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 aria-expanded:bg-muted aria-expanded:text-foreground aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:border-input dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40"
						type="button"
						>Reset
					</button>
					<button
						data-slot="button"
						data-variant="default"
						data-size="default"
						class="group/button [&amp;_svg]:pointer-events-none [&amp;_svg]:shrink-0 [&amp;_svg:not([class*='size-'])]:size-4 inline-flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-md border border-transparent bg-primary bg-clip-padding px-2.5 text-sm font-medium whitespace-nowrap text-primary-foreground transition-all outline-none select-none hover:bg-primary/80 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40"
						type="submit"
						form="form-add-bookmark"
						disabled={isLoading}
					>
						Save
					</button>
				</div>
			</FormField>
		</form>
	</Card>
	<Card>
		{#if cardData}
			{@const cdd = cardData[0]}
			<div class="flex flex-col">
				<div class="aspect-video w-full overflow-hidden">
					<div class="h-full w-full">
						<img
							alt={cdd.siteName ?? ``}
							class="h-full w-full object-cover object-center opacity-100 transition-opacity duration-300"
							src={cdd.imageUrl}
						/>
					</div>
				</div>
				<div class="w-full">
					<p class="mt-0 truncate text-xxs text-foreground/50 md:mt-2 md:text-xs">
						{cdd.url}
					</p>
					<h4 class="truncate text-xs hover:underline md:text-sm">
						{cdd.title}
					</h4>
					<p class="mb-2 truncate text-xxs text-foreground/50 md:text-xs">
						{cdd.description}
					</p>
				</div>
			</div>
		{:else}
			<SkeletonCard />
		{/if}
	</Card>
</div>

<Toaster />
