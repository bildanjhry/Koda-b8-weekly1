import { handleHomeMenu, handleHomeMenuText } from "../index.js";
import { rl } from "../services/input.js";
import { init } from "../services/questions.js";

export function chooseItem(input, shop, text, listItems, handleArr) {
   const items = handleArr(listItems);
   const currInput = text-1;
   let isFound = false;

   if(text > items.length || isNaN(currInput)){
      console.log('\n\n     Pilihan tidak tersedia.');
      handleHomeMenu(input);
      return;
   }

   items.forEach((item, index) => {
      if(currInput === index){
         isFound = true;
         if(shop.length < 1){
            if(item?.menu){
               shop.push({
                  id:item.id,
                  cat:item.cat,
                  name:item.name,
                  menu:item.menu,
                  price:item.price,
                  isPromo:item.isPromo,
                  qty: 1
               });
            }
            if(item?.size){
               shop.push({
                  id:item.id,
                  cat:item.cat,
                  name:item.name,
                  price:item.price,
                  size: item.size,
                  qty: 1
               });
            }
            else if(!item.menu) {
               shop.push({
                  id:item.id,
                  cat:item.cat,
                  name:item.name,
                  price:item.price,
                  qty: 1
               });
            }
         } else {
            const find = shop.find(val => val.id === item.id);
            if(!find){
               if(item?.size){
                  shop.push(
                     {
                        id:item.id,
                        cat:item.cat,
                        size:item.size,
                        name:item.name,
                        price:item.price,
                        qty: 1
                     });
               }
               else if(item?.menu){
                  shop.push({
                     id:item.id,
                     cat:item.cat,
                     name:item.name,
                     menu:item.menu,
                     price:item.price,
                     isPromo:item.isPromo,
                     qty: 1
                  });
               } 
               else if(item.menu === undefined || item.size === undefined) {
                  shop = [ 
                     ...shop,
                     {
                        id:item.id,
                        cat:item.cat,
                        name:item.name,
                        price:item.price,
                        qty: 1
                     }]; 
               }
            }
            else if(find) {
               shop.forEach((shopVal) => {
                  if(item.id === shopVal.id){
                     if(item.name === shopVal.name && !item.size && !shopVal.size){
                        return shopVal.qty += 1;
                     }
                     else if((item?.size && shopVal?.size) && item?.size === shopVal?.size){
                        return shopVal.qty += 1;
                     }
                  } 
               });

            }
         }

      } 
   });

   if(isFound){
      console.log('    --------------------\n');
      console.log(`    Pilihan anda: `);
    
      // menampilkan makanan/minuman yang didalam keranjang
      shop.map((val) => {
         console.log(`    ${val.name}${val?.size ? ', '+val.size : ''} ${val.qty && val.qty}x`);
      });
    
      // konfirmasi pesanan
      rl.question('\n    Ada lagi? (Y/N): ', function(aswr){
         aswr = aswr.toLowerCase();

         switch(aswr){
         case 'y' :
            return handleHomeMenu(input); 
         case 'n' :
            return init('hasList', handleHomeMenuText, handleHomeMenu);
         default :
            console.log(`\n\n       **Perintah salah\n`);
            return handleHomeMenu(input);
         }
    
      });
   }

}