import { NextRequest, NextResponse } from "next/server";
import { extractOG } from "@/lib/og";

export async function POST(req: NextRequest) {
	try {
		const { url } = await req.json();
		if (!url) {
			return NextResponse.json({ error: "URL is required" }, { status: 400 });
		}
		const data = await extractOG(url);
		return NextResponse.json(data);
	} catch (err) {
		return NextResponse.json({ error: `Failed to fetch Open Graph data. ${err}` }, { status: 500 });
	}
}
