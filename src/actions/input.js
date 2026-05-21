import { createInterface } from "node:readline";

export const rl = createInterface({
   input: process.stdin,
   output: process.stdout
});

export function question(params, question){
   return new Promise((resolve) => {
      rl.question(question(params), function(ans){
         resolve(ans);
      });
   });
}

export function closeQuestion(){
   rl.close();
}