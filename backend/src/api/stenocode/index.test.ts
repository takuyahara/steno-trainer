import { expect, test } from "bun:test";
import StenoCode from ".";

test("someStenoCode", () => {
  expect(StenoCode.some("this")).toBe(true);
  expect(StenoCode.some("typoscript")).toBe(false);
  expect(StenoCode.some("")).toBe(false);
});

test("findStenoCode", () => {
  expect(StenoCode.find("this")).toEqual(["TH", "TH-RBGS"]);
  expect(StenoCode.find("typoscript")).toEqual([]);
  expect(StenoCode.find("")).toEqual([]);
});
