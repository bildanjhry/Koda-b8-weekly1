import { eraseQuestion, init, transactionQuestion } from "../services/questions.js";
import sumTotal from "../utils/sum-total.js";
import { handleTransactions } from "./handle-checkout.js";
import { printing } from "../utils/print.js";
const { handleHomeMenuText } = printing;

export function splicingItem(cart, idx){
  if(!(Array.isArray(cart))){
    throw new Error(`\n\n    *Cart as parameter splicingItem() must be an array`);
  }
  if(cart.length < 1){
    throw new Error(`\n\n    *Cart as paramter splicingItem() can not be empty array`);
  }
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

export function eraseCart(shop, res, handleHomeMenu) {
  
  if(!(Array.isArray(shop))){
    throw new Error(`\n\n    *Cart as parameter should be an array`);
  }
  if(shop.length < 1){
    throw new Error(`\n\n    *Pesanan kosong\n`);
  }    
  if(shop.length < res || isNaN(res)){
    throw new Error(`\n\n    *Item tidak ada\n`);
  }
 
  const idx = parseInt(res)-1;
  splicingItem(shop, idx);
  if(shop.length < 1){
    init("", handleHomeMenuText, handleHomeMenu);
  } else{
    handleHomeMenu('7');
  }
};

export function handleCart(
  ans, 
  init, 
  shop,
  handleHomeMenu, 
  handleHomeMenuText
) { 
  
  if(!(Array.isArray(shop))){
    throw new Error(`\n\n    *Cart as parameter should be an array`);
  }
  if(shop.length < 1){
    throw new Error(`\n\n    *Pesanan kosong\n`);
  }

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
      handleCart,
    );
    break; } 
  case '2' :
    init("hasList", handleHomeMenuText, handleHomeMenu);
    break;
  case '3' :
    // calling function to delete item in cart
    eraseQuestion("\n\n    Silahkan pilih item: ", shop, handleHomeMenu, eraseCart);
    break;
  default: 
    throw new Error(`\n\n    *Perintah Salah\n\n`);
  };
}
