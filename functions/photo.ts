import { getHtml } from "../lib/client";
import { parsePhotoHtml } from "../lib/parser";

export const handler = async () => {
  try {
    const html = await getHtml("/photo/photo.htm");
    return { statusCode: 200, body: JSON.stringify(parsePhotoHtml(html)) };
  } catch (e) {
    return { statusCode: 500, body: "Why not the best?" };
  }
};
