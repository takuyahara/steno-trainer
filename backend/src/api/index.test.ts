import { expect, test } from "bun:test";
import { Remark, phase1, phase11, phase2, phase22, phase3, find } from ".";

test("phase1", () => {
  expect(phase1("hello")).toEqual({
    word: "hello",
    codes: [],
    validity: true,
    remark: Remark.FoundEntirely,
    detail: 'Word "hello" has found',
  });
  expect(phase1("konnichiwa")).toEqual({
    word: "konnichiwa",
    codes: [],
    validity: false,
    remark: Remark.NotFoundEntirely,
    detail: 'Word "konnichiwa" has not found',
  });
});

test("phase11", () => {
  expect(phase11("hello")).toEqual([
    {
      word: "hello",
      codes: [],
      validity: true,
      remark: Remark.FoundEntirely,
      detail: 'Word "hello" has found',
    },
  ]);
  expect(phase11("konnichiwa")).toEqual([
    {
      word: "konnichiwa",
      codes: [],
      validity: false,
      remark: Remark.NotFoundEntirely,
      detail: 'Word "konnichiwa" has not found',
    },
  ]);
  expect(phase11("hello world")).toEqual([
    {
      word: "hello",
      codes: [],
      validity: true,
      remark: Remark.FoundEntirely,
      detail: 'Word "hello" has found',
    },
    {
      word: "world",
      codes: [],
      validity: true,
      remark: Remark.FoundEntirely,
      detail: 'Word "world" has found',
    },
  ]);
});

test("phase2", () => {
  expect(
    phase2([
      {
        word: "this",
        codes: [],
        validity: true,
        remark: Remark.FoundEntirely,
        detail: 'Word "this" has found',
      },
      {
        word: "is",
        codes: [],
        validity: true,
        remark: Remark.FoundEntirely,
        detail: 'Word "is" has found',
      },
      {
        word: "test",
        codes: [],
        validity: true,
        remark: Remark.FoundEntirely,
        detail: 'Word "test" has found',
      },
    ])
  ).toEqual({
    word: "this is",
    codes: [],
    validity: true,
    remark: Remark.FoundMultipleWords,
    detail: 'Words "this is" have found',
  });
  expect(
    phase2([
      {
        word: "hello",
        codes: [],
        validity: true,
        remark: Remark.FoundEntirely,
        detail: 'Word "hello" has found',
      },
      {
        word: "world",
        codes: [],
        validity: true,
        remark: Remark.FoundEntirely,
        detail: 'Word "world" has found',
      },
    ])
  ).toEqual({
    word: "hello",
    codes: [],
    validity: true,
    remark: Remark.FoundEntirely,
    detail: 'Word "hello" has found',
  });
  expect(
    phase2([
      {
        word: "hello",
        codes: [],
        validity: true,
        remark: Remark.FoundEntirely,
        detail: 'Word "hello" has found',
      },
    ])
  ).toEqual({
    word: "hello",
    codes: [],
    validity: true,
    remark: Remark.FoundEntirely,
    detail: 'Word "hello" has found',
  });
  // expect(phase2([])).toThrow(new SyntaxError("Empty array has passed"));
});

test("phase22", () => {
  expect(
    phase22([
      {
        word: "this",
        codes: [],
        validity: true,
        remark: Remark.FoundEntirely,
        detail: 'Word "this" has found',
      },
      {
        word: "is",
        codes: [],
        validity: true,
        remark: Remark.FoundEntirely,
        detail: 'Word "is" has found',
      },
      {
        word: "test",
        codes: [],
        validity: true,
        remark: Remark.FoundEntirely,
        detail: 'Word "test" has found',
      },
    ])
  ).toEqual([
    {
      word: "this is",
      codes: [],
      validity: true,
      remark: Remark.FoundMultipleWords,
      detail: 'Words "this is" have found',
    },
    {
      word: "test",
      codes: [],
      validity: true,
      remark: Remark.FoundEntirely,
      detail: 'Word "test" has found',
    },
  ]);
  expect(
    phase22([
      {
        word: "hello",
        codes: [],
        validity: true,
        remark: Remark.FoundEntirely,
        detail: 'Word "hello" has found',
      },
      {
        word: "world",
        codes: [],
        validity: true,
        remark: Remark.FoundEntirely,
        detail: 'Word "world" has found',
      },
    ])
  ).toEqual([
    {
      word: "hello",
      codes: [],
      validity: true,
      remark: Remark.FoundEntirely,
      detail: 'Word "hello" has found',
    },
    {
      word: "world",
      codes: [],
      validity: true,
      remark: Remark.FoundEntirely,
      detail: 'Word "world" has found',
    },
  ]);
  expect(
    phase22([
      {
        word: "hello",
        codes: [],
        validity: true,
        remark: Remark.FoundEntirely,
        detail: 'Word "hello" has found',
      },
    ])
  ).toEqual([
    {
      word: "hello",
      codes: [],
      validity: true,
      remark: Remark.FoundEntirely,
      detail: 'Word "hello" has found',
    },
  ]);
  // expect(phase22([])).toThrow(new SyntaxError("Empty array has passed"));
});

test("phase3", () => {
  expect(
    phase3([
      {
        word: `"hello"`,
        codes: [],
        validity: false,
        remark: Remark.NotFoundEntirely,
        detail: `Word ""hello"" has not found`,
      },
    ])
  ).toEqual([
    {
      word: `"`,
      codes: [],
      validity: false,
      remark: Remark.NotFoundEntirely,
      detail: `Word """ has not found`,
    },
    {
      word: "hello",
      codes: [],
      validity: true,
      remark: Remark.FoundEntirely,
      detail: `Word "hello" has found`,
    },
    {
      word: `"`,
      codes: [],
      validity: false,
      remark: Remark.NotFoundEntirely,
      detail: `Word """ has not found`,
    },
  ]);
  expect(
    phase3([
      {
        word: "hello.",
        codes: [],
        validity: false,
        remark: Remark.NotFoundEntirely,
        detail: 'Word "hello." has not found',
      },
    ])
  ).toEqual([
    {
      word: "hello",
      codes: [],
      validity: true,
      remark: Remark.FoundEntirely,
      detail: `Word "hello" has found`,
    },
    {
      word: ".",
      codes: [],
      validity: true,
      remark: Remark.FoundEntirely,
      detail: `Word "." has found`,
    },
  ]);
});

test("find().raw()", () => {
  expect(find("This is a test.").raw()).toEqual([
    {
      word: "This",
      codes: [],
      validity: false,
      remark: Remark.NotFoundEntirely,
      detail: 'Word "This" has not found',
    },
    {
      word: "is a",
      codes: ["SA*EU"],
      validity: true,
      remark: Remark.FoundMultipleWords,
      detail: 'Words "is a" have found',
    },
    {
      word: "test",
      codes: ["T*ES", "TEF", "TEFLT", "TEFT"],
      validity: true,
      remark: Remark.FoundEntirely,
      detail: 'Word "test" has found',
    },
    {
      word: ".",
      codes: ["PR-D"],
      validity: true,
      remark: Remark.FoundEntirely,
      detail: 'Word "." has found',
    },
  ]);
});

test("find().slim()", () => {
  expect(find("this is test").slim()).toEqual([
    {
      word: "this is",
      codes: ["TH-S"],
    },
    {
      word: "test",
      codes: ["T*ES", "TEF", "TEFLT", "TEFT"],
    },
  ]);
});
