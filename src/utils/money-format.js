
/**
 * Format number into Indonesian-style money string.
 *
 * This function:
 * - validates input must be a positive number
 * - converts number into string format
 * - inserts dot separators based on digit length
 *
 * @param {number} valMoney
 * Raw numeric value of money.
 *
 * @throws {Error} If valMoney is not a number.
 * 
 * @throws {Error} If valMoney is less than 1.
 * 
 * @throws {Error} If valMoney has less than 3 digits.
 *
 * @returns {[string, number]} Formatted money string and original value.
 */
export default function moneyFormat(valMoney){
  if(typeof valMoney !== "number"){
    throw new Error(`\n\n   *Oppps parameter moneyFormat must be a number`);
  }
  if(valMoney < 1){
    throw new Error(`\n\n   *Oppps parameter moneyFormat must greater then 0`);
  }

  const money = `${valMoney}`;
  const strMoney = money.split("");

  if(strMoney.length < 3){
    throw new Error(`\n\n   *Money total should more then 2 digit Before formating money`);
  }

  const digit = strMoney.length;
   
  switch(digit){
  case 4 :
    strMoney.splice(1,0, '.');
    return [strMoney.join(""), valMoney];
  case 5 :
    strMoney.splice(2, 0, '.');
    return [strMoney.join(""), valMoney];
  case 6 :
    strMoney.splice(3, 0, '.');
    return [strMoney.join(""), valMoney];
  case 7 :
    strMoney.splice(1, 0, '.');
    strMoney.splice(5, 0, '.');
    return [strMoney.join(""), valMoney];
  default:
    return [`${valMoney}`, valMoney];
  }
}
