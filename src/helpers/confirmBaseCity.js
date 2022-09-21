export const confirmBaseCity = (inputObject, arrayValues) => {
    for(let i in inputObject){
      let arr = Object.values(inputObject[i]);
  
      const multipleExist = arrayValues.every(value => {
        return arr.includes(value);
      });
  
      if(multipleExist){
        return true
        // alert("dddd")
      }
    }
  }