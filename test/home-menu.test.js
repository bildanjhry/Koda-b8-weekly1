import { describe, it, after, before, afterEach, mock } from "node:test";
import { handleHomeMenu } from "../src/index.js";
import assert from "node:assert/strict";
import { init } from "../src/services/questions.js";
import { closeQuestion } from "../src/services/input.js";
import { handleArr, listItem } from "../src/utils/list-item.js";
import { getSnacks } from "../src/services/fetch-data.js";
import cartActions, { chooseItem } from "../src/actions/choose-item.js";
import sumTotal from "../src/utils/sum-total.js";
import { shop } from "../src/actions/choose-item.js";
import moneyFormat from "../src/utils/money-format.js";
import { transactionActions } from "../src/actions/handle-checkout.js";
import { confirmOrder } from "../src/actions/choose-item.js";
import { printing } from "../src/utils/print.js";
import { confirmBackHome, handleTransactions } from "../src/actions/handle-checkout.js";
import { eraseCart, handleCart, splicingItem } from "../src/actions/handle-cart.js";
import * as questions from '../src/services/questions.js';
const snacks = await getSnacks();

const { handleHomeMenuText, qrCode, struct, checkout } = printing;

describe('\n   ----- Unit Test ----\n', function(){

  before(() => {
    console.log('\n\n  🏃‍♂️  Start tests...\n');
  });

  afterEach(() => {
    console.log('    Task Complete');
  });

  after(() => {
    console.log('\n   ✅ All Task complete');
    closeQuestion();
  });

  const cart = [
    {
      id: 'f7L',
      cat: { id: 1, name: 'food' },
      name: 'Nasi',
      price: 13500,
      isPromo: false,
      qty: 1,
      size: 'Large'
    },
    {
      id: 'f3',
      cat: { id: 1, name: 'food' },
      name: 'Fish Fillet Burger',
      price: 34000,
      qty: 1
    },
    {
      id: 's3',
      cat: { id: 3, name: 'snack' },
      name: 'Sweet Corn',
      price: 13000,
      qty: 1
    }
  ];

  describe('\n   Item list, sub-item list and input test', function(){
    it('Input should matches any cases in home menu', function(){
      assert.throws(() => handleHomeMenu('8'), {
        message:`\n\n    *Pilihan tidak tersedia\n`
      });
    });
  
    it('Function handleArr() must returning an array', function(){
      assert.equal(handleArr(snacks) instanceof Array, true);
    });
  
    it('Input is required to matches any sub item list', async function(){
      assert.throws(() => chooseItem(3, 100, snacks, handleArr), {
        message:`\n\n    *Pilihan tidak tersedia.`
      });
    });
    
    it('Input is required to matches any sub item list', async function(){
      assert.throws(() => confirmOrder('test', 1, "", init), {
        message:`\n\n    *Perintah salah\n`
      });
    });
  
    it('Options to confirm re-order only accept (Y/N) input', async function(){
      assert.throws(() => confirmOrder('fail', 2, '\n    Ada lagi? (Y/N): ', init), {
        message:`\n\n    *Perintah salah\n`
      });
    });
    
    it('It is required to have item in cart before checkout', function(){
      if(shop.length < 1){
        assert.throws(() => handleHomeMenu('7'), {
          message:`\n\n    *Pilihan tidak tersedia\n`
        });
      }
    });
    
    it('Input for section checkout must matches cases', function(){
      assert.throws(() => handleCart("wasd", "", cart, "", "", ""), {message:`\n\n    *Perintah Salah\n\n`});
    });

    it('Input in handleTransaction() should matches any cases', function(){
      assert.throws(() => handleTransactions("test", cart, "", 100000), {message:`\n\n    *Perintah Salah\n\n`});
    });

    it('After completing transactions confirmBackHome() only accept valid (Y/N) value', function(){
      assert.throws(() => confirmBackHome("test", "2", "", "", ""), {message:`\n\n    *Perintah salah`});
    });

  });

  describe('\n   Utilities test', function(){
    it('Parameter sumTotal() must be an array', function(){
      assert.throws(() => sumTotal('{name:name, price:name}'), {
        message:`\n\n   *Oppps, Cart is invalid`
      });
    });

    it('Parameter sumTotal() can not an empty array', function(){
      assert.throws(() => sumTotal([]), {
        message:`\n\n   *Oppps, Cart is empty`
      });
    });

    it('Function sumTotal() must return a number', function(){
      assert.strictEqual(typeof sumTotal(cart), "number");
    });

    it('Parameter moneyFormat() must be a number', function(){
      assert.throws(() => moneyFormat('100000'), {
        message:`\n\n   *Oppps parameter moneyFormat must be a number`
      });
    });

    it('Money total should more then one digit berfore formating at moneyFormat()', function(){
      assert.throws(() => moneyFormat(10), {
        message:`\n\n   *Money total should more then 2 digit Before formating money`
      });
    });

    it('Parameter moneyFormat() must be a number greater then 0', function(){
      assert.throws(() => moneyFormat(-10), {
        message:`\n\n   *Oppps parameter moneyFormat must greater then 0`
      });
    });

    it('moneyFormat() should return an array', function(){
      assert.strictEqual(moneyFormat(10000) instanceof Array, true);
    });

    it('Parameter handleHomeMenuText() must be a string', function(){
      assert.throws(() => handleHomeMenuText(12), {
        message:`\n\n    *Parameter must be a string`
      });
    });

    it('Array as a parameter in sturct() must be an array', function(){
      assert.throws(() => struct('{name:name}', "", "", "", ""), {message:`\n\n    *Cart value must be an array`});
    });

    it('Array as a parameter in sturct() can not be empty array', function(){
      assert.throws(() => struct([], "", "", "", ""), {message:`\n\n    *Cart can not be empty array`});
    });

    it('Array as a parameter in checkout() must be an array', function(){
      assert.throws(() => checkout('{name:name}'), {message:`\n\n    *Cart value must be an array`});
    });

    it('Array as a parameter in checkout() can not be empty array', function(){
      assert.throws(() => checkout([]), {message:`\n\n    *Cart can not be empty array`});
    });

    it('Function handleHomeMenuText() should return string', function(){
      assert.strictEqual(typeof handleHomeMenuText(""), "string");
    });

    it('Function handleArr() must returning an array', function(){
      assert.strictEqual(handleArr(snacks) instanceof Array, true);
    });

    it('Array as a parameter in handleArr() can not be an empty array', function(){
      assert.throws(() => handleArr([]), {message:`\n\n     *List item before merge in handleArr() can not be empty`});
    });

    it('Array as a parameter in handleArr() must be an array', function(){
      assert.throws(() => handleArr('string'), {message:`\n\n     *List item before merge in handleArr() must be an array`});
    });

    it('Function listItem() must returning string', function(){
      assert.strictEqual(typeof listItem(cart), 'string');
    });

    it('Parameter in function listItem() must be an array', function(){
      assert.throws(() => listItem('string'), {message:`\n\n     *List item as a parameter in listItem() must be an array`});
    });

    it('Parameter in function listItem() can not be an empty array', function(){
      assert.throws(() => listItem([]), {message:`\n\n     *List item as a parameter in listItem() can not be empty array`});
    });

  });

  describe('\n   Actions test', function(){
    it('Cart in handleTransaction() can not be empty', function(){
      assert.throws(() => handleTransactions('1', [], "", "", ""), {message:`\n\n    *Cart can not be empty before doing transactions`});
    });

    it('Cart as a parameter in handleTransaction() should be an array', function(){
      assert.throws(() => handleTransactions('1', '{name:"name"}', "", ""), {message:`\n\n    *Cart as parameter should be an array`});
    });

    it('Total as a parameter in handleTransactions must be more than 2 digit', function(){
      assert.throws(() => handleTransactions('1', cart, "", 10, ""), {message:`\n\n    *Total must be more than 2 digit before doing transactions`});
    });

    it('Cart as a parameter in handleCart() should be an array', function(){
      assert.throws(() => handleCart("", "", '{name:"name"}', "", "", ""), {message:`\n\n    *Cart as parameter should be an array`});
    });

    it('Cart as a parameter in handleCart() can not be empty array', function(){
      assert.throws(() => handleCart("", "", [], "", "", "",), {message:`\n\n    *Pesanan kosong\n`});
    });

    it('In checkout section, input is required to matches any cases', function(){
      assert.throws(() => handleCart("15", init, cart, "", "", "",), {message:`\n\n    *Perintah Salah\n\n`});
    });

    it('Before choosing item, list item must be an array first', function(){
      assert.throws(() => chooseItem("1", "2", "{name:name}", handleArr), {message:`\n\n     *List item as a function must be an array`});
    });
    
    it('Before choosing item, list item can not be empty', function(){
      assert.throws(() => chooseItem("1", "2", [], handleArr), {message:`\n\n     *List item as a function can not be empty array`});
    });

    // it('Should call handlerArr() if cart pass all validations', function(){
    //   const handleArr = mock.fn();
    //   chooseItem(1, 1, snacks,  handleArr);
    //   assert.equal(handleArr.mock.callCount(), 1);
    // });

    // it('Reset,  cart can be done only when cart is not empty', function(){
    //   assert.throws(() => eraseCart(), {message:`\n\n     *Cart already empty`});
    // });

    it('Input for go back to item list in confrimOrder() must be a string', () => {
      assert.throws(() => confirmOrder('y', 1, "", init), {message:`\n\n     *Input for go back to item list must be a string`});
    });

    it('Parameter for go back to home menu in confrimOrder() must be a function', () => {
      assert.throws(() => confirmOrder('n', 1, "", 'init'), {message:`\n\n     *Parameter init for go back to home menu must be a function`});
    });

    
    // it('should handle menu 1', () => {
    //   const spy = mock.method(questions, 'listQuestion');
      
    //   questions.handleHomeMenu('1');
      
    //   assert.equal(spy.mock.callCount(), 1);
      
    //   spy.mock.restore();
    // });
      
  });

  describe('\n   Cart manipulations', function(){

    it('At cartActions() if input matches, then the matches item should be added into empty cart', () => {
      const createItem = (overrides = {}) => ([{
        id: 'f1',
        cat: 'food',
        name: 'Burger',
        price: 10000,
        isPromo:false,
        ...overrides
      }]);

      const items = createItem();
      cartActions(items, 0);
      assert.equal(shop.length, 1);
      assert.deepStrictEqual(shop[0], {
        ...items[0],
        qty: 1
      });
    });

    it('At cartActions() cart should increase qty if same item exists', () => {
      const createItem = (overrides = {}) => ([{
        id: 'f1',
        cat: 'food',
        name: 'Burger',
        price: 10000,
        isPromo:false,
        ...overrides
      }]);

      const items = createItem();

      cartActions(items, 0);
      const cartId = shop[0].id;
      const itemId = createItem()[0].id;

      assert.equal(cartId, itemId);
      assert.deepStrictEqual(shop[0].qty, 2);
    });

    it('Cart as a parameter in eraseCart() should be an array', function(){
      assert.throws(() => eraseCart('{name:"name"}', 10000, ""), {message:`\n\n    *Cart as parameter should be an array`});
    });

    it('Cart as a parameter in eraseCart() can not be empty array', function(){
      assert.throws(() => eraseCart([], 10000, ""), {message:`\n\n    *Pesanan kosong\n`});
    });

    it('Input must be matches one of cart list before delete an item in eraseCart()', function(){
      assert.throws(() => eraseCart(cart, 10000, handleHomeMenu));
    });

    it('Before delete item in splicingItem(), cart as a parameter must be an array', function(){
      assert.throws(() => splicingItem('string', 1), {message:`\n\n    *Cart as parameter splicingItem() must be an array`});
    });

    it('Before delete item in splicingItem(), cart as a parameter can not be empty array', function(){
      assert.throws(() => splicingItem([], 1), {message:`\n\n    *Cart as paramter splicingItem() can not be empty array`});
    });
    
    it('Should begun removing item when all the validation success in splicingItem()', () => {
      const cart = [{id: 1, qty: 1}];
      splicingItem(cart, 0);
      assert.equal(cart.length, 0);
    });

    it('Should decrease qty when qty greater than 1 at in splicingItem()', () => {
      const cart = [{id: 1, qty: 3}];
      splicingItem(cart, 0);
      assert.equal(cart[0].qty, 2);
    });

  });
    
  describe('Branches test', function(){
    describe('\n   At confirm reorder', function(){
      it('Should back to sub item list if Input matches Y', () => {
        assert.doesNotThrow(() => {
          confirmOrder('y', "1", "", "");
        });
      });
  
      it('Should back to home menu if Input matches N', () => {
        assert.doesNotThrow(() => {
          confirmOrder('n', "1", "", init);
        });
      });
  
    });
  
    describe('\n   At home menu:', function(){
      it('Should execute menu 1 if Input matches', () => {
        assert.doesNotThrow(() => {
          handleHomeMenu('1');
        });
      });
    
      it('Should execute menu 2 if Input matches', () => {
        assert.doesNotThrow(() => {
          handleHomeMenu('2');
        });
      });
    
      it('Should execute menu 3 if Input matches', () => {
        assert.doesNotThrow(() => {
          handleHomeMenu('3');
        });
      });
      it('Should execute menu 4 if Input matches', () => {
        assert.doesNotThrow(() => {
          handleHomeMenu('4');
        });
      });
      it('Should execute menu 5 if Input matches', () => {
        assert.doesNotThrow(() => {
          handleHomeMenu('5');
        });
      });
      it('Should execute menu 6 if Input matches', () => {
        assert.doesNotThrow(() => {
          handleHomeMenu('6');
        });
      });
  
    });

    describe('\n   At checkout state:', function(){
      it('Should do transaction if Input matches 1', () => {
        assert.doesNotThrow(() => {
          handleCart('1', "",cart,"","");
        });
      });

      it('Should go back to home menu if Input matches 2', () => {
        assert.doesNotThrow(() => {
          handleCart('2', init, cart,"","");
        });
      });

      it('Should do deleting process if Input matches 3', () => {
        assert.doesNotThrow(() => {
          handleCart('3', init, cart, handleHomeMenu, handleHomeMenuText);
        });
      });

    });

    describe('\n   At confirm back home', function(){
      it('Should call init() to back to home menu when input matches Y', () => {

        const init = mock.fn();
        const handleHomeMenu = mock.fn();

        confirmBackHome('y',"", init, handleHomeMenu, "", "");
        assert.equal(init.mock.callCount(), 1);

      });

      it('Should close the readline when input matches N', () => {
        const closeQuestion = mock.fn();
        confirmBackHome('n',"", "", "", "", closeQuestion);
        assert.equal(closeQuestion.mock.callCount(), 1);

      });
    });

    describe('\n\n   At handle transactions', function(){
      it('Should call transactionActions() to print the result after sucess do transactions', function(){
        const transactionActions = mock.fn();
        handleTransactions('1', cart, "", 100000, transactionActions);
        assert.equal(transactionActions.mock.callCount(), 1);
      });

    });

    // describe('Redline Question test', function(){
    //   it('init() callback must be a function', async function(){
    //     assert.throws(async () => await init("", handleHomeMenu, 'contoh'), `\n\n   *Action callback must be a function`);
    //   });

  });

});
