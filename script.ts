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
