import {
  createSignal,
  createContext,
  useContext,
  JSXElement,
  Accessor,
  Setter,
} from "solid-js";

const TypedContext = createContext<Context>()!;

export type Context = {
  text: Accessor<string>;
  setText: Setter<string>;
  typed: Accessor<string>;
  setTyped: Setter<string>;
  words: Accessor<string[]>;
  setWords: Setter<string[]>;
  done: Accessor<boolean>;
  setDone: Setter<boolean>;
};

type Props = {
  children: JSXElement;
};

export function TypedProvider(props: Props) {
  const [text, setText] = createSignal<string>("");
  const [typed, setTyped] = createSignal<string>("");
  const [words, setWords] = createSignal<string[]>([]);
  const [done, setDone] = createSignal<boolean>(false);
  return (
    <TypedContext.Provider
      value={{ text, setText, typed, setTyped, words, setWords, done, setDone }}
    >
      {props.children}
    </TypedContext.Provider>
  );
}

export function useTyped() {
  return useContext(TypedContext);
}
