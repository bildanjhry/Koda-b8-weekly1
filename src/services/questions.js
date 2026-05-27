import { closeQuestion, question } from "./input.js";
import { handleHomeMenu } from "../index.js";
import { shop } from "../actions/choose-item.js";
import { printing } from "../utils/print.js";
const { handleHomeMenuText, checkout } = printing;

// 1. --> init home menu
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

// 2 --> list sub-item to choose
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

// 3. --> confirm if the sub-item will be choosen again
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

// 4. --> checkout, print all item in cart and takes some action against them
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

// 5. --> transaction checkout
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

// 6. --> confirmation for go back to home menu after transaction success
export async function backHomeQuestion(params, actionCallback){
  try {
    const result = await question(params, false);
    actionCallback(result, params, init, handleHomeMenu, handleHomeMenuText, closeQuestion);
  } catch(err){
    console.log(err.message);
    return backHomeQuestion(params, actionCallback); // retry question
  }
}

// confirm which item to be deleted in the cart
export async function eraseQuestion(params, shop, recoverCallback, actionCallback){
  try{
    const result = await question(params);
    return actionCallback(shop, result, recoverCallback);
  } catch(err){
    console.log(err.message);
    return recoverCallback('7');
  }
}
