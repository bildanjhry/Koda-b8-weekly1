const {createInterface} = require("node:readline")

const rl = createInterface({
    input: process.stdin,
    output: process.stdout
})

const foods = [
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
]

const desert = [
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
]

const drinks = [
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
]

const snacks = [
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

]

const paket = [
    {
        id:'p1',
        name:"Paket Hemat Fish Fillet Burger, Medium",
        desc:"PaHeBat Korean Soy Garlic Wings + PaHeBat McSpaghetti Ayam McD Spicy + 2 McFlurry feat. OREO",
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
    
]

const happyMeal = [
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
]

let shop = []

function handleHomeMenuText(stat){
 
    if(stat === 'hasList'){
    return `
    Home :
    1. Pilih Makan
    2. Pilih Minum
    3. Pilih Snacks 
    4. Pilih Desert
    5. Pilih Paket
    6. Happy Meal
    7. Pilih Promo
    -------------------------
    8. Checkout
    
    input: `
    }
    return `
    ----------- Selamat datang di McD ----------
    
    Home :
    1. Pilih Makan
    2. Pilih Minum
    3. Pilih Snacks 
    4. Pilih Desert
    5. Pilih Paket
    6. Happy Meal
    7. Pilih Promo
    
    input:  `
}

const printing = {
    product: function(value){
        if(Array.isArray(value) && value.length < 1){
            return console.log("Parameter product() tidak diterima")
        }

        value.map((item, index) => {
            if(item.size.length > 0){

            }
            return `${index+1}. ${item.name}
                                Rp${item.price},-`
        })
    },
    qrCode: function() {
            const qrCode =`
                                    █████████████████████████████████
                                    ████ ▄▄▄▄▄ ██ ▄▀█▀▄ ██ ▄▄▄▄▄ ████
                                    ████ █   █ ██ █▄█▄█ ██ █   █ ████
                                    ████ █▄▄▄█ ██ ▀███▀ ██ █▄▄▄█ ████
                                    ████▄▄▄▄▄▄▄██ █ ▀ █ ██▄▄▄▄▄▄▄████
                                    ████ ▄▄ ▀▄▄▄▀▀▄█▄█▀▀▄▄▄▀ ▄▄ █████
                                    ████ █▀▄ ▄▄▀ ▄▀ ▀ ▀▄ ▀▄▄ █▀ █████
                                    ████ ▀ ▀█▄▄▀█ ▄███▄ █▄▄█ ▀▀ █████
                                    ████▄██▄▄█▄▄█ ▀ █ ▀ █▄▄█▄▄▄██████
                                    ████ ▄▄▄▄▄ ██▄▀▄ ▄ ▄██ ▄▄▄▄██████
                                    ████ █   █ ██ ▀█▄█▄█▀██ █ ███████
                                    ████ █▄▄▄█ ██▄ ▄███▄ ██▄▄▄█ █████
                                    ████▄▄▄▄▄▄▄██▄▄███▄▄██▄▄▄▄▄██████
                                    █████████████████████████████████`

            console.log(qrCode)
        },

    struct: function(itemList, result, paymentStatus, paymentMethod, desc){
            
            console.log(shop)
            const strList = itemList.map((item, index) => {
                return `${index+1}. ${item.name}                  ${item?.qty ? item.qty+'x' : ''}\n`
                `Rp${item.price},-                                   \n\n`
                
            })

            console.log(strList)
            const struct = `
                                    
                                    ----------------------------
                                            Order No. 1

                                    ${strList}
    
                                                Total: Rp${result},-
                                    ----------------------------
                                    
                                    Status: ${paymentStatus}
                                    Payment: ${paymentMethod}
    
                                    ${desc}
    
                                            Terimakasih.
                                    ----------------------------
                                       ||| |||| ||||| || ||||
                                    ----------------------------
                                    
                                    `
            console.log(struct)
    },
}


const struct = `
                                    
                                    ----------------------------
                                            Order No. 1
    
                                    1. Ayam                 1x
                                    Rp40000,-
                                    2. Burger               2x
                                    Rp40000,-
    
                                                Total: Rp80000,-
                                    ----------------------------
                                    
                                    Status: Paid
                                    Payment: QRIS
    
                                    Silahkan berikan struct ini 
                                    ke kasir
    
                                            Terimakasih.
                                    ----------------------------
                                       ||| |||| ||||| || ||||
                                    ----------------------------
                                    
                                    `

function chooseItem(input, text, listItems, handleArr) {

    let items = handleArr(listItems)
    items.forEach((item, index) => {
        if((text-1) === index){
            if(shop.length < 1){
                if(item?.size){
                    shop.push({
                        id:item.id,
                        cat:item.cat,
                        name:item.name,
                        price:item.price,
                        size: item.size,
                        qty: 1
                    })
                } 
                else {
                    console.log("nambah ini")
                    shop.push({
                        id:item.id,
                        cat:item.cat,
                        name:item.name,
                        price:item.price,
                        qty: 1
                    })
                }
            } else {
                const find = shop.find(val => val.id === item.id)
                    shop.forEach((shopVal, idxShop) => {
                    if(item.id === shopVal.id){
                        if(item.name === shopVal.name && !item.size && !shopVal.size){
                         return shopVal.qty += 1
                        }
                        else if((item?.size && shopVal?.size) && item?.size === shopVal?.size){
                          return shopVal.qty += 1
                        }
                    } 
                    })

                    if(!find){
                    if(item?.size){
                        shop.push({
                        id:item.id,
                        cat:item.cat,
                        size:item.size,
                        name:item.name,
                        price:item.price,
                        qty: 1
                    }) 
                    } else {
                        shop.push({
                            id:item.id,
                            cat:item.cat,
                            name:item.name,
                            price:item.price,
                            qty: 1
                        }) 
                }
                    
                }
 
        }

        }
    })

    console.log(shop)
    console.log('    --------------------\n')
    console.log(`    Pilihan anda: `)

    // menampilkan makanan/minuman yang didalam keranjang
    shop.map((val, idx) => {
        console.log(`    ${val.name}${val?.size ? ', '+val.size : ''} ${val.qty && val.qty}x`)
    })

    // konfirmasi pesanan
    rl.question('\n    Ada lagi? (Y/N): ', function(aswr){
        aswr = aswr.toLowerCase()

        if(aswr === 'y') { 
            return handleHomeMenu(input) 
        } 
        else if( aswr === 'n') {
            rl.question(handleHomeMenuText('hasList'), function(ans){
                handleHomeMenu(ans)
            })
        } else {
            return console.log(`\n              \*Perintah salah`)
        }
    })
   
}

// handle array list
function handleArr(listItems){
    let newOne = listItems
    let moreList = []
    
    listItems.map((value, indexOut) => {
        if(value?.size && Array.isArray(value.size)) {
            if(Array.isArray(value.size) && value.size.length > 0){
                value.size.forEach((item, index) => {
                        moreList.push({
                        id:(value.id+item.name[0]),
                        name:value.name,
                        price:item.price,
                        cat:value.cat,
                        size:item.name,
                        isPromo:value.isPromo
                    })
                })
            }
        }
                        
    })
                    
    let newFoods = newOne.filter((item) => item.price !== undefined)
    return [...newFoods, ...moreList]
}

// menampilkan list item
function listItem(listItems){

    let listFoods = handleArr(listItems)
    let format = listFoods.map((value, index) => {
        let no = 0
        no += (index +1)
    
        return`
        ${no}. ${value.name}${value.size ? ", "+ value.size : ''}
        Harga: Rp${value.price},-\n`
                    }).join("")
        return format+ `\n    input: `
}

// handle menu utama
function handleHomeMenu(ans) {

    switch(ans){
        case '1' :
            return rl.question(listItem(foods), function(text){
                chooseItem('1', text, foods, handleArr)
            })
            break;
        case '2' :
           return rl.question(listItem(drinks), function(text){
                chooseItem('2', text, drinks, handleArr)
            })
            break;
        case '3' :
           return rl.question(listItem(snacks), function(text){
                chooseItem('3', text, snacks, handleArr)
            })
            break;
        case '4' :
           return rl.question(listItem(desert), function(text){
                chooseItem('4', text, desert, handleArr)
            })
            break;
        case '5' :
           return rl.question(listItem(paket), function(text){
                chooseItem(5, text, paket, handleArr)
            })
            break;
        case '6' :
           return rl.question(listItem(happyMeal), function(text){
                chooseItem(6, text, happyMeal, handleArr)
            })
            break;        
        case '8' :
           return rl.question(handleCheckout(), function(inpt){
                if(inpt === "kembali"){
                    rl.question(handleHomeMenuText("hasList"), function(ans){
                        handleHomeMenu(ans)
                    })
                } else if(inpt === "bayar") {
                    rl.question("Ingin menggunakan QRIS atau Tunai?\n\ninput:", function(tra){
                        if(tra === "tunai"){
                            let result = 0
                            shop.forEach((item) => {
                                 result += item.price
                            })
                            printing.struct(shop, result, 'Unpaid', 'Tunai', 'Silahkan berikan kepada kasir untuk melanjutkan pemesanan.' )
                            console.log(result)
                            rl.close()
                        } else if(tra === "qris"){
                            console.log(`\n              Proses...`)
                            setTimeout(() => {
                                printing.qrCode()
                            },1500)
                        }

                        setTimeout(() => {
                            console.log(`\n\n\n\n\n\n\n\n\n
                       ----------------- Pembarayan berhasil -----------------\n\n`)

                        console.log(struct)
                        shop = []
            
                        },3500)

                        setTimeout(() => {
                            rl.question(handleHomeMenuText(""), function(ans){
                                handleHomeMenu(ans)
                            })
                        },8500)
                    })
                }
                
            })

            function handleCheckout(){
                let result = 0
                shop.forEach((val) => {
                    result += val.price
                })
                console.log(`
                Pesanan anda:
                ----------------------------`)
            shop.forEach(val => {
                console.log(`
                ${val.name}
                Rp${val.price},-
                ${val.qty}X
                ${val?.size ? val.size : ''}\n`)
            })
            console.log(`
                            Total: Rp${result},-
                ----------------------------
                Bayar        |       Kembali
                
                input: `)
                return
            }
            break;
        case 'back':
            rl.question(homeMenu, function(inp){
                handleHomeMenu(inp)
            })
            break;
        default :
         setTimeout(function () {
            if (input !== ans) {
                handleHomeMenu(dec)
            }
        }, 2500)
            console.log(`    Masukan anda salah \n`)
    }

}

// init pertanyaan
rl.question(handleHomeMenuText(""), function(ans){
    handleHomeMenu(ans)
})
