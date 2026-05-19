import { createInterface } from "node:readline";

import { handleArr, listItem } from "./utils/list-item.js";
import { chooseItem } from "./actions/choose-item.js";
import { handleCart, shop } from "./actions/handle-cart.js";
import { handleCheckout } from "./actions/handle-checkout.js";
import { foods, drinks, snacks, paket, happyMeal, desert } from "./datas/index.js";

export const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});

const order = 0;

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
      rl.question(listItem(foods), function(text){
        chooseItem('1', shop, text, foods, handleArr);
      });
      break;
    case '2' :
      rl.question(listItem(drinks), function(text){
        chooseItem('2', shop, text, drinks, handleArr);
      });
      break;
    case '3' :
      rl.question(listItem(snacks), function(text){
        chooseItem('3', shop, text, snacks, handleArr);
      });
      break;
    case '4' :
      rl.question(listItem(desert), function(text){
        chooseItem('4', shop, text, desert, handleArr);
      });
      break;
    case '5' :
      rl.question(listItem(paket), function(text){
        chooseItem('5', shop, text, paket, handleArr);
      });
      break;
    case '6' :
      rl.question(listItem(happyMeal), function(text){
        chooseItem('6', shop, text, happyMeal, handleArr);
      });
      break;        
    case '7' :
      rl.question(handleCheckout(shop), function(inpt){
        handleCart(inpt, order, init, handleHomeMenu, handleHomeMenuText);
      });
      break;
    default :
    { const err = new Error(`\n\n   *Input anda salah \n`);
      throw err; }
    }
  }catch(err){
    console.log(err);
    init();
  }
}

// pertanyaan awal
function init(text){
  const newText = (text ? text : "");
  rl.question(handleHomeMenuText(newText), function(ans){
    handleHomeMenu(ans);
  });
}

init();
