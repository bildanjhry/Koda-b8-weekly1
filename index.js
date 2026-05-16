const {createInterface} = require("node:readline")

const rl = createInterface({
    input: process.stdin,
    output: process.stdout
})

const foods = [
    {
        id:'f1',
        name:"McSpicy",
        price:44500,
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
        name:"PaMer 5 Krispy",
        price:100000,
        cat:{id:1, name: "food"},
        isPromo:false
    },
]

const drinks = [
    {
        id:'d1',
        name:"Iced Coffe",
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
]

const snacks = [
    {
        id:'s1',
        name:"Apple Pie",
        cat:{id:2, name: "drink"},
        harga:13000,
        isPromo:true
    },
    {
        id:'s2',
        name:"HashBrown",
        cat:{id:2, name: "drink"},
        harga:15000,
        isPromo:false
    },
    {
        id:'s3',
        name:"Sweet Corn",
        cat:{id:3, name: "snack"},
        harga:13000,
        isPromo:false
    },
    {
        id:'s4',
        name:"McFlurry Matcha Choco",
        cat:{id:3, name: "snack"},
        harga:18000,
        isPromo:false
    },
    {
        id:'s5',
        name:"Choco sundae",
        cat:{id:3, name: "snack"},
        harga:15000,
        isPromo:false
    },
]

const paket = [
    {
        id:'p1',
        name:"Paket Hemat",
        menu:[{
            item: foods[1], 
            qty:0
        },
        {
            item: foods[1], 
            qty:0
        }],
        price:0,
        isPromo:false,
    },
    {
        id:'p2',
        name:"Paket Kenyang",
        menu:[{
            item: foods[4],
            qty:0,
        }, 
        {
            item: drinks[1], 
            size:null,
            qty:0
        }, 
        {
            item: drinks[1],
            size: drinks[1].size[1],
            qty:0
        }, 
        { 
            item: drinks[4], 
            size:null,
            qty:0
        }],
        price:0,
        isPromo:false,
    },
    {
        id:'p3',
        name:"Paket Keluarga",
        menu:[{
            item :foods[4],
            qty:1
         }, 
         {
            item:foods[1],
            qty:1
        }, 
        { 
            item:drinks[2],
            qty:1,
        },
        {
            item: drinks[2],
            qty:3,
            size: drinks[1].size[1],
        }, 
        {
            item:snacks[4],
            qty:1
        }],
        price:0,
        isPromo:false,
    },
]

const shop = []

function handleHomeMenuText(stat){
 
    if(stat === 'hasList'){
    return `
    Home :
    1. Pilih Makan
    2. Pilih Minum
    3. Pilih Snacks 
    4. Pilih Paket
    -------------------------
    5. Checkout
    
    input: `
    }
    return `
    ----------- Selamat datang di McD ----------
    
    Home :
    1. Pilih Makan
    2. Pilih Minum
    3. Pilih Snacks 
    4. Pilih Paket
    
    input:  `
}


const printing = {
    product: function(value){
        if(Array.isArray(value) && value.length < 1){
            return console.log("Parameter product() beritipe array")
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
            const strList = itemList.map((item, index) => {
                `${index+1}. ${item.name}                  ${item.qty}x\n`
                `Rp${item.price},-                                   \n\n`
                
            })
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

// program untuk meng-handle menu utama
function handleHomeMenu(ans) {
    let input = null
    switch(ans){
        case '1' :
            rl.question(handleList('1'), function(text){
            input = '1'
        })
            break;
        case '2' :
            rl.question(handleList('2'), function(text){
            input = '2'
        })
            break;
        case '3' :
            rl.question(handleList('3'), function(text){
            input = '3'
        })
            break;
        case '4' :
            rl.question(handleList('4'), function(text){
            input = '4'
        })
            break;
        case '5' :
            rl.question(handleList('5'), function(text){
            input = '5'
        })
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
            console.log("Masukan anda salah \n")
    }

}

// init pertanyaan
rl.question(handleHomeMenuText(""), function(ans){
    handleHomeMenu(ans)
})
