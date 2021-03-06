import { getHtml } from "../lib/client";
import { parseStageHtml } from "../lib/parser";

export const handler = async () => {
  try {
    const html = await getHtml("/stage/butai.htm");
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify(parseStageHtml(html)),
    };
  } catch (e) {
    return { statusCode: 500, body: "Why not the best?" };
  }
};
