import moneyFormat from "./money-format.js";
import sumTotal from "./sum-total.js";

export const printing = {
   handleHomeMenuText: function(stat){
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
   struct: function(itemList, result, order, paymentStatus, paymentMethod, desc){
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
   checkout: function(shop){
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
   choosenItemList: function(shop){
      console.log('    --------------------\n');
      console.log(`    Pilihan anda: `);
             
      // output choosen items
      shop.map((val) => {
         console.log(`    ${val.name}${val?.size ? ', '+val.size : ''} ${val.qty && val.qty}x`);
      });
   }
};