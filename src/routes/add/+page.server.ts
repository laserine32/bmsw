import { fail } from '@sveltejs/kit';
import { z } from 'zod';
import { getTags } from '$lib/server/db/query/tag';
import type { PageServerLoad } from './$types';
import { addBookmark } from '$lib/server/db/query/bookmark';

export const load: PageServerLoad = async () => {
	const allTags = await getTags();
	return {
		title: 'Add',
		allTags: allTags
	};
};

const formSchema = z.object({
	url: z.url(),
	siteName: z.string().optional(),
	title: z.string().min(1),
	description: z.string().min(1),
	type: z.string().min(1),
	imageUrl: z.url(),
	image: z.string().optional(),
	// tags: z.array(z.string()).nonempty()
	tags: z
		.string()
		.transform((str) => JSON.parse(str) as string[])
		.refine((arr) => arr.length > 0, 'Select at least one tag')
});

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const data = Object.fromEntries(formData); // Ubah FormData jadi object
		// Validasi dengan Zod
		const validation = formSchema.safeParse(data);
		if (!validation.success) {
			// Jika gagal, kembalikan data input (agar tidak hilang) dan pesan error (flatten)
			return fail(400, {
				data,
				errors: validation.error.flatten().fieldErrors
			});
		}
		try {
			await addBookmark(validation.data);
			return { success: true };
		} catch (error) {
			console.error('Server error:', error);
			return fail(500, { error: 'Failed to add bookmark' });
		}
	}
};
