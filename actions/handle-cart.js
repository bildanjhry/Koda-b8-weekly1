import { printing } from "../utils/print-struct.js";
import { rl } from "../work.js";

export let shop = [];

export function handleCart(
  ans, 
  order, 
  init, 
  handleHomeMenu, 
  handleHomeMenuText
) { 
  let result = 0;
  try{
    switch(ans){
    case '1' :
      shop.forEach((item) => {
        result += item.price;
      });
      rl.question("\n\n    Ingin menggunakan 1. QRIS atau 2. Tunai?\n\n    input: ", function(tra){
        if(tra === "2"){
          console.log(`\n                      Proses...\n\n\n\n`);
          order += 1;
          setTimeout(() => {
            printing.struct(shop, result, order, 'Unpaid', 'Tunai', 'Silahkan berikan ini kepada kasir.' );
            shop = [];
            setTimeout(() => {
              rl.question(handleHomeMenuText(""), function(ans){
                handleHomeMenu(ans);
              });
            },7000);
          },1500);
        } else if(tra === "1"){
          console.log(`\n                       Proses...`);
          order += 1;
          setTimeout(() => {
            printing.qrCode();
            setTimeout(() => {
              console.log(`\n\n\n\n\n\n\n\n\n
            ----------------- Pembarayan berhasil -----------------\n\n`);
              printing.struct(shop, result, order, 'Paid', 'QRIS', 'Silahkan tunggu pesanan anda.' );
            },2500);
            setTimeout(() => {
              shop = [];
              rl.question(handleHomeMenuText(""), function(ans){
                handleHomeMenu(ans);
              });
            },6500);
          },1500);
        }
      });
      break;
    case '2' :
      return rl.question(handleHomeMenuText("hasList"), function(ans){
        handleHomeMenu(ans);
      });
    case '3' :
      return rl.question("\n\n    Silahkan pilih item: ", function(ans){
        const idx = parseInt(ans)-1;
        shop.map((item, index) => {
          if(index === idx){
            if(item.qty > 1){
              item.qty -= 1;
            } else {
              shop.splice(idx, 1);
            }
          }
        });
        handleHomeMenu('7');
      });
    default: 
    { const err = new Error(`\n\n    *Perintah Salah\n\n`);
      throw err;}
    }
  } catch(err) {
    console.log(err);
    init("hasList");
  }
}
