import axios from "axios";
import axiosRetry from "axios-retry";
import iconv from "iconv-lite";

export const client = axios.create({
  baseURL: "http://abehiroshi.la.coocan.jp/",
});
axiosRetry(client, { retries: 10 });

export const getHtml = async (path: string) => {
  return (
    await client.get(path, {
      responseType: "arraybuffer",
      transformResponse: (html) => {
        return iconv.decode(Buffer.from(html, "binary"), "Shift_JIS");
      },
    })
  ).data;
};
