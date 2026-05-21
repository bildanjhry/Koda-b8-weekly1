import moneyFormat from "../utils/money-format.js";

export function handleCheckout(shop){
   let result = 0;
   shop.forEach((val) => {
      if(val.qty > 1){
         result += (val.price * val.qty);
      }
      else {
         result += val.price;
      }
   });
   console.log(`
                Pesanan anda:
                ------------------------------------------`);
   shop.forEach((val, index) => {
      console.log(`
                ${index+1}. ${val.name}${val?.size ? ', '+val.size : ''}
                   ${val.qty}X
                   Rp${moneyFormat(val.price)[0]},-\n`);
   });
   return `
                                         Total: Rp${moneyFormat(result)[0]},-
                ------------------------------------------
                1.Bayar         2.kembali          3.Hapus
                
    Input: `;
}