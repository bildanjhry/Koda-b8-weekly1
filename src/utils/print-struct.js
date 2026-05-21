export const printing = {

   product: function(value){
      if(Array.isArray(value) && value.length < 1){
         return console.log("Parameter product() tidak diterima");
      }

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

                               Order No. ${order}
                                            `);
      itemList.forEach((val, index) => {
         console.log(`
                ${index+1}. ${val.name}${val?.size ? ', '+val.size : ''}
                   ${val.qty}X
                   Rp${val.price},-`);
      });
      console.log(`
                                      Total: Rp${result},-
                ---------------------------------------
                Status: ${paymentStatus}
                Payment: ${paymentMethod}


                ${desc}
                       

                              Terimakasih.
                ---------------------------------------
                   ||| |||| ||||| || |||| |||| |||| |
                ---------------------------------------\n\n`);

   },
};