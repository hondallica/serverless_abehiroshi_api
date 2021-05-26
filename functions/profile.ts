import { getHtml } from "../lib/client";
import { parseProfileHtml } from "../lib/parser";

export const handler = async () => {
  try {
    const html = await getHtml("/prof/prof.htm");
    return { statusCode: 200, body: JSON.stringify(parseProfileHtml(html)) };
  } catch (e) {
    return { statusCode: 500, body: "Why not the best?" };
  }
};