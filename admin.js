function AddDish() {
    var itemName = document.getElementById('itemName').value;
    var itemPrice = document.getElementById('price').value;
    var itemCategory = document.getElementById('category').value;
    var itemDelivery = document.getElementById('delivery').value;
    var itemImage = document.getElementById('dishImg').files[0];

    var currentUser = JSON.parse(localStorage.getItem('currentUser'));

    productItem = {
        itemAdmin: currentUser.email,
        itemName: itemName,
        itemPrice: itemPrice,
        itemCategory: itemCategory,
        itemDelivery: itemDelivery,
        itemImage: null
    }

    firebase.storage().ref('images').child(`${itemImage.name}`).put(itemImage).then((snapshot) => {
        firebase.storage().ref('images').child(`${itemImage.name}`).getDownloadURL()
            .then((url) => {
                productItem.itemImage = url;
                firebase.database().ref('Products').push(productItem);
                console.log('SuccessFully Done');
                window.location.reload();
            })
            .catch((error) => {
                console.log(error)
            });
    })
}


showProducts();


//Fetch Data From Firebase
function showProducts() {
    var myref = firebase.database().ref('Products');
    myref.on('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();

            var genHTML = ` <tr>
                                <th scope="row"><small>${childKey}</small></th>
                                <td> <div class="media">
                                        <img src="${childData.itemImage}" class="mr-3" alt="..." width="100">
                                    </div>
                              </td>
                                <td>${childData.itemName}</td>
                                <td>${childData.itemCategory}</td>
                                <td>${childData.itemDelivery}</td>
                                <td>${childData.itemPrice}</td>
                            </tr>`;

            document.getElementById('productTable').innerHTML += genHTML;
        });
    });
}


function showOrders() {
    var myref = firebase.database().ref('orders');
    myref.on('value', (snapshot) => {
        snapshot.forEach((childSnapshot, i) => {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();

            localStorage.setItem(childKey, JSON.stringify(childData));


            var orderHTML = `<div class="col-md-6">

            <div class="card">
                                    <div class="card-head bg-light pt-3 pl-3">
                                        <h5 class="card-title">Order ID<br>${childKey}</h5>
                                    </div>

                                    <div class="card-body">
                                        <h5 class="card-title">Customer - ${childData.customerName.name}</h5>
                                        <h6 class="card-subtitle mb-2 text-muted">Email - ${childData.customerName.email}</h6>
                                        <p class="card-text">${childData.customerName.city} , ${childData.customerName.country} </p>
                                        <p class="card-text text-danger">Items :   ${childData.quantity} </p>
                                        <p class="card-text text-danger">Order Status :   ${childData.status} </p>

                                        <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="orderStatus" id="Accepted${childKey}" value="accepted">
                                        <label class="form-check-label" for="Accepted">Accepted</label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="orderStatus" id="Rejected${childKey}" value="rejected">
                                        <label class="form-check-label" for="Rejected">Rejected</label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="orderStatus" id="Delivered${childKey}" value="delivered">
                                        <label class="form-check-label" for="Delivered">Delivered</label>
                                        </div>
                                    </div>

                                    <div class="card-footer bg-light">
                                        <button type="button" class="btn btn-danger" onclick='updateOrderStatus("${childKey}")'>Update</button>
                                        <button type="button" onclick='displayItems("${childKey}")' class="btn btn-danger float-right">View</button>
                                    </div>       
            
            
            </div>`
            document.getElementById('orderTable').innerHTML += orderHTML;
        });
    });
}

showOrders();


function updateOrderStatus(key) {
    var orderRef = firebase.database().ref('orders');

    if (document.getElementById(`Accepted${key}`).checked) {
        console.log('Accept');
        orderRef.child(`${key}`).update({
            "status": "accepted"
        });

    }
    else if (document.getElementById(`Rejected${key}`).checked) {
        console.log('reject');
        orderRef.child(`${key}`).update({
            "status": "rejected"
        });

    }
    else if (document.getElementById(`Delivered${key}`).checked) {
        console.log('delivered');
        orderRef.child(`${key}`).update({
            "status": "delivered"
        });

    }
    else {
        alert('Select a value');
    }

    window.location.reload();
}

function displayItems(childKey) {
    var url = 'orderDetails.html?data=' + childKey;
    window.open(url, '_blank').focus();

}


function logOut() {
    localStorage.clear()
    firebase.auth().signOut().then(() => {
        window.location.replace('login.html');
    }).catch((error) => {
        console.log(error)
    });
}
