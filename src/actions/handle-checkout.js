import moneyFormat from "../utils/money-format.js";
import sumTotal from "../utils/sum-total.js";

export function handleCheckout(shop){

   const result = sumTotal(shop);
   console.log(`
                Pesanan anda:
                ------------------------------------------`);
   shop?.forEach((val, index) => {
      console.log(`
                ${index+1}. ${val.name}${val?.size ? ', '+val.size : ''}
                   ${val.qty}X
                   Rp${moneyFormat(val.price)[0]},-\n`);
   });
   return `
                                         Total: Rp${moneyFormat(result)[0]},-
                ------------------------------------------
                1. Bayar        2. Kembali        3. Hapus
                
    Input: `;
}