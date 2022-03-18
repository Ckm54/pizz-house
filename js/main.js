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

function getPizzaPrice(size) {
    let price = 0;
    switch (size) {
        case "small":
            price = pizzaPrices.small
            break;
        case "medium":
            price = pizzaPrices.medium
        case "large":
            price = pizzaPrices.large
    
        default:
            alert("Ensure you've chosen a correct size");
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

    });
    
});