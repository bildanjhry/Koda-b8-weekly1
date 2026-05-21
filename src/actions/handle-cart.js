import { printing } from "../utils/print-struct.js";
import { rl } from "../services/input.js";
import { backHomeQuestion, eraseQuestion } from "../services/questions.js";
import { eraseCart } from "./choose-item.js";

export let order = 0;

export function handleCart(
   ans, 
   init, 
   shop,
   handleHomeMenu, 
   handleHomeMenuText
) { 
   let result = 0;
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
         rl.question("\n\n    Ingin menggunakan:    \n      1. QRIS\n      2. Tunai?\n\n    input: ", function(tra){
            if(tra === "2"){
               console.log(`\n                       Proses...\n\n\n\n`);
               order += 1;
               setTimeout(() => {
                  printing.struct(shop, result, order, 'Unpaid', 'Tunai', 'Silahkan berikan ini kepada kasir.' );
                  eraseCart();
                  setTimeout(() => {
                     const question = `\n\n\n    Ingin melakukan order kembali (Y/N)\n    Input: `;
                     backHomeQuestion(question);
                  },1000);
               },1500);
            } else if(tra === "1"){
               console.log(`\n                   Proses...`);
               order += 1;
               setTimeout(() => {
                  printing.qrCode();
                  setTimeout(() => {
                     console.log(`\n\n\n\n\n
                        **Pembarayan berhasil**            \n\n\n`);
                     printing.struct(shop, result, order, 'Paid', 'QRIS', 'Silahkan tunggu pesanan anda.' );
                     eraseCart();
                     setTimeout(() => {
                        const question = `\n\n\n    Ingin melakukan order kembali (Y/N)\n    Input: `;
                        backHomeQuestion(question);
                     },1000);
                  },2500);
               },1500);
            }
         });
         break;
      case '2' :
         return rl.question(handleHomeMenuText("hasList"), function(ans){
            handleHomeMenu(ans);
         });
      case '3' :
         { const quest = "\n\n    Silahkan pilih item: ";
            const res = eraseQuestion(quest, eraseCart);
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
               handleHomeMenu('7');
            } 
            eraseCart(res);
         }
         break;
      default: 
      { const err = new Error(`\n\n    *Perintah Salah\n\n`);
         throw err;}
      }
   } catch(err) {
      console.log(err);
      init("hasList");
   }
}
