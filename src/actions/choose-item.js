import { handleHomeMenu } from "../index.js";
import { orderConfirmQuestion } from "../services/questions.js";
import { printing } from "../utils/print.js";
export let shop = [];

export function eraseCartList(){
  shop = [];
}

const { handleHomeMenuText, choosenItemList } = printing;

function confirmOrder(result, input, params, init){
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
  const items = handleArr(listItems);
  const currInput = answer-1;
  let isFound = false;

  if(answer > items.length || isNaN(currInput)){
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
    // print all the choosen items
    choosenItemList(shop);
       
    // asking order confirmation
    orderConfirmQuestion('\n    Ada lagi? (Y/N): ', input, confirmOrder);
  }

}