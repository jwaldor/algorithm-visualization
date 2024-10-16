function linearSearch<T extends string | number>(array: T[], term: T) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === term) {
      return i;
    }
  }
  return;
}

// This will now cause a type error
// console.log(linearSearch([47, 23, 66, "3", 2, 56, 3], 3));
// console.log(linearSearch([47, 23, 66, "3", 2, 56, 3], 3));

function binarySearch(array, term, leading = 0) {
  const m = Math.floor((array.length - 1) / 2);
  if (array.length === 0) {
    return;
  }
  if (array[m] < term) {
    return binarySearch(
      array.slice(m + 1, array.length),
      term,
      leading + m + 1
    );
  } else if (array[m] > term) {
    return binarySearch(array.slice(0, m + 1), term, leading);
  } else {
    return m + leading;
  }
}

// console.log(binarySearch([2, 3, 23, 47, 47, 56, 66], 47));

// Define a tree as a list of lists
const tree = [
  {
    value: 8,
    children: [
      {
        value: 3,
        children: [
          { value: 9, children: [] },
          { value: 2, children: [{ value: 7, children: [] }] },
        ],
      },
      { value: 5, children: [] },
      {
        value: 1,
        children: [
          { value: 4, children: [] },
          { value: 6, children: [{ value: 10, children: [] }] },
        ],
      },
    ],
  },
  {
    value: 12,
    children: [
      { value: 15, children: [{ value: 11, children: [] }] },
      { value: 13, children: [] },
      {
        value: 14,
        children: [
          { value: 16, children: [{ value: 18, children: [] }] },
          { value: 17, children: [] },
        ],
      },
    ],
  },
  {
    value: 20,
    children: [
      { value: 19, children: [] },
      {
        value: 21,
        children: [
          { value: 23, children: [] },
          { value: 22, children: [{ value: 24, children: [] }] },
        ],
      },
    ],
  },
];

function depthFirstSearch(tree, term, position: Array<any> = []) {
  for (let i = 0; i < tree.length; i++) {
    if (tree[i].value === term) {
      position = position.concat(i);
      return { position };
    } else {
      if (tree[i].children.length > 0) {
        const d = depthFirstSearch(tree[i].children, term, position.concat(i));
        if (d) {
          return d;
        }
      }
    }
  }
}

// Example usage
// console.log("depthFirstSearch", depthFirstSearch(tree, 4));

function breadthFirstSearch(tree, term, position: Array<any> = []) {
  const queue: Array<any> = [];
  for (let i = 0; i < tree.length; i++) {
    // console.log(tree, tree[i].children);
    if (tree[i].value === term) {
      return [i, term, position.concat(i)];
    }
    if (tree[i].children.length > 0) {
      queue.push(tree[i].children);
    }
  }
  for (let i = 0; i < queue.length; i++) {
    const b = breadthFirstSearch(queue[i], term, position.concat([i]));
    if (b) {
      return b;
    }
  }
}

// console.log(breadthFirstSearch(tree, 4));

function bubbleSort(array) {
  let didSort = false;
  for (let i = 0; i < array.length - 1; i++) {
    if (array[i + 1] < array[i]) {
      let moving = array[i];
      array[i] = array[i + 1];
      array[i + 1] = moving;
      didSort = true;
    }
  }
  if (didSort) {
    return bubbleSort(array);
  } else {
    return array;
  }
}

// console.log(bubbleSort([3, 2, 3, 4, 5, 5, 22, 56, 7, 75, 44]));

function selectionSort(array) {
  let result: Array<number> = [];
  while (array.length > 0) {
    let smallest = 0;
    for (let i = 0; i < array.length; i++) {
      if (array[i] < array[smallest]) {
        smallest = i;
        // console.log(array[smallest], i, "here");
      }
    }
    // console.log(array);
    result.push(array.splice(smallest, 1)[0]);
  }
  array = result;
  return result;
}

// console.log(selectionSort([3, 2, 3, 4, 5, 5, 22, 56, 7, 75, 44]));

