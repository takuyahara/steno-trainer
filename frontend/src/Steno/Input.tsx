import { JSX } from "solid-js";
import { useTyped } from "./TypedProvider";

function Input() {
  const { text, setText } = useTyped()!;
  const handleChange: JSX.EventHandlerUnion<HTMLTextAreaElement, Event> = (
    event
  ) => {
    event.preventDefault();
    setText(event.currentTarget.value);
  };
  return (
    <textarea
      style={{
        display: "block",
        "margin-bottom": "2rem",
        "border-radius": "var(--radius-3)",
        "font-size": "var(--font-size-2)",
        "line-height": "var(--font-lineheight-2)",
        width: "100%",
        padding: "var(--font-size-0)",
        "background-color": "hsl(var(--gray-9-hsl) / 60%)",
        border: "2px solid hsl(var(--gray-0-hsl) / 20%)",
        "box-sizing": "border-box",
        "font-family": "var(--font-sans)",
        resize: "none",
      }}
      placeholder="type text and hit Ctrl+Enter"
      onKeyDown={(element) => {
        if (element.key === "Enter" && element.metaKey) {
          element.preventDefault();
          handleChange(element);
        }
      }}
    >
      {text()}
    </textarea>
  );
}

export default Input;
