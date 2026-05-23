import {  checkoutQuestion, eraseQuestion, transactionQuestion } from "../services/questions.js";
import { handleCheckout } from "./handle-checkout.js";

function sumTotal(cart){
   let result = 0;
   cart.forEach((val) => {
      if(val.qty > 1){
         result += (val.price * val.qty);
      }
      else {
         result += val.price;
      }
   });
   return result;
}

export function handleCart(
   ans, 
   init, 
   shop,
   handleHomeMenu, 
   handleHomeMenuText
) { 
   
   const orderQuestion = `\n\n\n    Ingin melakukan order kembali (Y/N)\n    Input: `;
   const tranQuestion = "\n\n    Ingin menggunakan:    \n      1. QRIS\n      2. Tunai\n\n    Input: ";
   
   try{
      switch(ans){
      case '1' :
      { const total = sumTotal(shop);
         transactionQuestion(tranQuestion, orderQuestion, shop, total);
         break; } 
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
                  throw new Error({
                     message: `\n\n    *Pesanan kosong\n`,
                     problem:'cart is empty',
                  });
               } else {
                  handleHomeMenu('7');
               }
            } 
            // call fucntion to delete item in cart
            eraseQuestion(quest, eraseCart);
         }
         break;
      default: 
         throw new Error(`\n\n    *Perintah Salah\n\n`);
      };
   } catch({message, problem}) {
      console.log(message);

      if(problem === 'cart is empty'){
         init("", handleHomeMenuText, handleHomeMenu);
      } else{
         checkoutQuestion(shop, handleCheckout, handleCart);
      }
   }
}
