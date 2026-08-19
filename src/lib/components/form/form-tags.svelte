<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils';

	interface ComboboxTagsProps extends HTMLInputAttributes {
		tags?: string[];
		options?: string[];
		maxTags?: number;
		allowDuplicates?: boolean;
		containerClass?: string;
		tagClass?: string;
		closeBtnClass?: string;
		dropdownClass?: string;
		dropdownItemClass?: string;
	}

	let {
		tags = $bindable([]),
		options = [],
		maxTags = Infinity,
		allowDuplicates = false,
		placeholder = 'Add a tag...',
		containerClass = '',
		tagClass = '',
		closeBtnClass = '',
		dropdownClass = '',
		dropdownItemClass = '',
		class: className = '',
		...rest
	}: ComboboxTagsProps = $props();

	let inputValue = $state('');
	let isOpen = $state(false);
	let activeIndex = $state(-1); // Untuk navigasi dropdown menggunakan keyboard
	let inputRef = $state<HTMLInputElement | null>(null);

	// Memfilter opsi berdasarkan input dan tag yang sudah dipilih
	let filteredOptions = $derived(
		options.filter((opt) => {
			// Sembunyikan opsi jika sudah dipilih (dan duplikasi tidak diizinkan)
			if (!allowDuplicates && tags.includes(opt)) return false;
			// Jika input kosong, tampilkan semua yang tersedia
			if (inputValue.trim() === '') return true;
			// Filter berdasarkan teks input
			return opt.toLowerCase().includes(inputValue.toLowerCase().trim());
		})
	);

	function addTag(value: string) {
		const trimmed = value.trim();
		if (!trimmed) return;

		if (!allowDuplicates && tags.includes(trimmed)) {
			inputValue = '';
			return;
		}

		if (tags.length >= maxTags) return;

		tags = [...tags, trimmed];
		inputValue = '';
		activeIndex = -1;

		// Pertahankan fokus pada input setelah memilih
		inputRef?.focus();
	}

	function removeTag(index: number) {
		tags = tags.filter((_, i) => i !== index);
	}

	function handleKeydown(e: KeyboardEvent) {
		if (isOpen && filteredOptions.length > 0) {
			if (e.key === 'ArrowDown') {
				e.preventDefault();
				activeIndex = (activeIndex + 1) % filteredOptions.length;
				return;
			}
			if (e.key === 'ArrowUp') {
				e.preventDefault();
				activeIndex = (activeIndex - 1 + filteredOptions.length) % filteredOptions.length;
				return;
			}
			if (e.key === 'Enter') {
				e.preventDefault();
				if (activeIndex >= 0 && activeIndex < filteredOptions.length) {
					addTag(filteredOptions[activeIndex]);
				} else {
					addTag(inputValue);
				}
				return;
			}
			if (e.key === 'Escape') {
				e.preventDefault();
				isOpen = false;
				activeIndex = -1;
				return;
			}
		} else if (e.key === 'Enter' || e.key === ',') {
			e.preventDefault();
			addTag(inputValue);
			return;
		}

		// Hapus tag terakhir saat Backspace ditekan dan input kosong
		if (e.key === 'Backspace' && inputValue === '' && tags.length > 0) {
			removeTag(tags.length - 1);
		}
	}

	// Mencegah input kehilangan fokus saat opsi di-klik
	function handleOptionMousedown(e: MouseEvent, opt: string) {
		e.preventDefault();
		addTag(opt);
	}

	function handleBlur() {
		// Sedikit delay agar jika user mengklik diluar (seperti tombol submit lain) tidak terpotong
		setTimeout(() => {
			isOpen = false;
			activeIndex = -1;
		}, 150);
	}

	// Styling variables
	let mergedContainerClass = $derived(
		cn(
			'relative flex flex-wrap items-center gap-2 rounded-lg border border-gray-300 bg-gray-50 p-2 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:focus-within:border-blue-500 dark:focus-within:ring-blue-500 text-sm',
			containerClass,
			className
		)
	);

	let mergedTagClass = $derived(
		cn(
			'inline-flex items-center gap-1.5 rounded bg-blue-100 px-2.5 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300',
			tagClass
		)
	);

	let mergedDropdownClass = $derived(
		cn(
			'absolute left-0 top-full z-10 mt-1 max-h-40 w-full overflow-y-auto rounded-lg border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-600 dark:bg-gray-700',
			dropdownClass
		)
	);
</script>

<!-- Container diset relative agar dropdown absolute merujuk kesini -->
<div class="relative w-full">
	<div class={mergedContainerClass}>
		{#each tags as tag, index (index)}
			<span class={mergedTagClass}>
				{tag}
				<button
					aria-label={tag}
					type="button"
					class={cn(
						'inline-flex h-4 w-4 items-center justify-center rounded-sm text-blue-400 transition-colors hover:bg-blue-200 hover:text-blue-900 focus:outline-none dark:text-blue-400 dark:hover:bg-blue-800 dark:hover:text-blue-200',
						closeBtnClass
					)}
					onclick={() => removeTag(index)}
				>
					<svg
						class="h-3 w-3"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 14 14"
					>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
						/>
					</svg>
				</button>
			</span>
		{/each}

		<input
			bind:this={inputRef}
			type="text"
			{placeholder}
			bind:value={inputValue}
			onkeydown={handleKeydown}
			onfocus={() => (isOpen = true)}
			onblur={handleBlur}
			oninput={() => {
				isOpen = true;
				activeIndex = -1; // Reset seleksi saat mengetik
			}}
			class="min-w-30 flex-1 border-none bg-transparent p-0 text-gray-900 placeholder-gray-400 outline-none focus:ring-0 dark:text-white"
			{...rest}
		/>
	</div>

	<!-- Combobox Dropdown -->
	{#if isOpen && filteredOptions.length > 0}
		<ul class={mergedDropdownClass}>
			{#each filteredOptions as opt, i (i)}
				<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
				<li
					class={cn(
						'cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white',
						i === activeIndex && 'bg-blue-50 text-blue-700 dark:bg-gray-600 dark:text-white',
						dropdownItemClass
					)}
					onmousedown={(e) => handleOptionMousedown(e, opt)}
				>
					{opt}
				</li>
			{/each}
		</ul>
	{/if}
</div>
