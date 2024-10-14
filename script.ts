function linearSearch(array, term) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === term) {
      return i;
    }
  }
  return;
}

console.log(linearSearch([47, 23, 66, "3", 2, 56, 3], 3));

function binarySearch(array, term) {
  const m = Math.floor((array.length - 1) / 2);
  if (array.length === 0) {
    return;
  }
  if (array[m] < term) {
    return binarySearch(array.slice(m + 1, array.length), term);
  } else if (array[m] > term) {
    return binarySearch(array.slice(0, m + 1), term);
  } else {
    return m;
  }
}
