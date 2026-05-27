import { backHomeQuestion } from "../services/questions.js";
import { printing } from "../utils/print.js";
import { eraseCartList } from "./choose-item.js";
const {qrCode, struct} = printing;
let order = 0;

export function confirmBackHome(
  result, 
  params, 
  init, 
  handleHomeMenu, 
  handleHomeMenuText,
  closeQuestion
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

export function transactionActions(shop, resultOrder, orderQuestion){
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
}

export function handleTransactions(
  result, 
  shop, 
  orderQuestion, 
  resultOrder,
  transactionActions
){

  if(!(Array.isArray(shop))){
    throw new Error(`\n\n    *Cart as parameter should be an array`);
  }
  if(shop.length < 1){
    throw new Error(`\n\n    *Cart can not be empty before doing transactions`);
  }

  if((resultOrder - 10) <= 90){
    throw new Error(`\n\n    *Total must be more than 2 digit before doing transactions`);
  }

  switch(result) {
  case '1':
    transactionActions(shop, resultOrder, orderQuestion);
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