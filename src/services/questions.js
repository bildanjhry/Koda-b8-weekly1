import { question } from "./input.js";
import { handleHomeMenu } from "../index.js";
import { shop } from "../actions/choose-item.js";
import { printing } from "../utils/print.js";
const { handleHomeMenuText, checkout } = printing;

// 1. --> init home menu
export async function init(params, quest, actionCallback){
  try{
    const result = await question(params, quest);
    await actionCallback(result);
  } catch(err){
    console.log(err.message);

    // retry question
    if(shop.length > 0){
      return init(params, quest, actionCallback);
    } else {
      return init(params, quest, actionCallback);
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
){
  try{
    const result = await question(item, quest);
    actionCallback(input, result, item, handleArr);

  } catch(err){
    console.log(err.message);
    return handleHomeMenu(input);
  }
}

// 3. --> confirm if the sub-item will be choosen again
export async function orderConfirmQuestion(params, input, actionCallback) {
  const result = await question(params, false);
  const aswr = result.toLowerCase();
  try {
    actionCallback(aswr, input, params, init);
  } catch(err){
    console.log(err.message);
    return orderConfirmQuestion(params, input, actionCallback); //retry question
  }
}

// 4. --> checkout, print all item in cart and takes some action against them
export async function checkoutQuestion(shop, quest, actionCallback) {
  try {
    const result = await question(shop, quest);
    actionCallback(result, init, shop, handleHomeMenu, handleHomeMenuText);
  } catch({message, problem}){
    console.log(message);

    if(problem === 'cart is empty'){
      return init("", handleHomeMenuText, handleHomeMenu);
    } else{
      return checkoutQuestion(shop, quest, actionCallback);
    }
  }
}

// 5. --> transaction checkout
export async function transactionQuestion(
  params, 
  orderQuestion, 
  shop, 
  resultOrder, 
  actionCallback,
  errCallback
){
  try{
    const result = await question(params, false);
    actionCallback(result, shop, orderQuestion, resultOrder);

  } catch(err) {
    console.log(err.message);
    return checkoutQuestion(shop, checkout, errCallback);
  }
}

// 6. --> confirmation for go back to home menu after transaction success
export async function backHomeQuestion(params, actionCallback){
  try {
    const result = await question(params, false);
    actionCallback(result, params, init, handleHomeMenu, handleHomeMenuText);
  } catch(err){
    console.log(err.message);
    return backHomeQuestion(params, actionCallback); // retry question
  }
}

// confirm which item to be deleted in the cart
export async function eraseQuestion(params, actionCallback){
  const result = await question(params);
  return actionCallback(result);
}
