function showUserProducts() {
    var myref = firebase.database().ref('Products');
    myref.on('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();

            var { itemAdmin, itemCategory, itemDelivery, itemName, itemPrice, itemImage } = childData

            var genHTML = ` <div class="col-md-4 my-2" data-aos="slide-up">
                                <div class="card">
                                    <img src="${itemImage}"
                                        class="card-img-top productImg bg-dark" alt="..." style="height: 200px;width: auto;">

                                    <div class="card-body">
                                        <h5 class="card-title">${itemName}</h5>
                                        <p class="card-text">${itemCategory} - Rs. ${itemPrice} </p>
                                        <p class="card-text text-muted">Restaurant -  ${itemAdmin} </p>
                                        <button  onclick="addToCart('${itemAdmin}','${itemName}','${itemCategory}','${itemDelivery}','${itemPrice}')"  class="btn btn-danger">Order Item</button>
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

        document.getElementById('orderBtn').style.display="block";

        var current_user = JSON.parse(localStorage.getItem('currentUser'));
        var myHtml = `<li class="media nav-item ms-4 my-2">
                        <img class="rounded-circle mr-2" width="40"
                            src="https://i.pinimg.com/236x/91/7c/38/917c386c14a06f567a86b72fb4994143.jpg">
                    </li>

                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle my-2" href="#" id="navbarDropdown" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            ${current_user.email}
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a class="dropdown-item" href="#" onclick="logOut()">LogOut</a></li>

                        </ul>
                    </li>
                    `
        document.getElementById('UserArea').innerHTML += myHtml;

        // User is signed in.
    } else {
        var myHtml = `<li class="nav-item">
        <a class="btn btn-outline-light m-2" href="login.html">
            <i class="fa fa-user me-2" aria-hidden="true"></i>Login
        </a>
    </li>`
        document.getElementById('UserArea').innerHTML += myHtml;
        // No user is signed in.
    }
});


