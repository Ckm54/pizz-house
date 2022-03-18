function GetPizzaDetails(size, crust, topping){
    this.size = size;
    this.crust = crust;
    this.topping = topping;
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
        console.log(pizzaTopping)
    });
    
});