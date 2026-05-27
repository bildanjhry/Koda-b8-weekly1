/**
 * Summaries every item price in cart and returnig the total.
 *
 * @param {object[]} cart 
 * Cart item.
 *
 * @throws {Error} If cart is emtpy.
 * 
 * @throws {Error} If cart is not an array.
 *
 * @returns {number} Total summary
 */
export default function sumTotal(cart){
  if(!(Array.isArray(cart))){
    throw new Error(`\n\n   *Oppps, Cart is invalid`);
  }

  if(cart.length < 1){
    throw new Error(`\n\n   *Oppps, Cart is empty`);
  }

  let result = 0;
  cart.forEach((val) => {
    if(val.qty > 1){
      result += (val.price * val.qty);
    }
    else {
      result += val.price;
    }
  });
  return result;
}