let allCarts = [];
let carts = localStorage.getItem('carts');


if (carts !== null) {
    allCarts = JSON.parse(carts);
    let cart_badge = document.getElementById('cartLength');
    cart_badge.innerHTML = allCarts.length
}


// Reducing the data by removing duplications
// let myRedItems = carts.reduce(function (accumulator, currentElement) {
//     let index = accumulator.findIndex(item => item.key == currentElement.key)
//     if (index >= 0) {
//         accumulator[index].quantity += 1
//         return [...accumulator]
//     } else {
//         return [...accumulator, { ...currentElement, quantity: 1 }]
//     }
//     return accumulator
// }, [])




function addToCart(itemAdmin, itemName, itemCategory, itemDelivery, itemPrice) {
    var itemObj = {
        itemAdmin: itemAdmin,
        itemName: itemName,
        itemCategory: itemCategory,
        itemDelivery: itemDelivery,
        itemPrice: itemPrice,
        itemQuantity: 1
    }

    allCarts.push(itemObj)
    localStorage.setItem('carts', JSON.stringify(allCarts))
    window.location.reload();

}


// let getItems = (items, id) => items.filter(item => item.id == id).map(item => { return { itemName: item.itemName, itemPrice: item.itemPrice, itemDelivery: item.itemDelivery, itemQuantity: item.itemQuantity } })

// var reduceData = getItems(myRedItems, carts.itemName);
// console.log(mydata.length)


// for (let i = 0; i < reduceData.length; i++) {
//     var tableData = `<tr>
//                                     <th scope="row">${i + 1}</th>
//                                     <td>${reduceData[i].itemName}</td>
//                                     <td>${reduceData[i].itemPrice}</td>
//                                     <td>${reduceData[i].itemDelivery}</td>
//                                     <td>${reduceData[i].itemQuantity}</td>
//                                     <td>Status</td>
//                                 </tr>`

//     document.getElementById('cartBody').innerHTML += tableData;
// }


function displayCarts() {
    for (let i = 0; i < allCarts.length; i++) {
        var cartHTML = ` <tr>
                                <th scope="row">${i + 1}</th>
                                <td>${allCarts[i].itemName}</td>
                                <td>${allCarts[i].itemPrice}</td>
                                <td>${allCarts[i].itemDelivery}</td>
                                <td>${allCarts[i].itemQuantity}</td>
                                <td>Status</td>
                            </tr>`;

        document.getElementById('cartBody').innerHTML += cartHTML;
    }
}

displayCarts();






