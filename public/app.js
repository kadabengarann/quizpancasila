document.addEventListener("DOMContentLoaded", event =>{
    const app = firebase.app();
    console.log(app); 
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {      
            if (user.isAnonymous) {
                userName = "guest";
                userID = user.uid;
            } 
            else{
                if (user.displayName) {
                    console.log("there name");
                    console.log(user.displayName);
                    userName = user.displayName;
                    userID = user.uid;
                }
                else{
                    console.log("null name");
                    console.log(user.displayName);
                    userName = tempName;
                    userID = user.uid;
                }
                
            }        
            localStorage.uName = userName;
            localStorage.idUser = userID;
            console.log(userName);
            $('.loginOvr').removeClass("activeLgn");
            $('.loginOvr').hide();
            $('.greeting').show();
            $('.greeting').children().html('Hi, '+ localStorage.uName+'!')

            console.log(user);
            console.log(user.uid);

            // logoutBtn.style.display = "inline";
          } else {
            // No user is signed in.
            $('.loginOvr').addClass("activeLgn");
            $('.loginOvr').show();
            displayLogin();
            console.log("KDD User lagi boy");

            $('.greeting').hide();
            
          }
        
        });
});


let userName = '';
let tempName;
let userID = '';


if (localStorage.uName) {
    userName = localStorage.uName;
    userID = localStorage.idUser;
    console.log("terdapat data terdahulu");
    
  } else {
    localStorage.uName = '';
    localStorage.idUser = '';
  }
// localStorage.setItem("uName", userName);
console.log(localStorage.getItem("uName"));
console.log(userName);
console.log(userID);

let loginSec = $('.loginSec');
let anonymLogin = $('.guestNameInput');
let loginBtn = document.querySelectorAll('.login');
let logoutBtn = document.querySelector('.logout');


function emailSign() {
    let email = $('#email').val();
    let name = $('#name').val();
    let password = $('#password').val();
    let alert = $('.alert');
    alert.hide();
    if (email != '' && password != '') {
        $('.ovrLoad').css({"display": "flex"});
        $('.ovrLoad').children().show();
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(result=>{
            $('.ovrLoad').css({"display": "none"});
            $('.ovrLoad').children().hide();
            const user = result.user;
            tempName = name;
            let userKirim = {
                name: name,
                uid: user.uid,
                email: user.email
            }
            writeUserData(userKirim);
            return result.user.updateProfile({
              displayName: name
            });
          }).catch(function(error) {
            $('.ovrLoad').css({"display": "none"});
            $('.ovrLoad').children().hide();
            var errorCode = error.code;
            var errorMessage = error.message;
            alert.show();
            alert.html(errorMessage)
            
            console.log(errorCode);
            console.log(errorMessage);
          });
    }else{
        alert.show();
        console.log("ISI NJING");
        alert.html("Field should not be empty!")
    }  
    
}

function emaillogin() {
    let email = $('#email').val();
    let password = $('#password').val();
    let alert = $('.alert');
    alert.hide();
    if (email != '' && password != '') {
        $('.ovrLoad').css({"display": "flex"});
        $('.ovrLoad').children().show();
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function () {
            $('.ovrLoad').css({"display": "none"});
            $('.ovrLoad').children().hide();
        })
        .catch(function(error) {
            $('.ovrLoad').css({"display": "none"});
            $('.ovrLoad').children().hide();
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert.show();
            if (errorCode == "auth/wrong-password") {
                alert.html("Wrong password")
            } else if (errorCode == "auth/user-not-found") {
                alert.html("User not found!")
            }else {
                alert.html(errorMessage)
            }
            console.log(errorCode);
            console.log(errorMessage);
        });
    }else{
        alert.show();
        console.log("ISI NJING");
        alert.html("Field should not be empty!")
        // alert("Field should not be empty!")
    }
    
    

}
function googlelogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope(`profile`);
    provider.addScope(`email`);
    provider.addScope(`https://www.googleapis.com/auth/plus.me`);

    firebase.auth().signInWithPopup(provider)
            .then(result=>{
                const user = result.user;
                console.log(user.displayName);
                console.log(user);
                let userKirim = {
                    name: user.displayName,
                    uid: user.uid,
                    email: user.email
                }
                writeUserData(userKirim)
                
                
            })

}

