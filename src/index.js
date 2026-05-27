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

/**
 * The main home menu.
 * 
 * Function will get call and handle the main menu when the application start running, this function has
 * switch case program that will call another function and send parameters based on user input
 * 
 * @param {string} ans
 * Will take the input from user using readline cli
 * 
 * @throws {Error}
 * will throws some error if the parameter does not matches any cases
 * 
 * @returns {void} 
 */

export function handleHomeMenu(ans) {

  switch(ans){
  case '1' :
    listQuestion('1', foods, listItem, handleArr, chooseItem, handleHomeMenu);
    break;
  case '2' :
    listQuestion('2', drinks, listItem, handleArr, chooseItem, handleHomeMenu);
    break;
  case '3' :
    listQuestion('3', snacks, listItem, handleArr, chooseItem, handleHomeMenu);
    break;
  case '4' :
    listQuestion('4', desert, listItem, handleArr, chooseItem, handleHomeMenu);
    break;
  case '5' :
    listQuestion('5', paket, listItem, handleArr, chooseItem, handleHomeMenu);
    break;
  case '6' :
    listQuestion('6', happyMeal, listItem, handleArr, chooseItem, handleHomeMenu);
    break;        
  case '7' :
    if(shop.length < 1){
      throw new Error(`\n\n    *Pilihan tidak tersedia\n`);
    }
    checkoutQuestion(shop, checkout, handleCart);
    break;
  default :
  { throw new Error(`\n\n    *Pilihan tidak tersedia\n`);} 

  }
}

/**
 * Initilize program.
 * 
 * The first function that get called when aplication starts running.
 * 
 * @param {string} ""
 * Default empty string as a params to do first initialize
 * 
 * @param {Function} handleHomeMenuText
 * A callback function that will get send and returning questions for CLI.
 * 
 * @param {Function} handleHomeMenu
 * A callback function that will do the actions after user input get received.
 */

init("", handleHomeMenuText, handleHomeMenu);
