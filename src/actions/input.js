import { createInterface } from "node:readline";

export const rl = createInterface({
   input: process.stdin,
   output: process.stdout
});

export function initQuestion(params, question){
   return new Promise((resolve) => {
      rl.question("Input: ", function(ans){
         console.log(ans);
         resolve(ans);
      });
   });
}

export function closeQuestion(){
   rl.close();
}