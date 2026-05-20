import { createInterface } from "node:readline";

import { handleArr, listItem } from "./utils/list-item.js";
import { chooseItem } from "./actions/choose-item.js";
import { handleCart, shop } from "./actions/handle-cart.js";
import  { initQuestion, closeQuestion }  from "./actions/input.js";
import { handleCheckout } from "./actions/handle-checkout.js";
import { foods, drinks, snacks, paket, happyMeal, desert } from "./datas/index.js";

export const rl = createInterface({
   input: process.stdin,
   output: process.stdout
});

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
   try{
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
         rl.question(handleCheckout(shop), function(inpt){
            handleCart(inpt, init, handleHomeMenu, handleHomeMenuText);
         });
         break;
      default :
      { const err = new Error(`\n\n   *Input anda salah \n`);
         throw err; }
      }
   }catch(err){
      console.log(err);
      init("", handleHomeMenuText, handleHomeMenu);
   }
}

// // pertanyaan awal
// function init(text){
//    const newText = (text ? text : "");
//    return new Promise((resolve, rejected) => {
//       rl.question(handleHomeMenuText(newText), function(ans){
//          handleHomeMenu(ans);
//       });
//    });
// }


async function listQuestion(
   input,
   item, 
   shop, 
   question,
   handleArr, 
   actionCallback
){
   const result = await initQuestion(item, question);
   actionCallback(input, shop, result, item, handleArr);
}


async function init(params, question, actionCallback){
   handleHomeMenuText("");
   const result = await initQuestion(params, question);
   actionCallback(result);
}

init("", handleHomeMenuText, handleHomeMenu);
