import { generateBoard, updateBoard } from "./main.js";
import { assertEquals } from "jsr:@std/assert";
import { getPosition, isValid, isWin } from "./src.js";

Deno.test("check generate board", () =>
  assertEquals(generateBoard(), [
    "     |",
    "     |",
    "     |",
    "     |",
    "     |",
    "     |",
    "     |",
    "     |",
    "     |",
  ]));

Deno.test("check update board", () =>
  assertEquals(
    updateBoard(
      [
        "     |",
        "     |",
        "     |",
        "     |",
        "     |",
        "     |",
        "     |",
        "     |",
        "     |",
      ],
      5,
      "X",
    ),
    [
      "     |",
      "     |",
      "     |",
      "     |",
      "    X|",
      "     |",
      "     |",
      "     |",
      "     |",
    ],
  ));

Deno.test("check update board", () =>
  assertEquals(
    updateBoard(
      [
        "     |",
        "     |",
        "     |",
        "     |",
        "     |",
        "     |",
        "     |",
        "     |",
        "     |",
      ],
      9,
      "O",
    ),
    [
      "     |",
      "     |",
      "     |",
      "     |",
      "     |",
      "     |",
      "     |",
      "     |",
      "    O|",
    ],
  ));

Deno.test("test position validate function", () =>
  assertEquals(isValid(6, [2, 3], [5, 7]), true));

Deno.test("test position validate function", () =>
  assertEquals(isValid(5, [2, 3], [5, 7]), false));

// Deno.test("test getposition function", () =>
// assertEquals(getPosition({ name: "hello" }, [2, 3], [5, 7]), 6));

Deno.test("test iswin function", () =>
  assertEquals(isWin({ moves: [1, 2, 4, 5, 6, 9] }), true));

Deno.test("test iswin function", () =>
  assertEquals(isWin({ moves: [1, 2, 7, 5, 6, 9] }), true));
