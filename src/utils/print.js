import moneyFormat from "./money-format.js";
import sumTotal from "./sum-total.js";

/**
 * Collection of UI printing/rendering utilities.
 */
export const printing = {

  /**
   * Generate home menu UI text based on state.
   *
   * @param {string} stat 
   * Menu state ('hasList' or default state).
   *
   * @throws {Error} If stat is not a string.
   *
   * @returns {string} Formatted menu text.
   */
  handleHomeMenuText: function(stat){
    if(typeof stat !== "string"){
      throw new Error(`\n\n    *Parameter must be a string`);
    }
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
    
    Input: `;
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
    
    Input:  `;
  },

  /**
   * Print QR code to console.
   *
   * @returns {void}
   */
  qrCode: function() {
    const qrCode =`
                   █████████████████████████████████
                   ████ ▄▄▄▄▄ ██ ▄▀█▀▄ ██ ▄▄▄▄▄ ████
                   ████ █   █ ██ █▄█▄█ ██ █   █ ████
                   ████ █▄▄▄█ ██ ▀███▀ ██ █▄▄▄█ ████
                   ████▄▄▄▄▄▄▄██ █ ▀ █ ██▄▄▄▄▄▄▄████
                   ████ ▄▄ ▀▄▄▄▀▀▄█▄█▀▀▄▄▄▀ ▄▄ █████
                   ████ █▀▄ ▄▄▀ ▄▀ ▀ ▀▄ ▀▄▄ █▀ █████
                   ████ ▀ ▀█▄▄▀█ ▄███▄ █▄▄█ ▀▀ █████
                   ████▄██▄▄█▄▄█ ▀ █ ▀ █▄▄█▄▄▄██████
                   ████ ▄▄▄▄▄ ██▄▀▄ ▄ ▄██ ▄▄▄▄██████
                   ████ █   █ ██ ▀█▄█▄█▀██ █ ███████
                   ████ █▄▄▄█ ██▄ ▄███▄ ██▄▄▄█ █████
                   ████▄▄▄▄▄▄▄██▄▄███▄▄██▄▄▄▄▄██████
                   █████████████████████████████████`;

    console.log(qrCode);
  },
  
  /**
   * Print transaction receipt structure to console.
   *
   * @param {object[]} itemList
   * Cart items.
   * 
   * @param {number} result
   * Total price.
   * 
   * @param {number} order 
   * Order number.
   * 
   * @param {string} paymentStatus 
   * Payment status text.
   * 
   * @param {string} paymentMethod
   * Payment method used.
   * 
   * @param {string} desc 
   * Additional description text.
   *
   * @throws {Error} If itemList is not an array.
   * 
   * @throws {Error} If itemList is empty.
   *
   * @returns {void}
   */
  struct: function(itemList, result, order, paymentStatus, paymentMethod, desc){
    if(!(Array.isArray(itemList))){
      throw new Error(`\n\n    *Cart value must be an array`);
    }
    
    if(itemList.length < 1){
      throw new Error(`\n\n    *Cart can not be empty array`);
    }
    
    console.log(`
                ---------------------------------------
                              Mc Donalds
                ---------------------------------------

                              Order No. ${order}
                                            `);
    itemList.forEach((val, index) => {
      console.log(`
                ${index+1}. ${val.name}${val?.size ? ', '+val.size : ''}
                   ${val.qty}X
                   Rp${moneyFormat(val.price)[0]},-`);
    });
    console.log(`
                                      Total: Rp${moneyFormat(result)[0]},-
                ---------------------------------------
                Status: ${paymentStatus}
                Payment: ${paymentMethod}


                ${desc}
                       

                              Terimakasih.
                ---------------------------------------
                   ||| |||| ||||| || |||| |||| |||||
                ---------------------------------------\n\n`);

  },

  /**
   * Generate checkout summary and return menu string.
   *
   * @param {object[]} shop
   * Cart items.
   *
   * @throws {Error} If shop is not an array.
   * 
   * @throws {Error} If shop is empty.
   *
   * @returns {string} Checkout UI string with total and actions.
   */
  checkout: function(shop){
    if(!(Array.isArray(shop))){
      throw new Error(`\n\n    *Cart value must be an array`);
    }
    
    if(shop.length < 1){
      throw new Error(`\n\n    *Cart can not be empty array`);
    }
    const total = sumTotal(shop);
    console.log(`
                   Pesanan anda:
                   ------------------------------------------`);
    shop?.forEach((val, index) => {
      console.log(`
                   ${index+1}. ${val.name}${val?.size ? ', '+val.size : ''}
                      ${val.qty}X
                      Rp${moneyFormat(val.price)[0]},-\n`);
    });
    return `
                                            Total: Rp${moneyFormat(total)[0]},-
                   ------------------------------------------
                   1. Bayar        2. Kembali        3. Hapus
                   
       Input: `;
  },

  /**
   * Print selected cart items to console.
   *
   * @param {object[]} shop
   * Cart items.
   *
   * @returns {void}
   */
  choosenItemList: function(shop){
    console.log('    --------------------\n');
    console.log(`    Pilihan anda: `);
             
    // output choosen items
    shop.map((val) => {
      console.log(`    ${val.name}${val?.size ? ', '+val.size : ''} ${val.qty && val.qty}x`);
    });
  }
};