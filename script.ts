function linearSearch(array, term) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === term) {
      return i;
    }
  }
  return;
}

console.log(linearSearch([47, 23, 66, "3", 2, 56, 3], 3));

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
    return binarySearch(array.slice(0, m + 1), term, 0);
  } else {
    return m + leading;
  }
}

console.log(binarySearch([2, 3, 23, 47, 47, 56, 66], 47));

// Define a tree as a list of lists
const tree = [
  {
    value: 1,
    children: [
      { value: 2, children: [{ value: 5, children: [] }] },
      { value: 3, children: [{ value: 6, children: [] }] },
      { value: 3, children: [] },
    ],
  },
  {
    value: 1,
    children: [
      { value: 2, children: [{ value: 5, children: [] }] },
      { value: 3, children: [{ value: 6, children: [] }] },
      { value: 4, children: [] },
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
console.log(depthFirstSearch(tree, 4));

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

console.log(breadthFirstSearch(tree, 4));

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

console.log(bubbleSort([3, 2, 3, 4, 5, 5, 22, 56, 7, 75, 44]));

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

console.log(selectionSort([3, 2, 3, 4, 5, 5, 22, 56, 7, 75, 44]));
