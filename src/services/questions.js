import { question, closeQuestion } from "./input.js";
import { handleHomeMenu } from "../index.js";
import { printing } from "../utils/print.js";

const { handleHomeMenuText } = printing;

export async function listQuestion(
   input,
   item, 
   quest,
   handleArr, 
   actionCallback
){
   const result = await question(item, quest);
   actionCallback(input, result, item, handleArr);
}

export async function checkoutQuestion(shop, quest, actionCallback) {
   const result = await question(shop, quest);
   actionCallback(result, init, shop, handleHomeMenu, handleHomeMenuText);
}

export async function backHomeQuestion(params){
   const result = await question(params, false);
   switch(result){
   case 'y':
      init("", handleHomeMenuText, handleHomeMenu);
      break;
   case 'n':
      closeQuestion();
      break;
   default:
      return console.log('Input tidak valid');
   }
}

export async function init(params, quest, actionCallback){
   const result = await question(params, quest);
   actionCallback(result);
}

export async function eraseQuestion(params, actionCallback){
   const result = await question(params);
   actionCallback(result);
}