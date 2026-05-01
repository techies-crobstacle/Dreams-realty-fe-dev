  /**
* Returns a number in Indian numbering system as a String
*
* @param {Number/String} number The integer to be converted.
* @param {Number} decimals The number of digits needed after decimal point.
* @return {String} Converted number as a String in Indian numbering unit.
*/

export const changeNumberFormat = (number, decimals, recursiveCall) => {
    const decimalPoints = decimals || 2;
    if(number >100000){
    const noOfLakhs = number / 100000;
    let displayStr;
    let isPlural;

    // Rounds off digits to decimalPoints decimal places
    function roundOf(integer) {
      return +integer.toLocaleString(undefined, {
        minimumFractionDigits: decimalPoints,
        maximumFractionDigits: decimalPoints,
      });
    }

    if (noOfLakhs >= 1 && noOfLakhs <= 99) {
      const lakhs = roundOf(noOfLakhs);
      isPlural = lakhs > 1 && !recursiveCall;
      displayStr = `${lakhs} Lakh${isPlural ? 's' : ''}`;
    } else if (noOfLakhs >= 100) {
      const crores = roundOf(noOfLakhs / 100);
      const crorePrefix = crores >= 100000 ? changeNumberFormat(crores, decimals, true) : crores;
      isPlural = crores > 1 && !recursiveCall;
      // displayStr = `${crorePrefix} Crore${isPlural ? 's' : ''}`;
      displayStr = `${crorePrefix} Cr`;
    } else {
      displayStr = roundOf(+number);
    }

    return displayStr;
  }else{
    return number
  }
  }