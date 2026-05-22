import { printing } from "../utils/print.js";
import { rl } from "../services/input.js";
import { backHomeQuestion, checkoutQuestion, eraseQuestion } from "../services/questions.js";
import { eraseCartList } from "./choose-item.js";
import { handleCheckout } from "./handle-checkout.js";

export let order = 0;

export function handleCart(
   ans, 
   init, 
   shop,
   handleHomeMenu, 
   handleHomeMenuText
) { 
   let result = 0;
   const question = `\n\n\n    Ingin melakukan order kembali (Y/N)\n    Input: `;
   
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
         rl.question("\n\n    Ingin menggunakan:    \n      1. QRIS\n      2. Tunai\n\n    Input: ", function(tra){
            switch(tra) {
            case '1':
               console.log(`\n                   Proses...`);
               order += 1;
               setTimeout(() => {
                  printing.qrCode();
                  setTimeout(() => {
                     console.log(`\n\n\n\n\n
                        **Pembarayan berhasil**            \n\n\n`);
                     printing.struct(shop, result, order, 'Paid', 'QRIS', 'Silahkan tunggu pesanan anda.' );
                     eraseCartList();
                     setTimeout(() => {
                        backHomeQuestion(question);
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
         });
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
