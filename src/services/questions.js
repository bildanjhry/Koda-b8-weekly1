import { closeQuestion, question } from "./input.js";
import { handleHomeMenu } from "../index.js";
import { shop } from "../actions/choose-item.js";
import { printing } from "../utils/print.js";
const { handleHomeMenuText, checkout } = printing;


/**
 * 1. Home menu
 * 
 * First function that get call when application starts running and becomes main service
 * for the program at first time. This function will handle few thing:
 * - Asking user using CLI
 * - Do action after answer get recived
 * - Catch error from action callback and print it
 * - Do recover if after error happend
 * @async
 * 
 * @param {string} params 
 * Parameter for quest function
 * 
 * @param {Function} quest 
 * A callback function that will printing the question for CLI
 * 
 * @param {Function} actionCallback 
 * Do the action after input from user get received
 * 
 * @param {Function} recoverCallback 
 * Do recover if something went wrong
 * 
 * @param {Function} ask
 * Question handler function 
 * 
 * @returns {Promise<void>}
 * 
 */
export async function init(
  params, 
  quest, 
  actionCallback,
  recoverCallback = init,
  ask = question
){
  try{
    if(typeof actionCallback !== 'function'){
      throw new Error(`\n\n   *Action callback must be a function`);
    }
    const result = await ask(params, quest);
    await actionCallback(result);
  } catch(err){
    console.log(err.message);

    // retry question
    if(shop.length > 0){
      return recoverCallback(params, handleHomeMenuText, handleHomeMenu);
    } else {
      return recoverCallback("", handleHomeMenuText, handleHomeMenu);
    }
  }
}

/** 2. Items list
 * Second service that will asking which item that will get choose.
 * This function also has the same pattern as the first function 
 * @async
 * 
 * @param {string} input
 * Receive an input from user to get process later
 *  
 * @param {Array} item 
 * An array of object that includes all the choosen items
 * 
 * @param {Function} quest
 * A callback function that will returning a question that will display in CLI
 *  
 * @param {Function} handleArr 
 * A callback function that will process an array for merging if the value has different format
 *  
 * @param {Function} actionCallback 
 * A callback function for proccesing the action
 * 
 * @param {Function} recoverCallback
 * A callback function for recovering if error happend
 *  
 * @param {Function} ask 
 * Question handler function
 * 
 * @returns {Promise<void>}
 * 
 */
export async function listQuestion(
  input,
  item, 
  quest,
  handleArr, 
  actionCallback,
  recoverCallback,
  ask = question
){
  try{
    const result = await ask(item, quest);
    await actionCallback(input, result, item, handleArr);

  } catch(err){
    console.log(err.message);
    return recoverCallback(input);
  }
}

/**
 * 3. Confirm another order
 * This function will handle to confirming if user want to take another order
 * from the items list
 * 
 * @param {string} input
 * Receive an input from user to get process later
 *  
 * @param {string} params
 * A grup of string that will get passing to readline questions
 * 
 * @param {Function} actionCallback 
 * A callback function for proccesing the action
 * 
 * @param {Function} recoverCallback
 * A callback function for recovering if error happend
 *  
 * @returns {recoverCallback} 
 * this will return recover callback if any error being thrown
 * 
 * @returns {Promise<void>}
 */
export async function orderConfirmQuestion(
  params, 
  input, 
  actionCallback,
  ask = question,
  recoverCallback = orderConfirmQuestion
) {
  const result = await ask(params, false);
  const aswr = result.toLowerCase();
  try {
    await actionCallback(aswr, input, params, init);
  } catch(err){
    console.log(err.message);
    return recoverCallback(params, input, actionCallback); //retry question
  }
}

/** 4. Checkout Action
 * This function will handle checkout program that will  displaying all item
 * in cart adn has few options, in order:
 * - Transaction
 * - Go Back
 * - Delete item
 * 
 * @param {Array} shop
 * An array that represent a cart
 *  
 * @param {Function} quest
 * A callback function that will returning a question that will display in CLI
 *  
 * @param {Function} actionCallback 
 * A callback function for proccesing the action
 * 
 * @param {Function} recoverCallback
 * A callback function for recovering if error happend
 * 
 * @returns {Promise<void>}
 * 
*/
export async function checkoutQuestion(
  shop, 
  quest, 
  actionCallback,
  ask = question,
  recoverCallback = checkoutQuestion
) {
  try {
    const result = await ask(shop, quest);
    await actionCallback(result, init, shop, handleHomeMenu, handleHomeMenuText);
  } catch(err){
    console.log(err.message);
    return recoverCallback(shop, quest, actionCallback);
  }
}

/** 5. Transcaction Action
 * This function will handle transaction after option in checkout choosen to do transaction
 * and this function has same concept that will catch an error if action callback throwing it
 * 
 * @param {Array} shop
 * An array that represent a cart
 *  
 * @param {string} params
 * A grup of string that will get pass to readline CLI as a question
 *  
 * @param {Function} orderQuestion
 * A grup of string that will get pass to realine CLI as a aquestion
 * 
 * @param {Function} actionCallback 
 * A callback function for proccesing the action
 * 
 * @param {Function} errCallback
 * A callback function that will get pass in action callback for recovering if error happend
 *
 * @returns {Promise<void>}
 * 
*/
export async function transactionQuestion(
  params, 
  orderQuestion, 
  shop, 
  resultOrder, 
  actionCallback,
  errCallback,
  transactionActions,
){
  try{
    const result = await question(params, false);
    actionCallback(result, shop, orderQuestion, resultOrder, transactionActions);

  } catch(err) {
    console.log(err.message);
    return checkoutQuestion(shop, checkout, errCallback);
  }
}

/** 6. Confirm for go back home
 * This function will handle if user want to go home menu for another order or end
 * the procces. This function also can catch an error from action callback
 * @async
 * 
 * @param {string} params
 * A grup of string that will get pass to readline CLI as a question
 *  
 * @param {Function} actionCallback 
 * A callback function for proccesing the action
 * 
 * @returns {Promise<void>}
*/
export async function backHomeQuestion(params, actionCallback){
  try {
    const result = await question(params, false);
    actionCallback(result, params, init, handleHomeMenu, handleHomeMenuText, closeQuestion);
  } catch(err){
    console.log(err.message);
    return backHomeQuestion(params, actionCallback); // retry question
  }
}

/** 7. Confirm which item user want to delete in a cart
 * This function will handle if user want to delete some item at checkout opstion
 * This function also can catch an error from action callback
 * 
 * @param {string} params
 * A grup of string that will get pass to readline CLI as a question
 *  
 * @param {Array} shop
 * An array that representing the cart
 * 
 * @param {Function} actionCallback 
 * A callback function for proccesing the action
 * 
 * @param {Function} recoverCallback
 * A callback function for recovering if error happend
*/
export async function eraseQuestion(params, shop, recoverCallback, actionCallback){
  try{
    const result = await question(params);
    return actionCallback(shop, result, recoverCallback);
  } catch(err){
    console.log(err.message);
    return recoverCallback('7');
  }
}
