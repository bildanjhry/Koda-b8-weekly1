import { handleArr, listItem } from "./utils/list-item.js";
import { chooseItem } from "./actions/choose-item.js";
import { handleCart, shop } from "./actions/handle-cart.js";
import { question, closeQuestion }  from "./actions/input.js";
import { handleCheckout } from "./actions/handle-checkout.js";
import { foods, drinks, snacks, paket, happyMeal, desert } from "./datas/index.js";

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
         listQuestion('1', foods, shop, listItem, handleArr, chooseItem);
         break;
      case '2' :
         listQuestion('2', drinks, shop, listItem, handleArr, chooseItem);
         break;
      case '3' :
         listQuestion('3', snacks, shop, listItem, handleArr, chooseItem);
         break;
      case '4' :
         listQuestion('4', desert, shop, listItem, handleArr, chooseItem);
         break;
      case '5' :
         listQuestion('5', paket, shop, listItem, handleArr, chooseItem);
         break;
      case '6' :
         listQuestion('6', happyMeal, shop, listItem, handleArr, chooseItem);
         break;        
      case '7' :
         checkoutQuestion(shop, handleCheckout, handleCart)
         break;
      default :
         const err = ` *Pilihan tidak tersedia \n`
         return err; 
      }
}

async function listQuestion(
   input,
   item, 
   shop, 
   quest,
   handleArr, 
   actionCallback
){
   try{
      const result = await question(item, quest);
      actionCallback(input, shop, result, item, handleArr);

   } catch(err){
      console.log(`${err}`)
      return init("", handleHomeMenuText, handleHomeMenu);
   }
}

async function checkoutQuestion(shop, quest, actionCallback) {
   const result = await question(shop, quest)
   actionCallback(result, init, handleHomeMenu, handleHomeMenuText);
}

export async function init(params, quest, actionCallback){
   const result = await question(params, quest);
   actionCallback(result);
}

init("", handleHomeMenuText, handleHomeMenu);
