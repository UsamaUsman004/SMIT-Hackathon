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

                console.log('SuccessFully Done')
            })
            .catch((error) => {
                console.log(error)
            });
    })

    // console.log(itemImage);
}


// function showProducts() {
//     console.log(document.getElementById('productTable').innerHTML);
// }

showProducts();
//Fetch Data From Firebase


//Fetch Data From Firebase
function showProducts() {
    var myref = firebase.database().ref('Products');
    myref.on('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();

            // var objkey = Object.keys(childData)
            // var total_questions = objkey.length;
            // console.log(total_questions);

            // console.log(childData)
            

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


// var mydata = [];

function showOrders() {
    var myref = firebase.database().ref('orders');
    myref.on('value', (snapshot) => {
        snapshot.forEach((childSnapshot, i) => {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();


            console.log(childData);

            localStorage.setItem(childKey, JSON.stringify(childData));

            // mydata = childData;

            // console.log(childData.customerName);
            // var myItem = JSON.stringify(childData.items)
            

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
// displayItems(${myItem},"${childKey}")
showOrders();

function displayItems(childKey) {

    var url = 'orderDetails.html?data='+childKey;
    window.open(url, '_blank').focus();
    // console.log('working')

    // for (let i = 0; i < e.length; i++) {
    //     var genItems = `<tr>
    //     <th scope="row">${e[i].itemName}</th>
    //     <td>${e[i].itemPrice}</td>
    //     <td>${e[i].itemCategory}</td>
    //     <td>${e[i].itemDelivery}</td>
    // </tr>`
    //     // console.log(people[i].first_name);
    //     document.getElementById('orderFoods' + `${key}`).innerHTML += genItems;
    // }

    // // console.log(document.getElementById(`orderFoods${key}`).innerHTML)
    // console.log(e.length);
    // console.log(key)
}

// function displayFood(e) {

//     // var myItem = JSON.stringify(e)
//     // var foodHTML = document.getElementById('orderFoods').innerHTML;for (var i = 0; i < childData.length; i++) {
//     var foodHTML = `<tr>
//                 <th scope="row">${childData.itemCategory}</th>
//                 <td>Mark</td>
//                 <td>Otto</td>
//                 <td>@mdo</td>
//             </tr>`

//     document.getElementById('orderFoods').innerHTML += foodHTML;
// }


// console.log(e);
// }
function logOut() {
    localStorage.clear()
    firebase.auth().signOut().then(() => {
        window.location.replace('login.html');
    }).catch((error) => {
        // An error happened.
    });
}