function anonymlogin(){
    $('.ovrLoad').css({"display": "flex"});
    $('.ovrLoad').children().show();
    firebase.auth().signInAnonymously()
    
    .then(result => {
        $('.ovrLoad').css({"display": "none"});
        $('.ovrLoad').children().hide();
        const user = result.user;
        console.log("HAH");
        user.displayName = 'guest6969';
        userID = 'haha';
        console.log(user.displayName);
        
    })
    .catch(function(error) {
        // Handle Errors here.
        $('.ovrLoad').css({"display": "none"});
        $('.ovrLoad').children().hide();
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
}

function logout() {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        console.log("Logged out");
        userName = '';
        userID = '';
        
      }, function(error) {
        // An error happened.
        console.log("Fail to log out");
      });
    
}



function writeUserData(user) {
    const db = firebase.firestore();
    let usersDB = db.collection("user-list").doc(user.uid);
        usersDB.get()
        .then((docSnapshot) => {
            if (docSnapshot.exists) {
                usersDB.onSnapshot((doc) => {
                
                console.log("User is already in database!");
            });
            } else {
                usersDB.set(user) // create the document
                console.log("User DB successfully Added!");
            };
        })
        .catch(function(error) {
            console.error("Error writing User DB: ", error);
        });
    
}

function saveScore(score) {
    const db = firebase.firestore();
    // Make sure name has a value, if not send alert.
    var user = firebase.auth().currentUser;
    let tempScore;
    if (user.isAnonymous) {
        alert("You're using guest account, your progress will not be updated to leaderboard");
    }
    else{
        let usersRef = db.collection("high-score").doc(userID);       
        usersRef.get()
        .then((docSnapshot) => {
            if (docSnapshot.exists) {
                tempScore = docSnapshot.data().score;
                    usersRef.onSnapshot((doc) => {
                        // do stuff with the data
                        if (tempScore < score) {
                        usersRef.update({
                            user: userName,
                            score: score          
                        });
                        console.log("Leaderboard successfully updated!");
                    }
                    });
                
                
            } else {
                usersRef.set({
                    user: userName,
                    score: score
                }) // create the document
                console.log("Leaderboard successfully written!");
            };
        })
        .catch(function(error) {
            console.error("Error writing Leaderboard: ", error);
        });
    }
    
}

function updateScores() {
    const db = firebase.firestore();
    // Clear current scores in our scoreboard
    document.getElementById('scoreboard').innerHTML = '<tr><th>Name</th><th>Score</th></tr>';
    
    // Get the top 5 scores from our scoreboard
    db.collection("high-score").orderBy("score", "desc").get().then((snapshot) => {
        snapshot.forEach((doc) => {
            document.getElementById('scoreboard').innerHTML += '<tr>' +
            '<td>' + doc.data().user + '</td>' +
            '<td>' + doc.data().score + '</td>' +
            '</tr>';
        })
    })
}

function displaylogout() {
    logoutBtn.style.display = "inline";
}
function displayLogin(){
    $('.loader').show();
    $('.authContainer').load("login.html", function() {
        $('.loader').hide();
      }); 
}
function displaySignup(){
    console.log("switched");
    
    $('.loader').show();
    $('.authContainer').load("signup.html", function() {
        $('.loader').hide();
      }); 
}

function alertGuest(){
    var user = firebase.auth().currentUser;

    if (user.isAnonymous) {
        alert("You're using guest mode, \n Jadi Cuma boleh sampai 10 soal aja ya");
    }

    return user.isAnonymous;
}