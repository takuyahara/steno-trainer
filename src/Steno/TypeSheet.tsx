import { createSignal, createEffect, JSX, Show } from "solid-js";
import { useTyped } from "./TypedProvider";
import { ConfettiExplosion } from "solid-confetti-explosion";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

const STYLES: Record<string, JSX.CSSProperties> = {
  Correct: {
    color: "hsl(var(--gray-0-hsl) / 50%)",
  },
  Incorrect: {
    "background-color": "red",
    color: "hsl(var(--gray-0-hsl) / 50%)",
  },
  Active: {
    color: "hsl(var(--gray-0-hsl) / 50%)",
  },
  NotYet: {
    color: "hsl(var(--gray-0-hsl) / 50%)",
  },
};

function TypeSheet() {
  gsap.registerPlugin(ScrollToPlugin);
  const [styles, setStyles] = createSignal<JSX.CSSProperties[]>([]);
  const [done, setDone] = createSignal(false);
  const { text, typed, words } = useTyped()!;
  let prevPosId = 0;
  createEffect(() => {
    const b: JSX.CSSProperties[] = new Array(text().length).fill(STYLES.NotYet);
    let hasFailed = false;
    for (let i = 0, l = typed().length; i < l; i++) {
      if (typed().at(i) !== text().at(i)) {
        b[i] = STYLES.Incorrect;
        hasFailed = true;
        break;
      }
    }
    if (!hasFailed) {
      b[typed().length] = STYLES.Active;
    }
    setDone(
      !hasFailed && typed().length > 0 && text().length === typed().length
    );
    setStyles(b);
    type Positions = {
      pos: number;
      id: number;
    };
    if (words().length > 0 && !hasFailed) {
      const positions = words().reduce((acc: Positions[], cur, i) => {
        return acc.concat({
          pos: (acc.at(-1)?.pos ?? 0) + cur.length + 1,
          id: i,
        });
      }, []);
      const pos = positions.find((p) => {
        return typed().length < p.pos;
      });
      if (pos !== undefined) {
        if (prevPosId !== pos.id) {
          const obj0 =
            document.querySelector<HTMLDivElement>(`div[data-id="0"]`);
          const obj = document.querySelector<HTMLDivElement>(
            `div[data-id="${pos?.id}"]`
          );
          if (obj0 != null && obj !== null) {
            const scrollTop = obj.offsetTop - obj0.offsetTop;
            // document.querySelector("html")!.scrollTo(0, scrollTop);
            gsap.to(window, {
              duration: 0.3,
              scrollTo: scrollTop,
              ease: "power2",
            });
          }
        }
        prevPosId = pos.id;
      }
    }
  });
  return (
    <div
      style={{
        "background-color": "hsl(var(--gray-9-hsl) / 60%)",
        "border-radius": "var(--radius-3)",
        "box-sizing": "content-box",
        "font-family": "var(--font-mono)",
        "font-size": "var(--font-size-2)",
        "line-height": "var(--font-lineheight-2)",
        "margin-bottom": "2rem",
        "text-align": "left",
        "word-wrap": "break-word",
        border: "2px solid hsl(var(--gray-0-hsl) / 20%)",
        display: "block",
        padding: "var(--font-size-0)",
        height: "var(--font-size-4)",
      }}
    >
      {text()
        .split("")
        .map((_, i) => (
          <span style={styles().at(i)}>{text().at(i)}</span>
        ))}
      <Show when={done()}>
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
          }}
        >
          <ConfettiExplosion />
        </div>
      </Show>
    </div>
  );
}

export default TypeSheet;
