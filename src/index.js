import { handleArr, listItem } from "./utils/list-item.js";
import { chooseItem } from "./actions/choose-item.js";
import { handleCart } from "./actions/handle-cart.js";
import { getFoods, getDrinks, getSnacks, getPaket, getHappyMeal, getDesert } from "./services/fetch-data.js";
import { init, checkoutQuestion, listQuestion } from "./services/questions.js";
import { shop } from './actions/choose-item.js';
import { printing } from "./utils/print.js";

const { handleHomeMenuText, checkout } = printing;

// request all required datas
const foods = await getFoods();
const drinks = await getDrinks();
const desert = await getDesert();
const snacks = await getSnacks();
const paket = await getPaket();
const happyMeal = await getHappyMeal();

export async function handleHomeMenu(ans) {

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
    if(shop.length < 1){
      throw new Error(`\n\n    *Pilihan tidak tersedia\n`);
    }
    checkoutQuestion(shop, checkout, handleCart);
    break;
  default :
    throw new Error(`\n\n    *Pilihan tidak tersedia\n`); 
  }
}


init("", handleHomeMenuText, handleHomeMenu);
