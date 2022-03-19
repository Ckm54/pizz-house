let deliveryCost = 200;
let delivery = false;

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

let quantity = 0
let totalOrderPrices = []

function getTotalQuantity(){
    quantity += 1;
    $("#item-total").text(quantity);
}

function getTotalMoney(prices, deliver){
    let total = 0;
    total += prices.reduce((a, b) => a + b);
    if(deliver === false){
        return total
    }else {
        return total + deliveryCost
    }
}
function deleteOrder(tid){
    $(tid).empty();
    $(tid).text("");
    $("#item-total").text("");
    getTotalMoney([0,0], false)
    window.location.reload();
}

$(document).ready(function () {

    $(".menu-item").hover(function () {
            $(this).find(".menu-info").show();
        }, function () {
            $(this).find(".menu-info").slideUp();
        }
    );

    $("button#place-order").hide()
    $("button.btn-add").click(function (e) { 
        e.preventDefault();
        $("button.btn-add").text("");
        $("button.btn-add").text("Add another Pizza");
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
        let thisOrder = new GetPizzaDetails(pizzaName, pizzaSize, pizzaCrust, pizzaTopping);
        // console.log(thisOrder.getOrderTotal())
        $("#order-table").append('<tr><td id="pizza-name">' + thisOrder.name + 
                            '</td><td id = "pizza-size">' + thisOrder.size + 
                            '</td><td id = "pizza-crust">' + thisOrder.crust + 
                            '</td><td id = "pizza-topping">' + thisOrder.topping.join(", ") +
                            '</td><td id = "order-total">' + thisOrder.getOrderTotal() + 
                            '</td></tr>');
        getTotalQuantity();
        totalOrderPrices.push(thisOrder.getOrderTotal())
    });

    $("button#checkout").click(function (e) { 
        e.preventDefault();
        let totalPayable = getTotalMoney(totalOrderPrices, false)
        $("button#checkout").hide();
        $("button#deliver").show();
        $("button#place-order").show();
        $("button.deliver").slideDown(1000);
        $("#delivery-cost").slideDown(1000);
        $("#order-total-message").append("Your total bill is Ksh. <span>" + totalPayable + '</span>');
        delivery = false
    });
    
    $("button#deliver").click(function (e) { 
        e.preventDefault();
        $(".delivery").show();
        let totalPayable = getTotalMoney(totalOrderPrices, true);
        $("#customer-message").text("");
        $("#order-total-message").text("")
        $("#order-total-message").append("Your total bill with delivery fee is Ksh. <span>" + totalPayable + '</span>');
        delivery = true
    });

    $("button#place-order").click(function (e) { 
        e.preventDefault();
        $("button#deliver").hide();
        $("button.btn-add").hide();
        $("button.btn-delete").hide();
        $("button#place-order").hide()
        let name = $("input#name").val();
        let mobile = $("input#phone").val();
        let location = $("input#location").val();

        if(delivery){
            let totalAmount = getTotalMoney(totalOrderPrices, true)
            if (name && mobile && location !== "") {
                $("#customer-message").append("Thank You, <span>" + name + "</span>, we have received your order and it will be delivered to you at <span>" + location + "</span>, please prepare Ksh. <span>" + totalAmount + "</span>");
                $("#customer-message").slideDown();
                $(".delivery").hide();
            } else {
                alert("Please fill in the details for delivery to be made");
                $(".delivery").show();
                $("button#place-order").show()
            } 
        }
        else {
            $("#customer-message").append("Your order is ready for pickup at our cafe. The total amount payable is Ksh. <span>" + getTotalMoney(totalOrderPrices, false) + "</span> Welcome!");
        }
    });

    $("button.btn-delete").click(function (e) { 
        e.preventDefault();
        deleteOrder("#order-table");
    });
});