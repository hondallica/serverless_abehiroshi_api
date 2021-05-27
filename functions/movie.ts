import { getHtml } from "../lib/client";
import { parseMovieHtml } from "../lib/parser";

export const handler = async () => {
  try {
    const html = await getHtml("/movie/eiga.htm");
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parseMovieHtml(html)),
    };
  } catch (e) {
    return { statusCode: 500, body: "Why not the best?" };
  }
};
