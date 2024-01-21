import { JSX, Show } from "solid-js";
import { useTyped } from "./TypedProvider";
import { ConfettiExplosion } from "solid-confetti-explosion";

function Typing() {
  const { typed, setTyped, done } = useTyped()!;
  const handleChange: JSX.EventHandlerUnion<HTMLTextAreaElement, Event> = (
    event
  ) => {
    setTyped(event.currentTarget.value);
    // event.preventDefault();
  };
  return (
    <>
      <Show when={done()}>
        <div
          style={{
            position: "fixed",
            left: "50%",
          }}
        >
          <ConfettiExplosion stageHeight={window.innerHeight} />
        </div>
      </Show>
      <textarea
        rows={1}
        style={{
          position: "absolute",
          left: 0,
          "background-color": "transparent",
          "border-radius": "var(--radius-3)",
          "box-sizing": "border-box",
          "font-family": "var(--font-mono)",
          "font-size": "var(--font-size-2)",
          "line-height": "var(--font-lineheight-2)",
          "margin-bottom": "2rem",
          "text-align": "left",
          "word-wrap": "break-word",
          border: "2px solid transparent",
          display: "inline-block",
          padding: "var(--font-size-0)",
          width: "100%",
          resize: "none",
          // "caret-color": "transparent",
        }}
        onKeyDown={handleChange}
        onKeyUp={handleChange}
      >
        {typed()}
      </textarea>
    </>
  );
}

export default Typing;
