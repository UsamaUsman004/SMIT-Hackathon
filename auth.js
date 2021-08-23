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

                var { displayName, email, phoneNumber, photoURL } = user;
                setUser(displayName, email, phoneNumber, photoURL);
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
    // alert('Working')
}