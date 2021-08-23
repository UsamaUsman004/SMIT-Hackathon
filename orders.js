function getData() {
    const data = new URLSearchParams(window.location.search).get('data');
    console.log(data);

    var order = JSON.parse(localStorage.getItem(data));
    console.log(order)

    document.getElementById('orderID').innerHTML += data;
    document.getElementById('customer').innerHTML += order.customerName.email;

    console.log(order.items)
    // console.log(order_id)

    // console.log(document.getElementById('orderItems').innerHTML);

    for (var i = 0; i < order.items.length; i++) {
        var orderHTML = `<tr>
                            <th scope="row">${i+1}</th>
                            <td>${order.items[i].itemName}</td>
                            <td>${order.items[i].itemPrice}</td>
                            <td>${order.items[i].itemCategory}</td>
                            <td>${order.items[i].itemAdmin }</td>
                            <td>${order.items[i].itemDelivery}</td>
                        </tr>`

        document.getElementById('orderItems').innerHTML += orderHTML
    }




    // var obj = Object.keys(question);
    // console.log(obj.length);


    // for (var i = 0; i < obj.length; i++) {
    //     var objInd = obj[i];
    //     questionsArray.push(question[objInd]);
    // }
    // console.log(questionsArray);


    // // Display Total Count of Questions
    // var qCount = document.getElementById('questionCount');
    // qCount.innerHTML = questionsArray.length;

}

getData();
