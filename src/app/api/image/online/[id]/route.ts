import { getBookmarkImage } from "@/server/bookmark";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const gambardb = await getBookmarkImage(id);
	if (!gambardb) {
		return new Response("Not Found", {
			status: 404,
		});
	}
	const buffer = Buffer.from(gambardb, "base64");

	return new Response(buffer, {
		headers: {
			"Content-Type": "image/jpeg",
			// cache browser
			"Cache-Control": "public, max-age=31536000, immutable",
		},
	});
}
