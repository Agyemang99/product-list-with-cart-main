const desertContainer=document.getElementById("desert-container");
const shoppingCart=document.getElementById("shopping-cart")
const productContainer=document.getElementById("product-container")
const cartNumberOfItems=document.getElementById("cart-numb")
const description=document.getElementById("description")
const totalContainer=document.getElementById("total-container")
const orderConfirmation=document.getElementById("order-confirmation")


let data=[
    {   
       "image": {
            "thumbnail": "./assets/images/image-waffle-thumbnail.jpg",
            "mobile": "./assets/images/image-waffle-mobile.jpg",
            "tablet": "./assets/images/image-waffle-tablet.jpg",
            "desktop": "./assets/images/image-waffle-desktop.jpg"
       },
       "name": "Waffle with Berries",
       "category": "Waffle",
       "price": 6.50,
       "id":"waffle"
    },
    {
        "image": {
            "thumbnail": "./assets/images/image-creme-brulee-thumbnail.jpg",
            "mobile": "./assets/images/image-creme-brulee-mobile.jpg",
            "tablet": "./assets/images/image-creme-brulee-tablet.jpg",
            "desktop": "./assets/images/image-creme-brulee-desktop.jpg"
        },
        "name": "Vanilla Bean Crème Brûlée",
        "category": "Crème Brûlée",
        "price": 7.00,
        "id":"vanilla"
     },
     {
        "image": {
            "thumbnail": "./assets/images/image-macaron-thumbnail.jpg",
            "mobile": "./assets/images/image-macaron-mobile.jpg",
            "tablet": "./assets/images/image-macaron-tablet.jpg",
            "desktop": "./assets/images/image-macaron-desktop.jpg"
        },
        "name": "Macaron Mix of Five",
        "category": "Macaron",
        "price": 8.00,
        "id":"macaron"
     },
     {
        "image": {
            "thumbnail": "./assets/images/image-tiramisu-thumbnail.jpg",
            "mobile": "./assets/images/image-tiramisu-mobile.jpg",
            "tablet": "./assets/images/image-tiramisu-tablet.jpg",
            "desktop": "./assets/images/image-tiramisu-desktop.jpg"
        },
        "name": "Classic Tiramisu",
        "category": "Tiramisu",
        "price": 5.50,
        "id":"tiramisu"
     },
     {
        "image": {
            "thumbnail": "./assets/images/image-baklava-thumbnail.jpg",
            "mobile": "./assets/images/image-baklava-mobile.jpg",
            "tablet": "./assets/images/image-baklava-tablet.jpg",
            "desktop": "./assets/images/image-baklava-desktop.jpg"
        },
        "name": "Pistachio Baklava",
        "category": "Baklava",
        "price": 4.00,
        "id":"baklava"
     },
     {
        "image": {
            "thumbnail": "./assets/images/image-meringue-thumbnail.jpg",
            "mobile": "./assets/images/image-meringue-mobile.jpg",
            "tablet": "./assets/images/image-meringue-tablet.jpg",
            "desktop": "./assets/images/image-meringue-desktop.jpg"
        },
        "name": "Lemon Meringue Pie",
        "category": "Pie",
        "price": 5.00,
        "id":"pie"
     },
     {
        "image": {
            "thumbnail": "./assets/images/image-cake-thumbnail.jpg",
            "mobile": "./assets/images/image-cake-mobile.jpg",
            "tablet": "./assets/images/image-cake-tablet.jpg",
            "desktop": "./assets/images/image-cake-desktop.jpg"
        },
        "name": "Red Velvet Cake",
        "category": "Cake",
        "price": 4.50,
        "id":"cake"
     },
     {
        "image": {
            "thumbnail": "./assets/images/image-brownie-thumbnail.jpg",
            "mobile": "./assets/images/image-brownie-mobile.jpg",
            "tablet": "./assets/images/image-brownie-tablet.jpg",
            "desktop": "./assets/images/image-brownie-desktop.jpg"
        },
        "name": "Salted Caramel Brownie",
        "category": "Brownie",
        "price": 4.50,
        "id":"brownie"
     },
     {
        "image": {
            "thumbnail": "./assets/images/image-panna-cotta-thumbnail.jpg",
            "mobile": "./assets/images/image-panna-cotta-mobile.jpg",
            "tablet": "./assets/images/image-panna-cotta-tablet.jpg",
            "desktop": "./assets/images/image-panna-cotta-desktop.jpg"
        },
        "name": "Vanilla Panna Cotta",
        "category": "Panna Cotta",
        "price": 6.50,
        "id":"cotta"
     }
]




let basket=JSON.parse(localStorage.getItem("data")) || [];

