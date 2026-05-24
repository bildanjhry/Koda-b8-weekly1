export const foods = [
  {
    id:'f1',
    name:"Cheese Burger",
    price:35000,
    cat:{id:1, name: "food"},
    isPromo:true
  },
  {
    id:'f2',
    name:"Nasi Uduk McD",
    price:22000,
    cat:{id:1, name: "food"},
    isPromo:false
  },
  {
    id:'f3',
    name:"Fish Fillet Burger",
    price:34000,
    cat:{id:1, name: "food"},
    isPromo:false
  },
  {
    id:'f4',
    name:"Double Cheese Burger",
    price:34000,
    cat:{id:1, name: "food"},
    isPromo:false
  },
  {
    id:'f5',
    name:"Beef Burger Deluxe",
    price:29500,
    cat:{id:1, name: "food"},
    isPromo:false
  },
  {
    id:'f6',
    name:"French Fries",
    size:[ 
      {name: 'Reguler', price: 14000}, 
      {name: 'Medium', price: 22000}, 
      {name: 'Large', price: 29500},],
    cat:{id:1, name: "food"},
    isPromo:false
  },
  {
    id:'f7',
    name:"Nasi",
    size:[ 
      {name: 'Medium', price: 10000}, 
      {name: 'Large', price: 13500},],
    cat:{id:1, name: "food"},
    isPromo:false
  },
];

export const desert = [
  {
    id:'d1',
    name:"McFlurry Feat. OREO",
    cat:{id:4, name: "desert"},
    price:15000,
    isPromo:false,
  },
  {
    id:'d2',
    name:"Choco Sundae",
    cat:{id:4, name: "desert"},
    price:13000,
    isPromo:false,
  },
  {
    id:'d3',
    name:"McFlurry Choco",
    cat:{id:4, name: "desert"},
    price:15000,
    isPromo:false,
  },
  {
    id:'d4',
    name:"Strawberry Sundae",
    cat:{id:4, name: "desert"},
    price:13000,
    isPromo:false,
  },
  {
    id:'d5',
    name:"McFlurry Matcha Choco",
    cat:{id:4, name: "desert"},
    price:18000,
    isPromo:false,
  },
];

export const drinks = [
  {
    id:'d1',
    name:"Iced Coffee",
    cat:{id:2, name: "drink"},
    price:14000,
    isPromo:true
  },
  {
    id:'d2',
    name:"Coke Float",
    cat:{id:2, name: "drink"},
    size:[ 
      {name: 'Small', price: 11000}, 
      {name: 'Medium', price: 13000}, 
      {name: 'Large', price: 15000},],
    isPromo:false
  },
  {
    id:'d3',
    name:"Fanta",
    cat:{id:2, name: "drink"},
    size:[ 
      {name: 'Small', price: 11000}, 
      {name: 'Medium', price: 13000}, 
      {name: 'Large', price: 15000},],
    isPromo:false
  },
  {
    id:'d4',
    name:"Iced Lychee Tea",
    cat:{id:2, name: "drink"},
    price:22000,
    isPromo:false
  },
  {
    id:'d5',
    name:"Tehbotol Kotak",
    cat:{id:2, name: "drink"},
    price:12000,
    isPromo:false
  },
  {
    id:'d6',
    name:"Fruit Tea Lemon",
    cat:{id:2, name: "drink"},
    size:[ 
      {name: 'Small', price: 11000}, 
      {name: 'Medium', price: 13000}, 
      {name: 'Large', price: 15000},],
    isPromo:false
  },
  {
    id:'d7',
    name:"Coca-cola",
    cat:{id:2, name: "drink"},
    size:[ 
      {name: 'Small', price: 11000}, 
      {name: 'Medium', price: 13000}, 
      {name: 'Large', price: 15000},],
    isPromo:false
  },
  {
    id:'d8',
    name:"Sprite",
    cat:{id:2, name: "drink"},
    size:[ 
      {name: 'Small', price: 11000}, 
      {name: 'Medium', price: 13000}, 
      {name: 'Large', price: 15000},],
    isPromo:false
  },
  {
    id:'d9',
    name:"Hot Coffee",
    cat:{id:2, name: "drink"},
    price:13000,
    isPromo:false
  },
];

export const snacks = [
  {
    id:'s1',
    name:"Apple Pie",
    cat:{id:3, name: "snack"},
    price:13000,
    isPromo:false
  },
  {
    id:'s2',
    name:"HashBrown",
    cat:{id:3, name: "snack"},
    price:15000,
    isPromo:false
  },
  {
    id:'s3',
    name:"Sweet Corn",
    cat:{id:3, name: "snack"},
    price:13000,
    isPromo:false
  },
  {
    id:'s4',
    name:"McSpaghetti Pedas Manis",
    cat:{id:3, name: "snack"},
    price:15000,
    isPromo:false
  },
  {
    id:'s5',
    name:"McSpaghetti",
    cat:{id:3, name: "snack"},
    price:16000,
    isPromo:false
  },
  {
    id:'s6',
    name:"McNuggets 4 pcs",
    cat:{id:3, name: "snack"},
    price:28500,
    isPromo:false
  },
  {
    id:'s7',
    name:"Chicken Snack Wrap",
    cat:{id:3, name: "snack"},
    price:19500,
    isPromo:false
  },

];

