function linearSearch(array, term) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === term) {
      return i;
    }
  }
  return;
}

console.log(linearSearch([47, 23, 66, "3", 2, 56, 3], 3));
