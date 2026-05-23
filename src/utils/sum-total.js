export default function sumTotal(cart){
   let result = 0;
   cart?.forEach((val) => {
      if(val.qty > 1){
         result += (val.price * val.qty);
      }
      else {
         result += val.price;
      }
   });
   return result;
}