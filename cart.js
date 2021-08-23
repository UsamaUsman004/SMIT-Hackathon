let allCarts = [];
let carts = localStorage.getItem('carts');


if (carts !== null) {
    allCarts = JSON.parse(carts);
    let cart_badge = document.getElementById('cartLength');
    cart_badge.innerHTML = allCarts.length
}

function addToCart(itemAdmin, itemName, itemCategory, itemDelivery, itemPrice) {
    var itemObj = {
        itemAdmin, itemName, itemCategory, itemDelivery, itemPrice
    }

    allCarts.push(itemObj)
    localStorage.setItem('carts', JSON.stringify(allCarts))
    window.location.reload();

}


function displayCarts() {
    for (let i = 0; i < allCarts.length; i++) {
        var cartHTML = ` <tr>
                                <th scope="row">${i+1}</th>
                                <td>${allCarts[i].itemName}</td>
                                <td>${allCarts[i].itemPrice}</td>
                                <td>${allCarts[i].itemDelivery}</td>
                                <td>Status</td>
                            </tr>`;

        document.getElementById('cartBody').innerHTML += cartHTML;
    }
}

displayCarts();






