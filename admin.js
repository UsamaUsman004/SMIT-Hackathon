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
        itemImage : null
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
                                <th scope="row">${childKey}</th>
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

            var orderHTML = ` <div class="col-md-6">
                            <div class="card my-5">
                                <div class="card-body">
                                <h5 class="card-title">Order ID:</h5>
                                <h6 class="card-subtitle mb-2 text-muted">${childKey}</h6>
                                <p class="card-text">Customer Email : ${childData.customerName.email}</p>
                                <p class="card-text">Total Items : ${childData.items.length}</p>
                                <button type="button" onclick='displayItems("${childKey}")' class="btn btn-danger">
                                        View Details
                                </button>
                                </div></div></div>
                                `;

            document.getElementById('orderTable').innerHTML += orderHTML;
        });
    });
}

showOrders();

function displayItems(childKey) {
    var url = 'orderDetails.html?data='+childKey;
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