export const paket = [
  {
    id:'p1',
    name:"Paket Hemat Fish Fillet Burger, Medium",
    menu:[{
      item: foods[5],
      size:foods[5].size[1], 
      qty:1
    },
    {
      item: drinks[6],
      size:drinks[6].size[1], 
      qty:1
    },
    {
      item: foods[2], 
      qty:1
    }],
    cat:{id:4, name: "paket"},
    price:48000,
    isPromo:false,
  },
  {
    id:'p2',
    name:"Paket Hemat Beef Burger Deluxe + PaHeBat McSpaghetti Ayam McD Spicy + 2 McFlurry feat. OREO",
    menu:[{
      item: foods[4],
      qty:1,
    }, 
    {
      item: foods[5], 
      size:foods[5].size[0],
      qty:1
    },
    {
      item: {name: "Paha ayam Spicy"}, 
      qty:1
    }, 
    {
      item: desert[0], 
      qty:2
    }, 
    {
      item: drinks[6],
      size: drinks[6].size[1],
      qty:1
    }, 
    { 
      item: drinks[5], 
      size: drinks[5].size[1],
      qty:1
    }],
    price:93500,
    cat:{id:6, name: "paket"},
    isPromo:true,
    discount:'30%'
  },
  {
    id:'p3',
    name:"PaNas 2 Krispy with Fries, Large",
    desc:"PaNas",
    menu:[{
      item :{name: "Paha ayam Krispy"},
      qty:2
    }, 
    {
      item:foods[5],
      size:foods[6].size[2],
      qty:1
    }, 
    { 
      item:drinks[6],
      size:drinks[6].size[2],
      qty:1,
    }],
    price:63500,
    cat:{id:6, name: "paket"},
    isPromo:false,
  },
  {
    id:'p4',
    name:"PaNas 2 Spicy with Fries, Large",
    desc:"PaNas",
    menu:[{
      item :{name: "Paha ayam Spicy"},
      qty:2
    }, 
    {
      item:foods[5],
      size:foods[6].size[2],
      qty:1
    }, 
    { 
      item:drinks[6],
      size:drinks[6].size[2],
      qty:1,
    }],
    price:63500,
    cat:{id:6, name: "paket"},
    isPromo:false,
  },
  {
    id:'p5',
    name:"PaNas 2 Spicy, Medium",
    desc:"PaNas",
    menu:[{
      item :{name: "Paha ayam Spicy"},
      qty:2
    }, 
    {
      item:foods[6],
      qty:1
    }, 
    { 
      item:drinks[5],
      qty:1,
    }],
    price:53000,
    cat:{id:6, name: "paket"},
    isPromo:false,
  },
  {
    id:'p6',
    name:"Paket Hemat Beef Burger Deluxe, Medium",
    menu:[{
      item :foods[4],
      qty:1
    }, 
    {
      item:foods[5],
      size:foods[5].size[2],
      qty:1
    }, 
    { 
      item:drinks[6],
      size:drinks[6].size[2],
      qty:1,
    }],
    price:45000,
    cat:{id:6, name: "paket"},
    isPromo:false,
  },
  {
    id:'p7',
    name:"PaNas 1 Krispy",
    desc:"PaNas",
    menu:[{
      item :foods[6],
      qty:1
    }, 
    {
      item: {name: "Paha ayam Krispy"},
      qty:1
    }],
    price:40500,
    cat:{id:6, name: "paket"},
    isPromo:false,
  },
    
];

export const happyMeal = [
  {
    id:'hm1',
    name:"Happy Meal 4 Pcs McNuggets",
    menu:[{
      item :snacks[5],
      qty:1
    }, 
    {
      item:foods[5],
      size:foods[5].size[0],
      qty:1
    }, 
    { 
      item:{name:"Susu UHT"},
      qty:1,
    }],
    cat:{id:5, name: "Happy Meal"},
    price:45000,
    isPromo:false,
  },
  {
    id:'hm2',
    name:"Happy Meal",
    desc:"Happy Meal Ayam McD",
    menu:[ { 
      item:{name:"Susu UHT"},
      qty:1,
    },
    { 
      item:{name:"Paha ayam Krispy"},
      qty:1,
    },
    { 
      item:foods[6],
      size:foods[6].size[0],
      qty:1,
    }],
    price:45000,
    cat:{id:5, name: "Happy Meal"},
    isPromo:false,
  },
];
