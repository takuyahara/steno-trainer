import main from "../../main.json";

/**
 * Validate if corresponding steno code exists.
 * @param s
 * @returns
 */
function some(s: string): boolean {
  const found = Object.entries(main).some(([key, value]) => {
    // As `The Uni v4` does not have number keys, codes which
    // includes numbers are omitted here.
    return value === s && !/[0-9]/.test(key);
  });
  return found;
}

/**
 * Finds corresponding steno codes from string.
 * @param s
 * @returns
 */
function find(s: string): string[] {
  const found = Object.entries(main)
    .filter(([key, value]) => {
      // As `The Uni v4` does not have number keys, codes which
      // includes numbers are omitted here.
      return value === s && !/[0-9]/.test(key);
    })
    .map(([key]) => {
      return key;
    });
  return found;
}

export default {
  some,
  find,
};
