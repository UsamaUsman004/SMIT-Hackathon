let allCarts = [];
let carts = localStorage.getItem('carts');

if (carts !== null) {
    allCarts = JSON.parse(carts);
    let cart_badge = document.getElementById('cartLength');
    cart_badge.innerHTML = allCarts.length
}


// Reducing the data by removing duplications
let myRedItems = allCarts.reduce(function (accumulator, currentElement) {
    let index = accumulator.findIndex(item => item.itemKey == currentElement.itemKey)
    if (index >= 0) {
        accumulator[index].itemQuantity += 1
        return [...accumulator]
    } else {
        return [...accumulator, { ...currentElement, itemQuantity: 1 }]
    }
    return accumulator
}, [])



let getItems = (items, id) => items.filter(item => item.id == id).map(item => { return { itemCategory: item.itemCategory,itemName: item.itemName, itemPrice: item.itemPrice, itemDelivery: item.itemDelivery, itemAdmin: item.itemAdmin, itemQuantity: item.itemQuantity } })

var reduceData = getItems(myRedItems, allCarts.itemKey);
// console.log(mydata.length)

// console.log(reduceData)

function addToCart(itemKey, itemAdmin, itemName, itemCategory, itemDelivery, itemPrice) {
    var itemObj = {
        itemKey: itemKey,
        itemAdmin: itemAdmin,
        itemName: itemName,
        itemCategory: itemCategory,
        itemDelivery: itemDelivery,
        itemPrice: itemPrice,
        itemQuantity: 1,
    }

    allCarts.push(itemObj)
    localStorage.setItem('carts', JSON.stringify(allCarts))
    window.location.reload();

}


function displayCarts() {
    for (let i = 0; i < reduceData.length; i++) {
        var cartHTML = ` <tr>
                                <th scope="row">${i + 1}</th>
                                <td>${reduceData[i].itemName}</td>
                                <td>${reduceData[i].itemPrice}</td>
                                <td>${reduceData[i].itemDelivery}</td>
                                <td>${reduceData[i].itemQuantity}</td>
                            </tr>`;

        document.getElementById('cartBody').innerHTML += cartHTML;
    }
}

displayCarts();

function placeOrder() {

    var customer = JSON.parse(localStorage.getItem('currentUser'));
    console.log(customer)

    var order ={
        customerName : customer,
        items :reduceData,
        quantity : allCarts.length,
        status : 'accepted'
    }

    // console.log(order)

    firebase.database().ref('orders').push(order);
    localStorage.removeItem('carts');
    window.location.reload();
}








