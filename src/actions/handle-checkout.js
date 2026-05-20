
export function handleCheckout(shop){
   let result = 0;
   shop.forEach((val) => {
      result += val.price;
   });
   console.log(`
                Pesanan anda:
                ------------------------------------------`);
   shop.forEach((val, index) => {
      console.log(`
                ${index+1}. ${val.name}${val?.size ? ', '+val.size : ''}
                   ${val.qty}X
                   Rp${val.price},-\n`);
   });
   return `
                                         Total: Rp${result},-
                ------------------------------------------
                1.Bayar         2.kembali          3.Hapus
                
                input: `;
}