import type { APIRoute } from "astro"
import { getSearchIndexEntries } from "../lib/content/articles"

export const GET: APIRoute = async () =>
  new Response(JSON.stringify(await getSearchIndexEntries()), {
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  })
