import { getHtml } from "../lib/client";
import { parseEssayHtml } from "../lib/parser";

export const handler = async () => {
  try {
    const html = await getHtml("/essay/essay.htm");
    return { statusCode: 200, body: JSON.stringify(parseEssayHtml(html)) };
  } catch (e) {
    return { statusCode: 500, body: "Why not the best?" };
  }
};
