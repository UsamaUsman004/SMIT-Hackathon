function AddDish() {
    var itemName = document.getElementById('itemName').value;
    var itemPrice = document.getElementById('price').value;
    var itemCategory = document.getElementById('category').value;
    var itemDelivery = document.getElementById('delivery').value;

    var currentUser = JSON.parse(localStorage.getItem('currentUser'));

    productItem = {
        itemAdmin: currentUser.email,
        itemName: itemName,
        itemPrice: itemPrice,
        itemCategory: itemCategory,
        itemDelivery: itemDelivery,
    }

    firebase.database().ref('Products').push(productItem);
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
                                <td>${childData.itemName}</td>
                                <td>${childData.itemCategory}</td>
                                <td>${childData.itemDelivery}</td>
                                <td>${childData.itemPrice}</td>
                            </tr>`;

            document.getElementById('productTable').innerHTML += genHTML;

        });
    });
}


var mydata = [];
function showOrders() {
    var myref = firebase.database().ref('orders');
    myref.on('value', (snapshot) => {
        snapshot.forEach((childSnapshot, i) => {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            console.log(childData);

            mydata = childData;

            // console.log(childData.length);
            var myItem = JSON.stringify(childData)
            // console.log(myItem);

            // var items = '';
            // for (var i = 0; i < childData.length; i++) {
            //     items += `<tr>
            //             <th scope="row">${childData[i].itemAdmin}</th>
            //             <td>Mark</td>
            //             <td>Otto</td>
            //             <td>@mdo</td>
            //         </tr>`
            // }

            var orderHTML = ` <div class="col-md-6">
                            <div class="card my-5">
                                <div class="card-body">
                                <h5 class="card-title">Order ID:</h5>
                                <h6 class="card-subtitle mb-2 text-muted">${childKey}</h6>
                                <p class="card-text">Total Items : ${childData.length}</p>
                                

                                <!-- Button trigger modal -->

                                    <button type="button" onclick='displayItems(${myItem},"${childKey}")' class="btn btn-danger" data-toggle="modal" data-target="#orderDetails">
                                        View Details
                                    </button>

                                    <!-- Modal -->
                                    <div class="modal fade" id="orderDetails" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">Order Details</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                                <table class="table">
                                                <thead>
                                                <tr>
                                                    <th scope="col">Item Name</th>
                                                    <th scope="col">Item Price</th>
                                                    <th scope="col">Item Category</th>
                                                    <th scope="col">Item Delivery</th>
                                                </tr>
                                                </thead>

                                            
                                                <tbody id="orderFoods${childKey}" >
                                                
                                                </tbody>


                                            </table>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                              </div>
                            </div>
            </div>`;

            document.getElementById('orderTable').innerHTML += orderHTML;
        });
    });
}

showOrders();

function displayItems(e, key) {

    for (let i = 0; i < e.length; i++) {
        var genItems = `<tr>
        <th scope="row">${e[i].itemName}</th>
        <td>${e[i].itemPrice}</td>
        <td>${e[i].itemCategory}</td>
        <td>${e[i].itemDelivery}</td>
    </tr>`
        // console.log(people[i].first_name);
        document.getElementById('orderFoods' + `${key}`).innerHTML += genItems;
    }

    // console.log(document.getElementById(`orderFoods${key}`).innerHTML)
    console.log(e.length);
    console.log(key)
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
function logOut(){
    localStorage.clear()
    firebase.auth().signOut().then(() => {
        window.location.replace('login.html');
      }).catch((error) => {
        // An error happened.
      });
}
