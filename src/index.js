import { handleArr, listItem } from "./utils/list-item.js";
import { chooseItem } from "./actions/choose-item.js";
import { handleCart } from "./actions/handle-cart.js";
import { handleCheckout } from "./actions/handle-checkout.js";
import { foods, drinks, snacks, paket, happyMeal, desert } from "./datas/index.js";
import { init, checkoutQuestion, listQuestion } from "./services/questions.js";
import { shop } from './actions/choose-item.js';

export function handleHomeMenuText(stat){
 
   if(stat === 'hasList'){
      return `
    Home Menu:

    1. Makan
    2. Minum
    3. Snacks 
    4. Desert
    5. Paket
    6. Happy Meal
    -------------------------
    7. Checkout
    
    input: `;
   }
   return `
    **----------- Selamat datang di McD ----------**
    
    Home Menu:

    1. Makan
    2. Minum
    3. Snacks 
    4. Desert
    5. Paket
    6. Happy Meal
    
    input:  `;
}

// handle menu utama
export function handleHomeMenu(ans) {
   switch(ans){
   case '1' :
      listQuestion('1', foods, listItem, handleArr, chooseItem);
      break;
   case '2' :
      listQuestion('2', drinks, listItem, handleArr, chooseItem);
      break;
   case '3' :
      listQuestion('3', snacks, listItem, handleArr, chooseItem);
      break;
   case '4' :
      listQuestion('4', desert, listItem, handleArr, chooseItem);
      break;
   case '5' :
      listQuestion('5', paket, listItem, handleArr, chooseItem);
      break;
   case '6' :
      listQuestion('6', happyMeal, listItem, handleArr, chooseItem);
      break;        
   case '7' :
      checkoutQuestion(shop, handleCheckout, handleCart);
      break;
   default :
      return false;
   }
}


init("", handleHomeMenuText, handleHomeMenu);
