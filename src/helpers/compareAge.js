export const compareAge = (inputObject, name) => {
  for (let i in inputObject) {
    let arr = Object.values(inputObject[i]);

    if (arr.includes(name)) {
      return arr[1];
    }
  }
};
