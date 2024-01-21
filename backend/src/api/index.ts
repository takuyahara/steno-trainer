import Split from "./splitter";
import StenoCode from "./stenocode";

export enum Remark {
  FoundEntirely,
  FoundMultipleWords,
  NotFoundEntirely,
}

type Text = {
  word: string;
  codes: string[];
  validity: boolean;
  remark: Remark;
  detail: string;
};

/**
 *
 * @param word
 * @returns
 */
export function phase1(word: string): Text {
  const validity = StenoCode.some(word);
  return {
    word,
    codes: [],
    validity,
    remark: validity ? Remark.FoundEntirely : Remark.NotFoundEntirely,
    detail: validity
      ? `Word "${word}" has found`
      : `Word "${word}" has not found`,
  };
}

export function phase11(s: string): Text[] {
  return Split.space(s).map(phase1);
}

export function phase2(texts: Text[]): Text {
  if (texts.length == 0) {
    throw new SyntaxError("Empty array has passed");
  }
  if (!texts[0].validity) {
    return texts[0];
  }
  const words = [texts[0].word];
  for (const text of texts.slice(1)) {
    if (!text.validity) {
      break;
    }
    const validity = StenoCode.some(words.concat(text.word).join(" "));
    if (!validity) {
      break;
    }
    words.push(text.word);
  }
  return {
    word: words.join(" "),
    codes: [],
    validity: true,
    remark: words.length > 1 ? Remark.FoundMultipleWords : Remark.FoundEntirely,
    detail:
      words.length > 1
        ? `Words "${words.join(" ")}" have found`
        : texts[0].detail,
  };
}

export function phase22(texts: Text[]): Text[] {
  if (texts.length == 0) {
    throw new SyntaxError("Empty array has passed");
  }
  const tt: Text[] = [];
  for (let i = 0, l = texts.length; i < l; i++) {
    const z = phase2(texts.slice(i));
    tt.push(z);
    i += z.word.split(" ").length - 1;
  }
  return tt;
}

export function phase3(texts: Text[]): Text[] {
  const tt: Text[] = [];
  for (const text of texts) {
    if (text.validity) {
      tt.push(text);
      continue;
    }
    const splitted = Split.symbol(text.word).map((word) => {
      const validity = StenoCode.some(word);
      return {
        word,
        codes: [],
        validity,
        remark: validity ? Remark.FoundEntirely : Remark.NotFoundEntirely,
        detail: validity
          ? `Word "${word}" has found`
          : `Word "${word}" has not found`,
      };
    });
    tt.push(...splitted);
  }
  return tt;
}

export function find(s: string): Result {
  console.time("total");
  console.group();
  console.time("phase1");
  const p1 = phase11(s);
  console.timeEnd("phase1");
  console.time("phase2");
  const p2 = phase22(p1);
  console.timeEnd("phase2");
  console.time("phase3");
  const p3 = phase3(p2);
  console.timeEnd("phase3");
  console.time("phase4");
  const p4 = p3.map((p) => ({
    ...p,
    codes: p.validity ? StenoCode.find(p.word) : [],
  }));
  console.timeEnd("phase4");
  console.groupEnd();
  console.timeEnd("total");
  return new Result(p4);
}

class Result {
  #texts: Text[] = [];
  constructor(texts: Text[]) {
    this.#texts = texts;
  }
  raw() {
    return this.#texts;
  }
  slim() {
    return this.#texts.map(({ word, codes }) => ({
      word,
      codes,
    }));
  }
}
