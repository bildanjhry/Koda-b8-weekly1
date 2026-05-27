import { backHomeQuestion } from "../services/questions.js";
import { printing } from "../utils/print.js";
import { eraseCartList } from "./choose-item.js";
const {qrCode, struct} = printing;
let order = 0;

/**
 * Asking user if want to go back home
 * 
 * @param {string} result
 * A result from user after questions been asked.
 * 
 * @param {string} params
 * A grup of string that will get pass to readline CLI as a question
 *  
 * @typedef {function} init
 * Callback function for go back to home menu
 * 
 * @param {Function} handleHomeMenuText
 * Callback function for init's parameter
 * 
 * @param {Function} handleHomeMenu
 * Callback function for init's parameter
 * 
 * @param {Function} closeQuestion
 * Callback function for closing the program
 * 
 * @throws
 * this will throws an err if user's input does not matches any cases
 * 
 */
export function confirmBackHome(
  result, 
  params, 
  init, 
  handleHomeMenu, 
  handleHomeMenuText,
  closeQuestion
){
  switch(result){
  case 'y':
    init("", handleHomeMenuText, handleHomeMenu);
    break;
  case 'n':
    closeQuestion();
    break;
  default:
    throw new Error(`\n\n    *Perintah salah`);
  }
}

/**
 * Handle QRIS payment transaction flow.
 * 
 * This function:
 * - displays QR code payment
 * - prints transaction receipt
 * - clears cart data
 * - redirects user back to home menu
 *
 * @param {Array} shop
 * Cart
 * @param {number} resultOrder 
 * Total in a cart
 * 
 * @param {String} orderQuestion 
 * A grup of string that will pass a parameter
 * 
 * @param {object} deps 
 * Injected dependencies.
 * 
 * @param {Function} deps.qrCode  
 * Function for displaying QR code
 * 
 * @param {Function} deps.struct 
 * Function for printing receipt struct
 * 
 * @param {Function} deps.eraseCartList 
 * Function for clearing cart
 * 
 * @param {Function} deps.backHomeQuestion 
 * Function for returning to home menu
 * 
 * @param {Function} deps.setTimeout 
 * Timeout function dependency.
 *
 * @returns {void}
 */
export function transactionActionsQris(
  shop, 
  resultOrder, 
  orderQuestion,
  deps = {
    qrCode,
    struct,
    eraseCartList,
    backHomeQuestion,
    setTimeout
  }
){
  console.log(`\n                   Proses...`);
  order += 1;
  deps.setTimeout(() => {
    deps.qrCode();
    deps.setTimeout(() => {
      console.log(`\n\n\n\n\n
                        **Pembarayan berhasil**            \n\n\n`);
      // printing struct
      deps.struct(shop, 
        resultOrder, 
        order, 
        'Paid', 
        'QRIS', 
        'Silahkan tunggu pesanan anda.' );
      deps.eraseCartList(); // reset cart back to empty
      deps.setTimeout(() => {
        deps.backHomeQuestion(orderQuestion, confirmBackHome);
      },1000);
    },2500);
  },1500);
}

/**
 * Handle Cash payment transaction flow.
 * 
 * This function:
 * - prints transaction receipt
 * - clears cart data
 * - redirects user back to home menu
 *
 * @param {Array} shop
 * Cart
 * 
 * @param {number} resultOrder 
 * Total in a cart
 * 
 * @param {String} orderQuestion 
 * A grup of string that will pass a parameter
 * 
 * @param {object} deps 
 * Injected dependencies.
 * 
 * @param {Function} deps.struct 
 * Function for printing receipt struct
 * 
 * @param {Function} deps.eraseCartList 
 * Function for clearing cart
 * 
 * @param {Function} deps.backHomeQuestion 
 * Function for returning to home menu
 * 
 * @param {Function} deps.setTimeout 
 * Timeout function dependency.
 *
 * @returns {void}
 */
export function transactionActionsCash(
  shop, 
  resultOrder, 
  orderQuestion,
  deps = {
    struct,
    eraseCartList,
    backHomeQuestion,
    setTimeout
  }
){
  console.log(`\n                       Proses...\n\n\n\n`);
  order += 1;
  deps.setTimeout(() => {
    // print struct
    deps.struct(shop, 
      resultOrder, 
      order, 
      'Unpaid', 
      'Tunai', 
      'Silahkan berikan ini kepada kasir.' );
    deps.eraseCartList(); // reset cart bact to empty
    deps.setTimeout(() => {
      deps.backHomeQuestion(orderQuestion, confirmBackHome);
    },1000);
  },1500);
}

/**
 * Handle transaction payment method selection.
 *
 * This function validates:
 * - cart data
 * - total transaction amount
 * - selected payment method
 *
 * Then executes the selected transaction handler.
 *
 * @param {string} result 
 * Selected payment method option
 * 
 * @param {object[]} shop 
 * Cart items
 * 
 * @param {String} orderQuestion 
 * A grup of string that will pass a parameter
 * 
 * @param {number} resultOrder 
 * Total order price.
 * 
 * @param {Function} transQris 
 * QRIS transaction handler.
 * 
 * @param {Function} transCash 
 * Cash transaction handler.
 *
 * @throws {Error} If cart is not an array.
 * 
 * @throws {Error} If cart is empty.
 * 
 * @throws {Error} If total transaction amount is invalid.
 * 
 * @throws {Error} If selected payment method is unavailable.
 *
 * @returns {void}
 */
export function handleTransactions(
  result, 
  shop, 
  orderQuestion, 
  resultOrder,
  transQris = transactionActionsQris,
  transCash = transactionActionsCash
){

  if(!(Array.isArray(shop))){
    throw new Error(`\n\n    *Cart as parameter should be an array`);
  }
  if(shop.length < 1){
    throw new Error(`\n\n    *Cart can not be empty before doing transactions`);
  }

  if((resultOrder - 10) <= 90){
    throw new Error(`\n\n    *Total must be more than 2 digit before doing transactions`);
  }

  switch(result) {
  case '1':
    transQris(shop, resultOrder, orderQuestion);
    break;
  case '2':
    transCash(shop, resultOrder, orderQuestion);
    break;
  default : 
    throw new Error(`\n\n    *Perintah Salah\n\n`);
  };
}