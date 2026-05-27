import { createInterface } from "node:readline";

export const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});

export function question(params, question){
  return new Promise((resolve) => {
    if(!question){ // some question are in callback function
      rl.question(params, function(ans){
        resolve(ans);
      });
    } else {
      rl.question(question(params), function(ans){
        resolve(ans);
      });
    }
  });
}

/**
 * Closing readline CLI
 */
export function closeQuestion(){
  rl.close();
}