const SYMBOLS: ReadonlyMap<string, string> = new Map([
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

/**
 *
 * @param s
 * @returns
 */
function space(s: string): string[] {
  return s.trim().split(/ +/);
}

/**
 * Split camel case text. To be used to try finding steno code separately.
 * @param s
 * @returns
 * @link https://stackoverflow.com/a/18379358/10942999
 */
function camelCase(s: string): string[] {
  return s.replace(/([a-z])([A-Z])/g, "$1 $2").split(" ");
}
/**
 *
 * @param s
 * @returns
 * @link https://stackoverflow.com/a/3561711/10942999
 * @link https://medium.com/@shemar.gordon32/how-to-split-and-keep-the-delimiter-s-d433fb697c65
 */
function symbol(s: string): string[] {
  const p =
    "[" +
    Array.from(SYMBOLS.keys())
      .map((key) => {
        return key.replace(/[/\-\\^$*+?.()|[\]{}]/g, "\\$&");
      })
      .join("") +
    "]";
  const re = new RegExp(`(?=${p})|(?<=${p})`, "g");
  return s.split(re);
}

export default {
  space,
  camelCase,
  symbol,
};
