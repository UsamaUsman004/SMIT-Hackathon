let googleSignin = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            var credential = result.credential;
            var token = credential.accessToken;
            var user = result.user;

            var { displayName, email, phoneNumber, photoURL } = user;
            setUser(displayName, email, phoneNumber, photoURL);

        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
            alert(errorMessage);
        });
}


function signin() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    if (document.getElementById('admin').checked) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                // console.log(user)

                var { displayName, email, phoneNumber, photoURL } = user;
                setUser(displayName, email, phoneNumber, photoURL);
                window.location.replace('admin.html');
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
            });
    }

    else if (document.getElementById('user').checked) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                // console.log(user)

                // var { displayName, email, phoneNumber, photoURL } = user;
                // setUser(displayName, email, phoneNumber, photoURL);
                window.location.replace('index.html');
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
            });
    }
    else {
        alert('Please Select a Role...');
    }

    // //Setting the fields to be empty
    // document.getElementById('email').value = '';
    // document.getElementById('password').value = '';
}

function signup() {
    var email = document.getElementById('uemail').value;
    var password = document.getElementById('upass').value;
    var name = document.getElementById('name').value;
    var country = document.getElementById('country').value;
    var city = document.getElementById('city').value;
    var urole = document.getElementById('user-signup');
    var restaurantRole = document.getElementById('res-signup');


    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            if (urole.checked) {
                setRole(name, country, city, email, urole.value)
            }
            else if (restaurantRole.checked) {
                setRole(name, country, city, email, restaurantRole.value)
            }
            else {
                alert('Please Select a Role...');
            }

        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
        });



    //Setting the fields to be empty    
    document.getElementById('uemail').value = '';
    document.getElementById('upass').value = '';
    document.getElementById('name').value = '';
    document.getElementById('country').value = '';
    document.getElementById('city').value = '';
}



function setRole(name, country, city, email, role) {
    // var database = firebase.database();
    var currentRole = {
        name: name,
        country: country,
        city: city,
        email: email,
        role: role,
        products: null
    }

    if (role == 'User') {
        firebase.database().ref(`${role}`).push({
            name, country, city, email,
        });
    }
    else if (role == 'Restaurant') {
        firebase.database().ref(`${role}`).push(currentRole);
    }
}


function setUser(displayName, email, phoneNumber, photoURL) {
    var user = { displayName, email, phoneNumber, photoURL };
    localStorage.setItem('currentUser', JSON.stringify(user));
}


function showUserProducts() {
    var myref = firebase.database().ref('Products');
    myref.on('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();

            // var objkey = Object.keys(childData)
            // var total_questions = objkey.length;
            // console.log(total_questions);

            // console.log(childData)

            var { itemAdmin, itemCategory, itemDelivery, itemName, itemPrice } = childData

            var genHTML = ` <div class="col-md-4 my-2" data-aos="slide-up">
                                <div class="card">
                                    <img src="https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                                        class="card-img-top productImg bg-dark" alt="..." style="height: 200px;width: auto;">

                                    <div class="card-body">
                                        <h5 class="card-title">${itemName}</h5>
                                        <p class="card-text">${itemCategory} - Rs. ${itemPrice} </p>
                                        <button  onclick="addToCart('${itemAdmin}','${itemName}','${itemCategory}','${itemDelivery}','${itemPrice}')"  class="btn btn-danger">Order Item</button>
                                    </div>
                                </div>
                            </div>`;

            document.getElementById('userProducts').innerHTML += genHTML;

        });
    });
}

showUserProducts();


// let allCarts = [];
// let carts = localStorage.getItem('carts');


// if (carts !== null) {
//     allCarts = JSON.parse(carts);
//     let cart_badge = document.getElementById('cartLength');
//     cart_badge.innerHTML = allCarts.length
// }

function placeOrder() {
    firebase.database().ref('orders').push(allCarts);
    // console.log(typeof allCarts);
    localStorage.clear();
    window.location.reload();
}

function logOut(){
    localStorage.clear()
    firebase.auth().signOut().then(() => {
        window.location.reload()
      }).catch((error) => {
        // An error happened.
      });
}

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        var myHtml = `<li class="media nav-item ms-4">
                        <img class="rounded-circle mr-2" width="40"
                            src="https://i.pinimg.com/236x/91/7c/38/917c386c14a06f567a86b72fb4994143.jpg">
                    </li>

                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            User
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a class="dropdown-item" href="#" onclick="logOut()">LogOut</a></li>

                        </ul>
                    </li>

                    <li class="nav-item">
                               <button type="button" class="btn btn-outline-light mx-2" type="button" data-bs-toggle="modal"
                            data-bs-target="#cartDetails">
                            <i class="fa fa-shopping-cart me-2" aria-hidden="true"></i>Order 
                            <span class="badge bg-light text-danger ms-2" id="cartLength">0</span>
                        </button>
                    </li>
                    `
        document.getElementById('UserArea').innerHTML += myHtml;

        // User is signed in.
    } else {
        var myHtml = `<li class="nav-item">
        <a class="btn btn-outline-light mx-2" href="login.html">
            <i class="fa fa-user me-2" aria-hidden="true"></i>Login
        </a>
    </li>`
        document.getElementById('UserArea').innerHTML += myHtml;
        // No user is signed in.
    }
});


