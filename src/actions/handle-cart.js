import {  eraseQuestion, transactionQuestion } from "../services/questions.js";
import sumTotal from "../utils/sum-total.js";
import { handleTransactions } from "./handle-checkout.js";

function splicingItem(cart, idx){
  cart.map((item, index) => {
    if(index === idx){
      if(item.qty > 1){
        item.qty -= 1;
      } else {
        cart.splice(idx, 1);
      }
    }
  });
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
   
  switch(ans){
  case '1' :
  { const total = sumTotal(shop);
    transactionQuestion(
      tranQuestion, 
      orderQuestion, 
      shop, 
      total, 
      handleTransactions,
      handleCart
    );
    break; } 
  case '2' :
    init("hasList", handleHomeMenuText, handleHomeMenu);
    break;
  case '3' :
    { 
      function eraseCart(res) {
        const idx = parseInt(res)-1;
        splicingItem(shop, idx);

        if(shop.length < 1){
          throw new Error({
            message:`\n\n    *Pesanan kosong\n`,
            problem:'cart is empty',
          });
        } else {
          handleHomeMenu('7');
        }
      } 
      // calling function to delete item in cart
      eraseQuestion("\n\n    Silahkan pilih item: ", eraseCart);
    }
    break;
  default: 
    throw new Error(`\n\n    *Perintah Salah\n\n`);
  };
}
