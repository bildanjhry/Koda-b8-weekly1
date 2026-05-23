import { handleHomeMenu } from "../index.js";
import { orderConQuestion } from "../services/questions.js";
export let shop = [];

export function eraseCartList(){
   shop = [];
}

export function chooseItem(input, text, listItems, handleArr) {
   const items = handleArr(listItems);
   const currInput = text-1;
   let isFound = false;

   try {
      if(text > items.length || isNaN(currInput)){
         throw new Error(`'\n\n     *Pilihan tidak tersedia.'`);
      }
   
      // add item to cart actions
      items.forEach((item, index) => {
         if(currInput === index){
            isFound = true;
            if(shop.length < 1){
               shop.push({
                  id:item.id,
                  cat:item.cat,
                  name:item.name,
                  price:item.price,
                  isPromo:item.isPromo,
                  qty: 1
               });
               if(item.menu !== undefined){
                  shop[0].menu = item.menu;
               }
               if(item.size !== undefined){
                  shop[0].size = item.size;
               }
            } else {
               const find = shop.find((val) => val.id === item.id);
   
               if(!find){
                  shop = [ 
                     ...shop,
                     {
                        id:item.id,
                        cat:item.cat,
                        name:item.name,
                        price:item.price,
                        qty: 1
                     }]; 
                  const lastIndex = shop.length-1;
                  if(item.size !== undefined){
                     shop[lastIndex].size = item.size;
                  }
                  if(item.menu !== undefined){
                     shop[lastIndex].menu = item.menu;
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
       
         // output choosen items
         shop.map((val) => {
            console.log(`    ${val.name}${val?.size ? ', '+val.size : ''} ${val.qty && val.qty}x`);
         });
       
         // order confirmation
         orderConQuestion('\n    Ada lagi? (Y/N): ', input);
      }

   } catch(err) {
      console.log(err.message);
      return handleHomeMenu(input);
   }
}