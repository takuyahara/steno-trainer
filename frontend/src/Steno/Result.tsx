import { createSignal, createEffect, For } from "solid-js";
import { useTyped } from "./TypedProvider";
import KeyPattern from "./KeyPattern";

type MyResult = {
  word: string;
  codes: string[];
};

function Result() {
  const { text, setWords } = useTyped()!;
  const [res, setRes] = createSignal<MyResult[]>([]);
  createEffect(async () => {
    if (text() === "") {
      return;
    }
    const response = await fetch(
      // "http://localhost:3000/q/" + encodeURIComponent(text())
      "https://backend-puce-seven.vercel.app/api/?q=" +
        encodeURIComponent(text()),
      {
        mode: "cors",
      }
    );
    const result: MyResult[] = await response.json();
    setRes(result);
    setWords(result.map((r) => r.word));
  });
  return (
    <>
      <For each={res()}>
        {({ word, codes }, i) => (
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
              {word}
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
              <For each={codes}>{(code) => <KeyPattern code={code} />}</For>
            </div>
          </div>
        )}
      </For>
    </>
  );
}

export default Result;
