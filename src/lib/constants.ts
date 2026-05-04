export const SERVER_URL: string = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000"
export const APP_NAME: string = process.env.NEXT_PUBLIC_APP_NAME || "BMSW"
export const APP_DESCRIPTION: string = process.env.NEXT_PUBLIC_APP_DESCRIPTION || "Bookmark Save Way"
export const ITEMS_PER_PAGE: number = Number(process.env.ITEMS_PER_PAGE) || 36