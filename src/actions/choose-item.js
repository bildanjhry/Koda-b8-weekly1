import { handleHomeMenu, handleHomeMenuText, rl } from "../index.js";

export function chooseItem(input, shop, text, listItems, handleArr) {
   const items = handleArr(listItems);
   let isFound = false;
   const currInput = text-1;

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

            if(!find){
               if(item?.size){
                  shop.push({
                     id:item.id,
                     cat:item.cat,
                     size:item.size,
                     name:item.name,
                     price:item.price,
                     qty: 1
                  }); 
               } if(item?.menu){
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
               else if(item.menu === "undefined" || item.size === "undefined") {
                  console.log(item?.size);
                  console.log('masuk sini');
                  shop.push({
                     id:item.id,
                     cat:item.cat,
                     name:item.name,
                     price:item.price,
                     qty: 1
                  }); 
               }

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
    
         if(aswr === 'y') { 
            return handleHomeMenu(input); 
         } 
         else if( aswr === 'n') {
            rl.question(handleHomeMenuText('hasList'), function(ans){
               handleHomeMenu(ans);
            });
         } else {
            console.log(`\n\n       **Perintah salah\n`);
            handleHomeMenu(input);
            return; 
         }
      });
   }

}