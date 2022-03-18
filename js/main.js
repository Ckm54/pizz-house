function GetPizzaDetails(name, size, crust, topping){
    this.name = name;
    this.size = size;
    this.crust = crust;
    this.topping = topping;
}

GetPizzaDetails.prototype.getOrderTotal = function(){
     return getPizzaPrice(this.size) + getCrustPrice(this.crust) + getToppingPrice(this.topping)   
}
let pizzaPrices = {
    small: 600,
    medium: 800,
    large: 1000,
}

let crustPrices = {
    crispy: 200,
    stuffed: 150,
    "glutten free": 180, 
}

let toppingPrices = {
    pepperoni: 100,
    "green olives": 50,
    bacon: 120,
}

function getPizzaPrice(size) {
    let price = 0;
    switch (size) {
        case "small":
            price = pizzaPrices.small
            break;

        case "medium":
            price = pizzaPrices.medium
            break;

        case "large":
            price = pizzaPrices.large
            break;
    
        default:
            alert("Ensure you've chosen a correct size");
    }
    return price
}

function getCrustPrice(crust) {
    if (crust == "crispy") {
        return crustPrices.crispy;
    } else if (crust == "stuffed") {
        return crustPrices.stuffed;
    } else if (crust == "glutten-free") {
        return crustPrices["glutten free"];
    } else {
        alert("Error, Ensure you have chosen a correct crust type")
    }
}

function getToppingPrice(toppingList){
    let totalToppingPrice = 0
    for(let i = 0; i < toppingList.length; i = i + 1) {
        if (toppingList[i] == "bacon") {
            totalToppingPrice += toppingPrices.bacon
        } 
        if(toppingList[i] == "pepperoni"){
            totalToppingPrice += toppingPrices.pepperoni
        }
        if(toppingList[i] == "green-olives"){
            totalToppingPrice += toppingPrices["green olives"]
        }
    }
    return totalToppingPrice;
}

$(document).ready(function () {
    $("button.btn-add").click(function (e) { 
        e.preventDefault();
        let pizzaName = $("#name option:selected").val();
        let pizzaSize = $("#size option:selected").val();
        let pizzaCrust = $("#crust option:selected").val();
        let pizzaTopping = [];
        $.each($("input[name='toppings']:checked"), function () { 
            pizzaTopping.push($(this).val());
        });
        // console.log(getPizzaPrice(pizzaSize))
        // console.log(getCrustPrice(pizzaCrust))
        // console.log(getToppingPrice(pizzaTopping))
        // console.log(orderTotal)
        let thisOrder = new GetPizzaDetails(pizzaName, pizzaSize, pizzaCrust, pizzaTopping)
        console.log(thisOrder)
        console.log(thisOrder.getOrderTotal())
        $("#order").append('<tr><td id="pizza-name"> + ');
    });
    
});