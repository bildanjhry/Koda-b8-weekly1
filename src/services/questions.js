import { question, closeQuestion } from "./input.js";
import { handleHomeMenu, handleHomeMenuText } from "../index.js";

export async function listQuestion(
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
      console.log(`${err}`);
      return init("", handleHomeMenuText, handleHomeMenu);
   }
}

export async function checkoutQuestion(shop, quest, actionCallback) {
   const result = await question(shop, quest);
   actionCallback(result, init, handleHomeMenu, handleHomeMenuText);
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

export async function eraseQuestion(params, shop, actionCallback){
   const result = await question(params);
   actionCallback(result);
}