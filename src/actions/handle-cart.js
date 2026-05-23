import {  checkoutQuestion, eraseQuestion, transactionQuestion } from "../services/questions.js";
import { handleCheckout } from "./handle-checkout.js";
import { eraseCartList } from "./choose-item.js";
import { printing } from "../utils/print.js";
import { backHomeQuestion } from "../services/questions.js";
import sumTotal from "../utils/sum-total.js";
let order = 0;

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

function handleTransactions(result, shop, orderQuestion, resultOrder){
   const {qrCode, struct} = printing;

   switch(result) {
   case '1':
      console.log(`\n                   Proses...`);
      order += 1;
      setTimeout(() => {
         qrCode();
         setTimeout(() => {
            console.log(`\n\n\n\n\n
                        **Pembarayan berhasil**            \n\n\n`);
            struct(shop, resultOrder, order, 'Paid', 'QRIS', 'Silahkan tunggu pesanan anda.' );
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
         struct(shop, resultOrder, order, 'Unpaid', 'Tunai', 'Silahkan berikan ini kepada kasir.' );
         eraseCartList();
         setTimeout(() => {
            backHomeQuestion(orderQuestion);
         },1000);
      },1500);
      break;
   default :
      console.log(`\n\n    *Perintah Salah\n\n`);
      checkoutQuestion(shop, handleCheckout, handleCart);
   };
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
         transactionQuestion(tranQuestion, orderQuestion, shop, total, handleTransactions);
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
                     message: `\n\n    *Pesanan kosong\n`,
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
   } catch({message, problem}) {
      console.log(message);

      if(problem === 'cart is empty'){
         init("", handleHomeMenuText, handleHomeMenu);
      } else{
         checkoutQuestion(shop, handleCheckout, handleCart);
      }
   }
}
