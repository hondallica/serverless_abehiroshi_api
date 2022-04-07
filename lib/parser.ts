import { load } from "cheerio";

interface TableContent {
  date: string;
  title: string;
  note?: string;
}

export const parseProfileHtml = (html: string) => {
  const $ = load(html);

  let res: { [x: string]: unknown } = {};
  $("tr").each((_i, elem) => {
    const k = $(elem).find("td:nth-of-type(1)").text().trim();
    const v =
      k === "受賞歴"
        ? $(elem)
            .find("td:nth-of-type(2)")
            .text()
            .trim()
            .replace(/・/g, "")
            .split("\n")
        : $(elem).find("td:nth-of-type(2)").text().trim();
    res[k] = v;
  });

  return res;
};

export const parseMovieHtml = (html: string) => {
  const $ = load(html);

  let res: TableContent[] = [];

  $("body > center:nth-child(3) > table > tbody > tr").each((_i, elem) => {
    const v = {
      date: $(elem).find("td:nth-of-type(1)").text().trim(),
      title: $(elem).find("td:nth-of-type(2)").text().trim(),
      note: $(elem).find("td:nth-of-type(3)").text().trim(),
    };
    res.push(v);
  });

  return res;
};

export const parseTvHtml = (html: string) => {
  const $ = load(html);

  let res: TableContent[] = [];

  $("body > div > table > tbody > tr").each((_i, elem) => {
    const v = {
      date: $(elem).find("td:nth-of-type(1)").text().trim(),
      title: $(elem).find("td:nth-of-type(2)").text().trim(),
    };
    res.push(v);
  });

  return res;
};

export const parseStageHtml = (html: string) => {
  const $ = load(html);

  let res: {
    stage: TableContent[];
    radio: TableContent[];
    record: TableContent[];
    video: TableContent[];
  } = { stage: [], radio: [], record: [], video: [] };

  $("body > center:nth-child(6) > table > tbody > tr").each((_i, elem) => {
    const v = {
      date: $(elem).find("td:nth-of-type(1)").text().trim(),
      title: $(elem).find("td:nth-of-type(2)").text().trim(),
      note: $(elem).find("td:nth-of-type(3)").text().trim(),
    };
    res.stage.push(v);
  });

  $("body > center:nth-child(11) > table > tbody > tr").each((_i, elem) => {
    const v = {
      date: $(elem).find("td:nth-of-type(1)").text().trim(),
      title: $(elem).find("td:nth-of-type(2)").text().trim(),
      note: $(elem).find("td:nth-of-type(3)").text().trim(),
    };
    res.radio.push(v);
  });

  $("body > center:nth-child(15) > table > tbody > tr").each((_i, elem) => {
    const v = {
      date: $(elem).find("td:nth-of-type(1)").text().trim(),
      title: $(elem).find("td:nth-of-type(2)").text().trim(),
      note: $(elem).find("td:nth-of-type(3)").text().trim(),
    };
    res.record.push(v);
  });

  $(
    "body > center:nth-child(16) > center:nth-child(4) > table > tbody > tr"
  ).each((_i, elem) => {
    const v = {
      date: $(elem).find("td:nth-of-type(1)").text().trim(),
      title: $(elem).find("td:nth-of-type(2)").text().trim(),
      note: $(elem).find("td:nth-of-type(3)").text().trim(),
    };
    res.video.push(v);
  });

  return res;
};

export const parsePhotoHtml = (html: string) => {
  const $ = load(html);

  let res: { type: string; title: string }[] = [];

  $("body > table > tbody > tr").each((_i, elem) => {
    const v = {
      type: $(elem).find("td:nth-of-type(1)").text().trim(),
      title: $(elem).find("td:nth-of-type(2)").text().trim(),
    };
    res.push(v);
  });

  return res;
};

export const parseEssayHtml = (html: string) => {
  const $ = load(html);

  let res: string[] = [];

  $("body > table > tbody > tr").each((_i, elem) => {
    res.push($(elem).find("strong").text().trim());
  });

  return res;
};