let products=data;
desertContainer.innerHTML="";
products.forEach(({id,image,name,category,price}) => {
    let search=basket.find((x)=>x.id===id) || [];
    (desertContainer.innerHTML+=`
        <div id="product-id-${id}" class="dessert">
            <div class="image-container">
                <picture class="picture">
                    <source srcset="${image.desktop}" media="(min-width:1025px)" width="300px" height="250px">
                    <img src="${image.mobile}" alt="image.name" width="400px">
                </picture>
                <div class="btn">
                    <img class="decrement" onclick="decrementBtn(${id})" src="./assets/images/icon-decrement-quantity.svg">
                    <div id=${id} class="qty">${search.item===undefined ? 0 : search.item}</div>
                    <img class="increment" onclick="incrementBtn(${id})" src="./assets/images/icon-increment-quantity.svg"> 
                </div>
            </div>
            <div class="description">
                <p class="category">${category}</p>
                <p class="name">${name}</p>
                <p class="price"><span>$</span>${price}</p>
            </div>
        </div>
    `
    )
    
    
});




let incrementBtn=(id)=>{
    let selectedItem=id
    let search=basket.find((x)=>x.id===selectedItem.id)

    if(search===undefined){
        basket.push({
            id:selectedItem.id,
            item:1,
        })
    }
    else{
        search.item +=1;
    }
    
    update(selectedItem.id)

    generateCartItems()
    localStorage.setItem("data",JSON.stringify(basket))
    
}


let decrementBtn=(id)=>{
    let selectedItem=id
    let search=basket.find((x)=>x.id===selectedItem.id)

    if(search===undefined)return

    else if(search.item===0)return
    else{
        search.item -=1;
    }

    update(selectedItem.id)
    
    basket=basket.filter((x)=>x.item !== 0)


    generateCartItems()

    localStorage.setItem("data",JSON.stringify(basket))
    
}



let update=(id)=>{
    let search=basket.find((x)=>x.id===id);
    document.getElementById(id).innerHTML=search.item;
    calculation()
    totalAmount()
}

let calculation=()=>{
    cartNumberOfItems.innerHTML=(basket.map((x)=>x.item).reduce((x,y)=>x+y,0))
}



calculation();



let generateCartItems=()=>{
    if(basket.length!==0){
        description.style.display="none"
        return (shoppingCart.innerHTML=basket
            .map((x)=>{
                let{id,item}=x;
                let search=products.find((x)=>x.id===id)||[]
            return `
            <div class="cart-item">
               <div class="cart-price-name">
                <h4>${search.name}</h4>
                <div class="cart-price">
                  <p class="number-of-items">${item}x</p>
                  <p class="price-item">@$${search.price}</p>
                  <p class="price-total">$${search.price*item}</p>
                </div>
               </div>
               <img src="./assets/images/icon-remove-item.svg" class="close-btn" onclick="closeBtn(${id})">
            </div>
            `
        }).join(""))
        
    }
    else{
        shoppingCart.innerHTML="";
        description.style.display="block";
    }
}

generateCartItems()

let closeBtn=(id)=>{
    let selectedItem=id;
    basket=basket.filter((x)=>x.id!==selectedItem.id);
    generateCartItems()
    totalAmount()
    calculation();
    localStorage.setItem("data",JSON.stringify(basket))
}

let totalAmount=()=>{
    if(basket.length!==0){
        let amount=basket.map((x)=>{
            let {item,id}=x;
            let search=products.find((x)=>x.id===id)||[];
            return item  * search.price
        }).reduce((x,y)=>x+y,0)
        
        totalContainer.innerHTML=`
            <div class="total-container">
                <div class="total">
                    <p>Order Total</p>
                    <h1>$${amount}<h1>
                </div>
                <div class="total-description">
                    <img src="./assets/images/icon-carbon-neutral.svg" alt="icon-carbon-natural">
                    <p>This is <span class="carbon">carbon-neutral</span> delivery</p>
                </div>
                <div class="check-out-btn">
                    <button onclick="confirmBtn()">Confirm Order</button>
                </div>
            </div>
        `
    }
    else if(basket.length===0){
        totalContainer.innerHTML="";
    }

    else return
}

totalAmount()



let confirmBtn=()=>{
    
    if(basket!==0){
       
        return(orderConfirmation.innerHTML=basket
            .map((x)=>{
                let {item,id}=x;
                let search=products.find((x)=>x.id===id)||[];
                let {image,price,name}=search
                orderConfirmation.showModal()
                return `
                 <div class="confirm-modal">

                    <div class="cart-item">
                        <div><img width=50 height=40 src="${image.mobile}" ></div>
                        <div class="cart-price-name">
                            <h4>${name}</h4>
                            <div class="cart-price">
                                <p class="number-of-items">${item}x</p>
                                <p class="price-item">@$${price}</p>
                                <p class="price-total">$${price*item}</p>
                            </div>
                        </div>
                    </div>

                </div>

                `
                

            }).join("") )

        
    }

}



