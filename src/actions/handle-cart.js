import {  checkoutQuestion, eraseQuestion, transactionQuestion } from "../services/questions.js";
import { handleCheckout } from "./handle-checkout.js";

export function handleCart(
   ans, 
   init, 
   shop,
   handleHomeMenu, 
   handleHomeMenuText
) { 
   let result = 0;
   const orderQuestion = `\n\n\n    Ingin melakukan order kembali (Y/N)\n    Input: `;
   const tranQuestion = "\n\n    Ingin menggunakan:    \n      1. QRIS\n      2. Tunai\n\n    Input: ";
   try{
      switch(ans){
      case '1' :
         shop.forEach((val) => {
            if(val.qty > 1){
               result += (val.price * val.qty);
            }
            else {
               result += val.price;
            }
         });
         transactionQuestion(tranQuestion, orderQuestion, shop, result);
         break; 
      case '2' :
         init("hasList", handleHomeMenuText, handleHomeMenu);
         break;
      case '3' :
         { const quest = "\n\n    Silahkan pilih item: ";
            function eraseCart(res) {
               const idx = parseInt(res)-1;
               shop.map((item, index) => {
                  if(index === idx){
                     if(item.qty > 1){
                        item.qty -= 1;
                     } else {
                        shop.splice(idx, 1);
                     }
                  }
               });
               if(shop.length < 1){
                  console.log(`\n\n    *Pesanan kosong\n`);
                  return init("", handleHomeMenuText, handleHomeMenu);
               } else {
                  handleHomeMenu('7');
               }
            } 
            eraseQuestion(quest, eraseCart);
         }
         break;
      default: 
         throw new Error();
      };
   } catch(err) {
      console.log(`\n\n    *Perintah Salah\n\n`);
      return checkoutQuestion(shop, handleCheckout, handleCart);
   }
}
