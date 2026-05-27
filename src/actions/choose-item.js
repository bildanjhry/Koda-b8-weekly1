import { handleHomeMenu } from "../index.js";
import { orderConfirmQuestion } from "../services/questions.js";
import { printing } from "../utils/print.js";
export let shop = [];
let isFound = false;

export function eraseCartList(){
  if(shop.length < 1){
    throw new Error(`\n\n     *Cart already empty`);
  }
  shop = [];
}

const { handleHomeMenuText, choosenItemList } = printing;

export function confirmOrder(result, input, params, init){

  if(typeof init !== "function"){
    throw new Error(`\n\n     *Parameter init for go back to home menu must be a function`);
  }
  
  switch(result){
  case 'y' :
    return handleHomeMenu(input); 
  case 'n' :
    return init('hasList', handleHomeMenuText, handleHomeMenu);
  default :
    throw new Error(`\n\n    *Perintah salah\n`);
  }
}

export function chooseItem(input, answer, listItems, handleArr) {
  
  if(!(Array.isArray(listItems))){
    throw new Error(`\n\n     *List item as a function must be an array`);
  }

  if(listItems.length < 1){
    throw new Error(`\n\n     *List item as a function can not be empty array`);
  }

  const items = handleArr(listItems);
  const currInput = answer-1;

  if(answer > items.length || isNaN(currInput)){
    throw new Error(`\n\n    *Pilihan tidak tersedia.`);
  }
   
  // add item to cart actions
  cartActions(items, currInput);
   
  if(isFound){
    // print all the choosen items
    choosenItemList(shop);
       
    // asking order confirmation
    orderConfirmQuestion('\n    Ada lagi? (Y/N): ', input, confirmOrder);
  }
}

export default function cartActions(items, currInput){
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
        const findIdx = shop.findIndex((val) => val.id === item.id);
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
          shop[findIdx].qty += 1;
          // shop.forEach((shopVal) => {
          //   if(item.id === shopVal.id){
          //     if(item.name === shopVal.name && !item.size && !shopVal.size){
          //       return shopVal.qty += 1;
          //     }
          //     else if((item?.size && shopVal?.size) && item?.size === shopVal?.size){
          //       return shopVal.qty += 1;
          //     }
          //   } 
          // });
        }
      }
   
    } 
  });
};