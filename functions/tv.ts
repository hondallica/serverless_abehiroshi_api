import { getHtml } from "../lib/client";
import { parseTvHtml } from "../lib/parser";

export const handler = async () => {
  try {
    const html = await getHtml("/tv/tv.htm");
    return { statusCode: 200, body: JSON.stringify(parseTvHtml(html)) };
  } catch (e) {
    return { statusCode: 500, body: "Why not the best?" };
  }
};
