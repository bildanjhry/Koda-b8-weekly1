import { createInterface } from "node:readline";

export const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * Redline root function, this function has:
 * - Promise return value
 * - Can handle 2 condition parameter
 * 
 * @param {string} params
 * parameter for questionCallback, or can be the function question itself 
 * 
 * @param {Function} question
 * Function handle questions 
 * 
 * @returns {Promise<string>}
 */
export function question(params, questionCallback){
  return new Promise((resolve, rejected) => {
    // if(params.length < 1){
    //   rejected(`\n\n     *Parameter for readline is empty`);
    // }
    // if(typeof params !== "string"){
    //   rejected(`\n\n     *Parameter params for readline must be a string`);
    // }
    if(!questionCallback){ // some question are in callback function
      rl.question(params, function(ans){
        resolve(ans);
      });
    } else {
      rl.question(questionCallback(params), function(ans){
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