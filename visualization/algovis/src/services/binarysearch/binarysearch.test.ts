import { binarySearch } from "./binarysearch";
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
