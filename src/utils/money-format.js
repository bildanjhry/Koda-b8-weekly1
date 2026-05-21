export default function moneyFormat(valMoney){
   const money = `${valMoney}`;
   const strMoney = money.split("");
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
