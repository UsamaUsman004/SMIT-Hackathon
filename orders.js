function getData() {
    const data = new URLSearchParams(window.location.search).get('data');
    console.log(data);

    var order = JSON.parse(localStorage.getItem(data));
    console.log(order)

    document.getElementById('orderID').innerHTML += data;
    document.getElementById('customer').innerHTML += order.customerName.email;

    console.log(order.items)

    for (var i = 0; i < order.items.length; i++) {
        var orderHTML = `<tr>
                            <th scope="row">${i+1}</th>
                            <td>${order.items[i].itemName}</td>
                            <td>${order.items[i].itemPrice}</td>
                            <td>${order.items[i].itemCategory}</td>
                            <td>${order.items[i].itemAdmin }</td>
                            <td>${order.items[i].itemDelivery}</td>
                            <td>${order.items[i].itemQuantity}</td>

                        </tr>`

        document.getElementById('orderItems').innerHTML += orderHTML
    }
}

getData();
