import moneyFormat from "./money-format.js";

// merge arrays from different format
export function handleArr(listItems){

  if(!(Array.isArray(listItems))){
    throw new Error(`\n\n     *List item before merge in handleArr() must be an array`);
  }

  if(listItems.length < 1){
    throw new Error(`\n\n     *List item before merge in handleArr() can not be empty`);
  }

  const newOne = listItems;
  const moreList = [];
    
  listItems.map((value) => {
    if(value?.size && Array.isArray(value.size)) {
      if(Array.isArray(value.size) && value.size.length > 0){
        value.size.forEach((item) => {
          moreList.push({
            id:(value.id+item.name[0]),
            name:value.name,
            price:item.price,
            cat:value.cat,
            size:item.name,
            isPromo:value.isPromo
          });
        });
      }
    }
  });
                    
  const newFoods = newOne.filter((item) => item.price !== undefined);
  return [...newFoods, ...moreList];
}

// displaying list of sub-item
export function listItem (listItems){

  if(!(Array.isArray(listItems))){
    throw new Error(`\n\n     *List item as a parameter in listItem() must be an array`);
  }

  if(listItems.length < 1){
    throw new Error(`\n\n     *List item as a parameter in listItem() can not be empty array`);
  }

  const listFoods = handleArr(listItems);
  const format = listFoods.map((value, index) => {
    let no = 0;
    no += (index +1);
    
    return`
        ${no}. ${value.name}${value.size ? ", "+ value.size : ''}
        Harga: Rp${moneyFormat(value.price)[0]},-\n`;
  }).join("");
  return format+ `\n    Input: `;
}


