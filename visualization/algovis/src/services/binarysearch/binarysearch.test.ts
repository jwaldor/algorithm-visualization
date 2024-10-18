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

const binarySearchTestCases = [
  { arr: [1, 3, 5, 7, 9, 11], target: 5, expected: 2 },
  { arr: [2, 4, 6, 8, 10, 12, 14], target: 1, expected: -1 },
  { arr: [1, 1, 2, 3, 3, 3, 4, 5, 5], target: 3, expected: 3 },
  { arr: [100], target: 100, expected: 0 },
  { arr: [], target: 42, expected: -1 },
  { arr: [-5, -3, -1, 0, 2, 4, 6], target: -3, expected: 1 },
  { arr: [1, 2, 3, 4, 5], target: 6, expected: -1 },
];

for (let i = 0; i < binarySearchTestCases.length; i++) {
  const searchSteps: Array<CallbackArgs> = [];
  const testCase = binarySearchTestCases[i];
  // console.log(`Test case ${i + 1}:`);
  // console.log(`  Array: [${testCase.arr}]`);
  // console.log(`  Target: ${testCase.target}`);
  // console.log(`  Expected: ${testCase.expected}`);

  const result = binarySearch(testCase.arr, testCase.target, (args) => {
    searchSteps.push(args);
  });

  console.log(`  Result: ${result}`);
  console.log("  Search steps:");
  searchSteps.forEach((step, index) => {
    console.log(
      `    Step ${index + 1}: compare=${step.compare}, leading=${
        step.leading
      }, index=${step.index}`
    );
  });
  console.log("---");
}

describe("makeFrames", () => {
  test("should create correct frames for a simple search", () => {
    const searchSteps = [
      {
        compare: 5,
        leading: 0,
        array: [1, 3, 5, 7, 9],
        index: 2,
        target: 5,
        right: 4,
      },
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
});
