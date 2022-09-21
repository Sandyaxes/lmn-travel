export const isValidID = (ID) => {
    let valid =
      ID &&
      /^(((\d{2}((0[13578]|1[02])(0[1-9]|[12]\d|3[01])|(0[13456789]|1[012])(0[1-9]|[12]\d|30)|02(0[1-9]|1\d|2[0-8])))|([02468][048]|[13579][26])0229))(( |-)(\d{4})( |-)(\d{3})|(\d{7}))$/.test(
        ID,
      );
    return valid ? idCheckSum(ID) : false;
  }
  
  function idCheckSum(idString) {
    let control = -1;
    try {
      let a = 0;
      for (let i = 0; i < 6; i++) {
        a += parseInt(idString[2 * i]);
      }
  
      let b = 0;
      for (let i = 0; i < 6; i++) {
        b = b * 10 + parseInt(idString[2 * i + 1]);
      }
      b *= 2;
      let bAsString = b.toString();
      let c = 0;
      for (let i = 0; i < bAsString.length; i++) {
        c += parseInt(bAsString[i]);
      }
      c += a;
      control = 10 - (c % 10);
      if (control === 10) control = 0;
    } catch {
      /*ignore*/
    }
    return parseInt(idString.slice(-1)) === control;
  }