function insertionSort(array) {
  let result: Array<number> = [];
  for (let i = 0; i < array.length; i++) {
    //find position to insert the element in result
    //remove the element
    let found = false;

    for (let j = 0; j < result.length; j++) {
      if (result[j] >= array[i]) {
        //put array[i] in result[j]'s place and move result[j] one up
        const moved = result[j];
        result[j] = array[i];
        result.splice(j + 1, 0, moved);
        found = true;
        break;
      }
    }
    if (!found) {
      result.push(array[i]);
    }
  }
  array = result;
  return result;
}

// console.log(
//   "insertionSort ",
//   insertionSort([3, 2, 3, 4, 5, 5, 22, 56, 7, 75, 44])
// );

const testArr1 = [1, 3, 5, 7];
const testArr2 = [2, 4, 6, 8];
const zippedArray = testArr1.flatMap((value, index) => [
  value,
  testArr2[index],
]);

// console.log(zippedArray);

// console.log("Testing combineArrays:");
// console.log("Input arrays:", testArr1, testArr2);
// const combinedArray = combineArrays(testArr1, testArr2);
// console.log("Combined array:", combinedArray);

function combineArrays(arr1, arr2) {
  while (arr1.length > 0) {
    let index = 0;
    const elt = arr1.shift();
    while (index < arr2.length) {
      if (elt < arr2[index]) {
        arr2.splice(index, 0, elt);
        break;
      }
      index++;
    }
  }
  return arr2;
}

function mergeSort2(array: number[]): number[] {
  if (array.length <= 1) return array;
  const mid = Math.floor(array.length / 2);
  return merge(mergeSort(array.slice(0, mid)), mergeSort(array.slice(mid)));
}

function merge(left: number[], right: number[]): number[] {
  const result: number[] = [];
  while (left.length && right.length) {
    result.push(left[0] <= right[0] ? left.shift()! : right.shift()!);
  }
  return [...result, ...left, ...right];
}

// console.log("mergeSort ", mergeSort([3, 2, 3, 4, 5, 5, 22, 56, 7, 75, 44]));

function mergeSort(array) {
  function splitArray(tosplit) {
    return [
      tosplit.slice(0, Math.floor(tosplit.length / 2)),
      tosplit.slice(Math.floor(tosplit.length / 2), tosplit.length),
    ];
  }

  // Test combineArrays with two sorted arrays

  //handle case where array is just one element
  if (array.length === 1) {
    return array;
  } else {
    const [arr1, arr2] = splitArray(array);

    const sorted1 = mergeSort(arr1);
    const sorted2 = mergeSort(arr2);

    //put sorted arrays together
    return combineArrays(sorted1, sorted2);
  }
}

// console.log("mergeSort ", mergeSort([3, 2, 3, 4, 5, 5, 22, 56, 7, 75, 44]));

// // quick sort is:
// // if you have <=1 thing, just return it
// // pick a pivot (first element, middle element, etc...)
// // sort everything to either side of the pivot (exclude the pivot)
// // call the function on either side

// // Simple idiomatic quicksort implementation
// function quickSort(arr: number[]): number[] {
//   if (arr.length <= 1) {
//     return arr;
//   }

//   const pivot = arr[Math.floor(arr.length / 2)];
//   const [left, middle, right] = arr.reduce<[number[], number[], number[]]>(
//     ([l, m, r], x) => {
//       if (x < pivot) l.push(x);
//       else if (x === pivot) m.push(x);
//       else r.push(x);
//       return [l, m, r];
//     },
//     [[], [], []]
//   );

//   return [...quickSort(left), ...middle, ...quickSort(right)];
// }

// Test the quickSort function
// const unsortedArray = [3, 2, 3, 4, 5, 5, 22, 56, 7, 75, 44];
// console.log("Unsorted array:", unsortedArray);
// console.log("Sorted array:", quickSort(unsortedArray));

