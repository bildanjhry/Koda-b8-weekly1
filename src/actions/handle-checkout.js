import { closeQuestion } from "../services/input.js";
import { backHomeQuestion } from "../services/questions.js";
import { printing } from "../utils/print.js";
import { eraseCartList } from "./choose-item.js";

let order = 0;

function confirmBackHome(
   result, 
   params, init, 
   handleHomeMenu, handleHomeMenuText
){
   switch(result){
   case 'y':
      init("", handleHomeMenuText, handleHomeMenu);
      break;
   case 'n':
      closeQuestion();
      break;
   default:
      throw new Error(`\n\n    *Perintah salah`);
   }
}

export function handleTransactions(
   result, 
   shop, 
   orderQuestion, 
   resultOrder
){
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
            // printing struct
            struct(shop, 
               resultOrder, 
               order, 
               'Paid', 
               'QRIS', 
               'Silahkan tunggu pesanan anda.' );
            eraseCartList(); // reset cart back to empty
            setTimeout(() => {
               backHomeQuestion(orderQuestion, confirmBackHome);
            },1000);
         },2500);
      },1500);
      break;
   case '2':
      console.log(`\n                       Proses...\n\n\n\n`);
      order += 1;
      setTimeout(() => {
         // print struct
         struct(shop, 
            resultOrder, 
            order, 
            'Unpaid', 
            'Tunai', 
            'Silahkan berikan ini kepada kasir.' );
         eraseCartList(); // reset cart bact to empty
         setTimeout(() => {
            backHomeQuestion(orderQuestion, confirmBackHome);
         },1000);
      },1500);
      break;
   default : 
      throw new Error(`\n\n    *Perintah Salah\n\n`);
   };
}