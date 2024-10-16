const testArr1 = [1, 3, 5, 7];
const testArr2 = [2, 4, 6, 8];
const zippedArray = testArr1.flatMap((value, index) => [
  value,
  testArr2[index],
]);

function map<T, U>(
  array: T[],
  callback: (element: T, index: number, array: T[]) => U
): U[] {
  const result: U[] = [];
  for (let i = 0; i < array.length; i++) {
    result.push(callback(array[i], i, array));
  }
  return result;
}

const zippedArray2 = map(testArr1, (value, index) => [
  value,
  testArr2[index],
]).flat();
console.log(zippedArray2);

console.log(zippedArray);