function quickSort(array) {
  if (array.length <= 1) {
    return array;
  }
  let pivot = 0;
  let cursor = 1;
  const l = array.length;
  console.log("initial", array[pivot]);
  while (cursor < array.length) {
    if (array[cursor] <= array[pivot]) {
      const insert = array[cursor];
      array.splice(cursor, 1);
      array.splice(pivot, 0, insert);
      pivot++;
      cursor++;
    } else {
      //   array.splice(pivot + 1, 0, array[cursor]);
      cursor++;
    }
  }
  //   console.log(array);
  return quickSort(array.slice(0, pivot))
    .concat(array[pivot])
    .concat(quickSort(array.slice(pivot + 1, array.length)));
}

// console.log("quickSort ", quickSort([3, 2, 3, 4, 5, 5, 22, 56, 7, 75, 44]));

// Define a complex weighted graph using an adjacency list
const complexWeightedGraph = {
  A: { B: 4, C: 2 },
  B: { A: 4, C: 1, D: 5 },
  C: { A: 2, B: 1, D: 8, E: 10 },
  D: { B: 5, C: 8, E: 2, F: 6 },
  E: { C: 10, D: 2, F: 3 },
  F: { D: 6, E: 3 },
};

function djikstra(graph, starting_node) {
  const nodes = Object.keys(graph);
  const distances = nodes.reduce((acc, node) => {
    acc[node] = Infinity;
    return acc;
  }, {});
  distances[starting_node] = 0;
  let current_node: string = "";
  const visited: Array<string> = [];
  while (visited.length < nodes.length) {
    //find node with smallest finite distance
    const distancesArray = Object.entries(distances).map(([key, value]) => ({
      [key]: value,
    }));
    console.log(
      "distancesArray",
      distancesArray.filter((arr) => !visited.includes(Object.keys(arr)[0]))
    );
    let min = Infinity;
    distancesArray
      .filter((arr) => !visited.includes(Object.keys(arr)[0]))
      .forEach((elt, _) => {
        // console.log("elt", elt, a);
        // console.log(elt, Object.values(elt)[0]);
        if ((Object.values(elt)[0] as number) <= min) {
          min = Object.values(elt)[0] as number;
          current_node = Object.keys(elt)[0];
        }
      });
    // console.log("min", current_node, min);
    //update distances of unvisited neighbors
    const unvisited_neighbors = Object.keys(graph[current_node]).filter(
      (elt) => {
        console.log("elt", elt, visited);
        return !visited.includes(elt);
      }
    );
    console.log("unvisited_neighbors", unvisited_neighbors);
    unvisited_neighbors.forEach((neighbor) => {
      const newdist = graph[current_node][neighbor] + distances[current_node];
      console.log(
        "graphneighbor",
        current_node,
        neighbor,
        graph[current_node][neighbor],
        distances[current_node],
        newdist
      );

      if (newdist < distances[neighbor]) {
        distances[neighbor] = newdist;
        console.log("updated", neighbor, newdist);
      }
    });
    visited.push(current_node);
  }
  return distances;
}

console.log("Djikstra", djikstra(complexWeightedGraph, "B"));

async function binarySearchCallback(
  array: Array<number>,
  term: number,
  leading = 0,
  layer = 0,
  callback: Function,
  complete: Function
) {
  const m = Math.floor((array.length - 1) / 2);
  await callback({ compare: array[m], layer, leading: leading, array: array });
  if (array.length === 0) {
    complete({
      compare: undefined,
      layer: layer,
      leading: leading,
      array: [array[m + leading]],
    });
  }
  if (array[m] < term) {
    binarySearchCallback(
      array.slice(m + 1, array.length),
      term,
      leading + m + 1,
      layer + 1,
      callback,
      complete
    );
  } else if (array[m] > term) {
    binarySearchCallback(
      array.slice(0, m + 1),
      term,
      leading,
      layer + 1,
      callback,
      complete
    );
  } else {
    complete({
      compare: m + leading,
      layer: layer,
      leading: leading,
      array: [array[m]],
    });
  }
}

// binarySearchCallback(
//   [1, 3, 5, 7, 9, 11, 13, 15],
//   5,
//   0,
//   0,
//   (x) => {
//     console.log("callback", x);
//   },
//   (x) => {
//     console.log("complete", x);
//   }
// );
