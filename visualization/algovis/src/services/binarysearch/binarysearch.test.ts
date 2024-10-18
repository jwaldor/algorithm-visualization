import { binarySearch, CallbackArgs, makeFrames } from "./binarysearch";
import { describe, test, expect } from "vitest";

describe("Binary Search", () => {
  test("should find element in sorted array", () => {
    const arr = [1, 3, 5, 7, 9, 11, 13, 15];
    expect(binarySearch(arr, 7)).toBe(3);
    expect(binarySearch(arr, 15)).toBe(7);
    expect(binarySearch(arr, 1)).toBe(0);
  });

  test("should return -1 for element not in array", () => {
    const arr = [1, 3, 5, 7, 9, 11, 13, 15];
    expect(binarySearch(arr, 0)).toBe(-1);
    expect(binarySearch(arr, 16)).toBe(-1);
    expect(binarySearch(arr, 8)).toBe(-1);
  });

  test("should work with array of length 1", () => {
    const arr = [5];
    expect(binarySearch(arr, 5)).toBe(0);
    expect(binarySearch(arr, 1)).toBe(-1);
  });

  test("should work with empty array", () => {
    const arr: number[] = [];
    expect(binarySearch(arr, 5)).toBe(-1);
  });

  test("should handle duplicate elements", () => {
    const arr = [1, 3, 3, 3, 5, 7, 7, 9];
    expect(binarySearch(arr, 3)).toBeGreaterThanOrEqual(1);
    expect(binarySearch(arr, 3)).toBeLessThanOrEqual(3);
    expect(binarySearch(arr, 7)).toBeGreaterThanOrEqual(5);
    expect(binarySearch(arr, 7)).toBeLessThanOrEqual(6);
  });
});

describe("makeFrames", () => {
  test("should create correct frames for a simple search", () => {
    const searchSteps = [
      { compare: 5, leading: 0, array: [1, 3, 5, 7, 9], index: 2, target: 5 },
    ];
    const frames = makeFrames(searchSteps);
    expect(frames).toEqual([
      [
        { value: 1, type: "regular" },
        { value: 3, type: "regular" },
        { value: 5, type: "found" },
        { value: 7, type: "regular" },
        { value: 9, type: "regular" },
      ],
    ]);
  });

  // test("should create correct frames for multiple steps", () => {
  //   const searchSteps = [
  //     { compare: 5, leading: 0, array: [1, 3, 5, 7, 9], index: 2, target: 7 },
  //     { compare: 7, leading: 3, array: [1, 3, 5, 7, 9], index: 3, target: 7 },
  //   ];
  //   const frames = makeFrames(searchSteps);
  //   expect(frames).toEqual([
  //     [
  //       { value: 1, type: "regular" },
  //       { value: 3, type: "regular" },
  //       { value: 5, type: "focus" },
  //       { value: 7, type: "regular" },
  //       { value: 9, type: "regular" },
  //     ],
  //     [
  //       { value: 1, type: "regular" },
  //       { value: 3, type: "regular" },
  //       { value: 5, type: "regular" },
  //       { value: 7, type: "focus" },
  //       { value: 9, type: "regular" },
  //     ],
  //   ]);
  // });

  // test("should handle empty array", () => {
  //   const searchSteps: Array<CallbackArgs> = [];
  //   const frames = makeFrames(searchSteps);
  //   expect(frames).toEqual([]);
  // });

  // test("should handle target found", () => {
  //   const searchSteps = [
  //     { compare: 5, leading: 0, array: [1, 3, 5, 7, 9], index: 2, target: 5 },
  //   ];
  //   const frames = makeFrames(searchSteps);
  //   expect(frames).toEqual([
  //     [
  //       { value: 1, type: "regular" },
  //       { value: 3, type: "regular" },
  //       { value: 5, type: "focus" },
  //       { value: 7, type: "regular" },
  //       { value: 9, type: "regular" },
  //     ],
  //   ]);
  // });
});
