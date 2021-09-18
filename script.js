let itemOrders = [];
let orders = localStorage.getItem('Orders');

if (orders !== null) {
    itemOrders = JSON.parse(orders);
}


function setOrders() {
    var myref = firebase.database().ref('orders');
    myref.on('value', (snapshot) => {
        snapshot.forEach((childSnapshot, i) => {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();

            var ord = {
                key: childKey,
                data: childData
            }

            itemOrders.push(ord);
            localStorage.setItem('orders', JSON.stringify(itemOrders));
        });
    });
}

setOrders();


function showUserProducts() {
    var myref = firebase.database().ref('Products');
    myref.on('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            // console.log(childKey);

            var { itemAdmin, itemCategory, itemDelivery, itemName, itemPrice, itemImage } = childData

            var genHTML = ` <div class="col-md-4 my-2" data-aos="slide-up">
                                <div class="card">
                                    <img src="${itemImage}"
                                        class="card-img-top productImg bg-dark" alt="..." style="height: 200px;width: auto;">

                                    <div class="card-body">
                                        <h5 class="card-title">${itemName}</h5>
                                        <p class="card-text">${itemCategory} - Rs. ${itemPrice} </p>
                                        <p class="card-text text-muted">Restaurant -  ${itemAdmin} </p>
                                        <button  onclick="addToCart('${childKey}','${itemAdmin}','${itemName}','${itemCategory}','${itemDelivery}','${itemPrice}')"  class="btn btn-danger">Order Item</button>
                                    </div>
                                </div>
                            </div>`;

            document.getElementById('userProducts').innerHTML += genHTML;

        });
    });
}

showUserProducts();



firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        document.getElementById('orderBtn').style.display = "block";

        var current_user = JSON.parse(localStorage.getItem('currentUser'));
        var myHtml = `
        <li class="btn-group dropdown nav-link ">
        <a type="button" class="btn text-white dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                <img class="rounded-circle" width="40" style="margin-right:5px" src="https://i.pinimg.com/236x/91/7c/38/917c386c14a06f567a86b72fb4994143.jpg">
                ${current_user.name}
        </a>
        <ul class="dropdown-menu">
          <!-- Dropdown menu links -->
          <li><!-- Button trigger modal -->
          <button type="button" class="btn dropdown-item" data-bs-toggle="modal" data-bs-target="#UserProfile">
          Profile
          </button>
          </li>

          <li><!-- Button trigger modal -->
          <button type="button" class="btn dropdown-item" data-bs-toggle="modal" data-bs-target="#Status">
            Order Status
          </button>
          </li>

          <li><a class="dropdown-item" href="#" onclick="logOut()">LogOut</a></li>
        </ul>
      </li>


      <!-- Button trigger modal -->
        

        <!-- Status Modal -->
        <div class="modal fade" id="Status" tabindex="-1" aria-labelledby="StatusLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header text-dark">
                <h5 class="modal-title" id="StatusLabel">Orders</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" > 
                <table class="table text-center">
                <thead>
                <tr>
                    <th scope="col">Order ID</th>
                    <th scope="col">Item Quantity</th>
                    <th scope="col">Status</th>
                </tr>
                </thead>
                <tbody id="myOrderStatus">
                
                </tbody>
                </table>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
            </div>
        </div>
        </div>
      
      <!-- Profile Modal -->
          <div class="modal  fade" id="UserProfile" tabindex="-1" aria-labelledby="UserProfileLabel" aria-hidden="true">
            <div class="modal-dialog text-dark">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="UserProfileLabel">User Profile</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label for="userName" class="form-label">User Name</label>
                        <input type="text" class="form-control" id="userName" value="${current_user.name}" disabled>
                    </div>
                    <div class="mb-3">
                        <label for="userEmail" class="form-label">Email</label>
                        <input type="text" class="form-control" id="userEmail" value="${current_user.email}" disabled>
                    </div>
                    <div class="mb-3">
                        <label for="city" class="form-label">City</label>
                        <input type="text" class="form-control" id="city" value="${current_user.city}" disabled>
                    </div>
                    <div class="mb-3">
                        <label for="country" class="form-label">Country</label>
                        <input type="text" class="form-control" id="country" value="${current_user.country}" disabled>
                    </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
      
      `
        document.getElementById('UserArea').innerHTML += myHtml;

        orderStatus();
    } else {
        var myHtml = `<li class="nav-item">
                            <a class="btn btn-outline-light m-2" href="login.html">
                                <i class="fa fa-user me-2" aria-hidden="true"></i>Login
                            </a>
                        </li>`
        document.getElementById('UserArea').innerHTML += myHtml;
    }
});

function orderStatus() {
    var currentOrders = JSON.parse(localStorage.getItem('orders'));
    var current_user = JSON.parse(localStorage.getItem('currentUser'));

    for (var z = 0; z < currentOrders.length; z++) {
        if (current_user.email == currentOrders[z].data.customerName.email) {
            var ordHTML = `<tr>
                                <th scope="row">${currentOrders[z].key}</th>
                                <td>${currentOrders[z].data.quantity}</td>
                                <td>${currentOrders[z].data.status}</td>
                            </tr>`
            document.getElementById('myOrderStatus').innerHTML += ordHTML;
        }
        else {
            // document.getElementById('myOrderStatus').innerHTML = `<tr >
            // <td colspan="3" class="py-3">No Orders</td>
            // </tr>`;
        }
    }
}

