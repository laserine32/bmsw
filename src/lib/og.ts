import * as cheerio from 'cheerio';

export const extractOG = async (baseUrl: string) => {
	const res = await fetch(baseUrl, {
		headers: {
			'User-Agent':
				'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36'
		}
	});
	const html = await res.text();
	const $ = cheerio.load(html);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const result: Record<string, any> = {};

	$("meta[property^='og:']").each((_, el) => {
		const property = $(el).attr('property');
		const content = $(el).attr('content');
		if (!property || !content) return;
		const key = property.replace('og:', '');
		result[key] = key.includes('image') ? new URL(content, baseUrl).href : content;
	});

	if (!result.title) {
		result.title = $('title').text();
	}
	if (result.image) {
		// url2base64(result.image).then((b64) => {
		// });
		result['image_base64'] = await url2base64(result.image);
	}
	return result;
};

export const url2base64 = async (url: string) => {
	const response = await fetch(url);
	const arrayBuffer = await response.arrayBuffer();
	const buffer = Buffer.from(arrayBuffer);
	// const contentType = response.headers.get('content-type');
	// return `data:${contentType};base64,${buffer.toString('base64')}`;
	return `${buffer.toString('base64')}`;
};
