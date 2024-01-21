import { JSX } from "solid-js";

type Props = {
  children: JSX.Element;
};

function Code(props: Props) {
  return (
    <div
      style={{
        display: "inline-block",
        "background-color": "var(--stone-10)",
        padding: "5px 10px",
      }}
    >
      {props.children}
    </div>
  );
}

export default Code;
