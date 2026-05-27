import fs from "fs/promises";
/**
 * @async
 * 
 * Feching foods from json in datas folder.
 * This function will returning an array of object of foods
 * 
 * @returns {Promise<object[]>}
 * Returning promise foods of array of object
 */
export async function getFoods(){
  try{
    const url = './src/datas/foods.json';
    const strRes = await fs.readFile(url, 'utf-8');
    const objFoods =  JSON.parse(strRes);
    return objFoods;
  } catch(err){
    console.log(err);
  }
}

/**
 * @async
 * 
 * Feching drinks from json in datas folder.
 * This function will returning an array of object of foods
 * 
 * @returns {Promise<object[]>}
 * Returning promise drinks of array of object
 */
export async function getDrinks(){
  try{
    const url = './src/datas/drinks.json';
    const strRes = await fs.readFile(url, 'utf-8');
    const objDrinks =  JSON.parse(strRes);
    return objDrinks;
  }catch(err){
    console.log(err);
  }
}

/**
 * @async
 * 
 * Feching snacks from json in datas folder.
 * This function will returning an array of object of snacks
 * 
 * @returns {Promise<object[]>}
 * Returning promise snacks of array of object
 */
export async function getSnacks(){
  try{
    const url = './src/datas/snacks.json';
    const strRes = await fs.readFile(url, 'utf-8');
    const objSnacks =  JSON.parse(strRes);
    return objSnacks;
  } catch(err){
    console.log(err);
  }
}

/**
 * @async
 * 
 * Feching desert from json in datas folder.
 * This function will returning an array of object of desert
 * 
 * @returns {Promise<object[]>}
 * Returning promise desert of array of object
 */
export async function getDesert(){
  try{
    const url = './src/datas/desert.json';
    const strRes = await fs.readFile(url, 'utf-8');
    const objDesert =  JSON.parse(strRes);
    return objDesert;
  } catch(err){
    console.log(err);
  }
}

/**
 * @async
 * 
 * Feching paket from json in datas folder.
 * This function will returning an array of object of paket
 * 
 * @returns {Promise<object[]>}
 * Returning promise paket of array of object
 */
export async function getPaket(){
  try{
    const url = './src/datas/paket.json';
    const strRes = await fs.readFile(url, 'utf-8');
    const objPaket =  JSON.parse(strRes);
    return objPaket;
  } catch(err){
    console.log(err);
  }
}


/**
 * @async
 * 
 * Feching foods from json in datas folder.
 * This function will returning an array of object of foods
 * 
 * @returns {Promise<object[]>}
 * Returning promise foods of array of object
 */
export async function getHappyMeal(){
  try{
    const url = './src/datas/happy-meal.json';
    const strRes = await fs.readFile(url, 'utf-8');
    const objHappyMeal =  JSON.parse(strRes);
    return objHappyMeal;
  } catch(err){
    console.log(err);
  }
}