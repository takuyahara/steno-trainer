import { createSignal, createEffect, For } from "solid-js";
import { useTyped } from "./TypedProvider";
import Keys, { getKeys } from "./Keys";
import main from "../../main.json";

function find0(text: string) {
  const found = Object.entries(main)
    .filter(([key, value]) => {
      return value === text && !/[0-9]/.test(key);
    })
    .map(([key]) => {
      return key;
    });
  return found;
}

const SYMBOLS = new Map([
  ["*", "{^*^}"],
  ["\\", "{^\\^}"],
  [" ", "{^ ^}"],
  [";", "{^;^}"],
  ["@", "{^@^}"],
  ["=", "{^=^}"],
  [":", "{^:^}"],
  ["[", "{^[^}"],
  ["]", "{^]^}"],
  ["|", "{^|^}"],
  [".", "{^.^}"],
  [",", "{^,^}"],
  ["-", "{^-^}"],
  ["^", "{^_^}"],
  [">", "{^>^}"],
  ["<", "{^<^}"],
  ["/", "{^/^}"],
  ['"', '{~|"^}'],
  ["'", "{^'}"],
]);

function SplitCamel(s: string): string[] {
  return s.split(/(^[a-z]+)|([A-Z][a-z]+)/).filter((ss: string | undefined) => {
    return ss !== "" && ss !== undefined;
  });
}

function findEntirely(text: string): MyResult[] {
  const found: MyResult[] = [];
  const splittedd = text.split(/ +/);
  if (splittedd.at(-1) === "") {
    splittedd.pop();
  }
  const splitted = splittedd
    .map((s) => {
      const v: string[] = [];
      let word = "";
      while (s !== "") {
        const charLast = s.at(-1)!;
        const symbol = SYMBOLS.get(charLast);
        if (symbol !== undefined) {
          if (word !== "") {
            v.push(word);
            word = "";
          }
          v.push(symbol);
          s = s.slice(0, -1);
          continue;
        }
        if (!/[a-zA-Z]/.test(charLast)) {
          if (word !== "") {
            v.push(word);
            word = "";
          }
          const symbol = "{" + charLast + "}";
          v.push(symbol);
          s = s.slice(0, -1);
          continue;
        }
        word = charLast + word;
        s = s.slice(0, -1);
      }
      if (word !== "") {
        v.push(word);
        word = "";
      }
      v.reverse();
      return v;
    })
    .flat();
  loop: while (splitted.length > 0) {
    const wordz = splitted.shift()!;
    const find00 = find0(wordz);
    if (find00.length > 0) {
      const word = wordz;
      let myfound = find00;
      if (myfound.length === 0) {
        found.push({ word, steno: [] });
        continue;
      }
      if (splitted.length === 0) {
        found.push({ word, steno: myfound });
        break;
      }
      let w = word;
      let lastw = word;
      let myfoundlast = myfound;
      while (splitted.length > 0) {
        w += " " + splitted[0];
        myfound = find0(w);
        if (myfound.length === 0) {
          found.push({ word: lastw, steno: myfoundlast });
          continue loop;
        }
        splitted.shift();
        lastw = w;
        myfoundlast = myfound;
      }
      found.push({ word: lastw, steno: myfoundlast });
      continue;
    }
    const tempFound = [];
    const words = SplitCamel(wordz);
    for (const word of words) {
      let myfound = find0(word);
      if (myfound.length === 0) {
        tempFound.push({ word, steno: [] });
        continue;
      }
      tempFound.push({ word, steno: myfound });
    }
    const foundNum = tempFound.reduce((acc, cur) => {
      return acc + cur.steno.length;
    }, 0);
    if (foundNum > 0) {
      found.push(...tempFound);
    } else {
      found.push({ word: wordz, steno: [] });
    }
  }
  return found;
}

type MyResult = {
  word: string;
  steno: any[];
};

function Result() {
  const { text, setWords } = useTyped()!;
  const [res, setRes] = createSignal<MyResult[]>([]);
  createEffect(() => {
    const result = findEntirely(text());
    setRes(result);
    setWords(result.map((r) => r.word));
  });
  return (
    <>
      <For each={res()}>
        {(cat, i) => (
          <div
            data-id={i()}
            style={{
              display: "flex",
              gap: "0 10px",
              "margin-bottom": "var(--font-size-2)",
            }}
          >
            <div
              style={{
                "border-radius": "var(--radius-2)",
                display: "flex",
                padding: "10px",
                "align-items": "center",
                "white-space": "nowrap",
              }}
            >
              {cat.word}
            </div>
            <div
              style={{
                display: "flex",
                gap: "0 10px",
                width: "100%",
                "overflow-x": "scroll",
                padding: "10px",
                "border-radius": "var(--radius-3)",
                "background-color": "hsl(var(--gray-12-hsl) / 40%)",
                border: "1px solid hsl(var(--gray-0-hsl) / 20%)",
              }}
            >
              <For each={cat.steno}>
                {(catt) => {
                  const csplitted = catt.split("/");
                  const aa = csplitted.map((catt0: string) => (
                    <div
                      style={{
                        "flex-direction": "column",
                        padding: "0 10px",
                      }}
                    >
                      <Keys keys={getKeys(catt0)} />
                    </div>
                  ));
                  return (
                    <div
                      style={{
                        "border-radius": "var(--radius-3)",
                        "background-color": "hsl(var(--gray-9-hsl) / 40%)",
                        border: "1px solid hsl(var(--gray-0-hsl) / 20%)",
                        padding: "15px 5px",
                        "font-weight": "var(--font-weight-5)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          "flex-wrap": "nowrap",
                          "margin-bottom": "10px",
                        }}
                      >
                        {aa.flat()}
                      </div>
                      <div>
                        <div
                          style={{
                            display: "inline-block",
                            "background-color": "var(--stone-10)",
                            padding: "5px 10px",
                          }}
                        >
                          {catt}
                        </div>
                      </div>
                    </div>
                  );
                }}
              </For>
            </div>
          </div>
        )}
      </For>
      {/* <div>{JSON.stringify(res())}</div> */}
    </>
  );
}

export default Result;
