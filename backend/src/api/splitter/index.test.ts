import { expect, test } from "bun:test";
import Split from ".";

test("space", () => {
  expect(Split.space("nospace")).toEqual(["nospace"]);
  expect(Split.space("with single spaces")).toEqual([
    "with",
    "single",
    "spaces",
  ]);
  expect(Split.space("with   long   spaces")).toEqual([
    "with",
    "long",
    "spaces",
  ]);
  expect(Split.space(" to be trimmed ")).toEqual(["to", "be", "trimmed"]);
});

test("camelCase", () => {
  expect(Split.camelCase("noncamelcase")).toEqual(["noncamelcase"]);
  expect(Split.camelCase("lowerCamelCase")).toEqual(["lower", "Camel", "Case"]);
  expect(Split.camelCase("UpperCamelCase")).toEqual(["Upper", "Camel", "Case"]);
});

test("symbol", () => {
  expect(Split.symbol(`"doublequotes"`)).toEqual([`"`, `doublequotes`, `"`]);
  expect(Split.symbol(`'singlequotes'`)).toEqual([`'`, `singlequotes`, `'`]);
});
