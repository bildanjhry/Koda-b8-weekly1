import { question, closeQuestion } from "./input.js";
import { handleHomeMenu } from "../index.js";
import { printing } from "../utils/print.js";
import { eraseCartList } from "../actions/choose-item.js";
import { handleCheckout } from "../actions/handle-checkout.js";
import { handleCart } from "../actions/handle-cart.js";
const { handleHomeMenuText } = printing;
export let order = 0;

export async function listQuestion(
   input,
   item, 
   quest,
   handleArr, 
   actionCallback
){
   const result = await question(item, quest);
   actionCallback(input, result, item, handleArr);
}

export async function checkoutQuestion(shop, quest, actionCallback) {
   const result = await question(shop, quest);
   actionCallback(result, init, shop, handleHomeMenu, handleHomeMenuText);
}

export async function backHomeQuestion(params){
   const result = await question(params, false);
   switch(result){
   case 'y':
      init("", handleHomeMenuText, handleHomeMenu);
      break;
   case 'n':
      closeQuestion();
      break;
   default:
      console.log(`\n\n    *Perintah salah`);
      return backHomeQuestion(params);
   }
}

export async function init(params, quest, actionCallback){
   const result = await question(params, quest);
   actionCallback(result);
}

export async function eraseQuestion(params, actionCallback){
   const result = await question(params);
   actionCallback(result);
}

export async function orderConQuestion(params, input) {
   const result = await question(params, false);
   const aswr = result.toLowerCase();

   switch(aswr){
   case 'y' :
      return handleHomeMenu(input); 
   case 'n' :
      return init('hasList', handleHomeMenuText, handleHomeMenu);
   default :
      console.log(`\n\n       **Perintah salah\n`);
      return orderConQuestion(params, input);
   }
    
}

export async function transactionQuestion(params, orderQuestion, shop, resultOrder) {
   const result = await question(params, false);
   switch(result) {
   case '1':
      console.log(`\n                   Proses...`);
      order += 1;
      setTimeout(() => {
         printing.qrCode();
         setTimeout(() => {
            console.log(`\n\n\n\n\n
                        **Pembarayan berhasil**            \n\n\n`);
            printing.struct(shop, resultOrder, order, 'Paid', 'QRIS', 'Silahkan tunggu pesanan anda.' );
            eraseCartList();
            setTimeout(() => {
               backHomeQuestion(orderQuestion);
            },1000);
         },2500);
      },1500);
      break;
   case '2':
      console.log(`\n                       Proses...\n\n\n\n`);
      order += 1;
      setTimeout(() => {
         printing.struct(shop, result, order, 'Unpaid', 'Tunai', 'Silahkan berikan ini kepada kasir.' );
         eraseCartList();
         setTimeout(() => {
            backHomeQuestion(question);
         },1000);
      },1500);
      break;
   default :
      console.log(`\n\n    *Perintah Salah\n\n`);
      checkoutQuestion(shop, handleCheckout, handleCart);
   };

}