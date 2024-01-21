import { For } from "solid-js";
import Keys, { getKeys } from "./Keys";
import Code from "./Code";

type Props = {
  code: string;
};

function KeyPattern(props: Props) {
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
        <For each={props.code.split("/")}>
          {(code) => (
            <div
              style={{
                "flex-direction": "column",
                padding: "0 10px",
              }}
            >
              <Keys keys={getKeys(code)} />
            </div>
          )}
        </For>
      </div>
      <Code>{props.code}</Code>
    </div>
  );
}

export default KeyPattern;
