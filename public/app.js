document.addEventListener("DOMContentLoaded", event =>{
    const app = firebase.app();
    console.log(app); 
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {      

                    console.log("there name");
                    console.log(user.displayName);
                    userName = user.displayName;
                    userID = user.uid;
                    userPhoto = user.photoURL || './img/user.png';

                
                   
            localStorage.uName = userName;
            localStorage.idUser = userID;
            localStorage.photoUser = userPhoto;
            console.log(userName);
            $('.loginOvr').removeClass("activeLgn");
            $('.loginOvr').hide();
            $('.profImg').show();
            $('.profImg').children('.img_profile').attr("src",localStorage.photoUser);
            $('.profPic').attr("src",localStorage.photoUser);
            loginBtn.hide();
            $('.profName').html(localStorage.uName);

            console.log(user);
            console.log(user.uid);

            // logoutBtn.style.display = "inline";
          } else {
            console.log("KDD User lagi boy");
            $('.profImg').hide();
            loginBtn.show();
            $('.greeting').hide();
            
          }
        
        });
});


let userName = '';
let tempName;
let userID = '';
let userPhoto = '';


if (localStorage.uName) {
    userName = localStorage.uName;
    userID = localStorage.idUser;
    userPhoto = localStorage.photoUser;
    console.log("terdapat data terdahulu");
    
  } else {
    localStorage.uName = '';
    localStorage.idUser = '';
    localStorage.photoUser = '';
  }
// localStorage.setItem("uName", userName);
console.log(localStorage.getItem("uName"));
console.log(userName);
console.log(userID);

let loginSec = $('.loginSec');
let anonymLogin = $('.guestNameInput');
let loginBtn = $('.login');
let logoutBtn = document.querySelector('.logout');


function checkuserLog() {
    console.log("cek cek");
    
        if (userName != '')
            return true;
        else{
            $(".alertStart").show();
            return false;
        }
}
function displayProf() {
    $('.profOvr').addClass('profOvrON');
}
function hideProf() {
    $('.profOvr').removeClass('profOvrON');
}
function login() {
    $('.loginOvr').addClass("activeLgn");
    $('.loginOvr').show();
    displayLogin();
    console.log("KDD User lagi boy");
}
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
                email: user.email,
                photo: './img/user.png'
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
                    email: user.email,
                    photo: user.photoURL
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
    if (!user) {
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
                            score: score,
                            photo: userPhoto         
                        });
                        console.log("Leaderboard successfully updated!");
                    }
                    });
                
                
            } else {
                usersRef.set({
                    user: userName,
                    score: score,
                    photo: userPhoto  
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
    $('.list').empty();
    let count = 0;
    let top1= $('.one');
    let top2 =  $('.two');
    let top3 = $('.three');
    let mine = '';
    let prof;
    const db = firebase.firestore();
    
    // Get the top 5 scores from our scoreboard
    db.collection("high-score").orderBy("score", "desc").get().then((snapshot) => {
        snapshot.forEach((doc) => {
            if (doc.data().user == userName) {
                mine = 'meeh';
            }else
                mine ='';
            count = count+1;
            prof =  doc.data().photo || './img/user.png';
            if (count < 4) {
                switch (count) {
                    case 1:
                        top1.children(".name").html( doc.data().user);
                        top1.children(".pic").css("background-image","url("+prof+")")
                        top1.children(".score").html( doc.data().score);
                        break;
                    case 2:
                        top2.children(".name").html( doc.data().user);
                        top2.children(".pic").css("background-image","url("+prof+")")
                        top2.children(".score").html( doc.data().score);
                        break;
                    case 3:
                        top3.children(".name").html( doc.data().user);
                        top3.children(".pic").css("background-image","url("+prof+")")
                        top3.children(".score").html( doc.data().score);
                        break;
                    default:
                        break;
                }
            } else {
                document.querySelector('.list').innerHTML += "<div class=\"item " +mine+ "\"><div class=\"pos\">"+count+
                "</div><div class=\"pic\" style=\" background-image:url("+ prof+  ")\"></div><div class=\"name\">" +
                 doc.data().user  +
                "</div><div class=\"score\">"+
                doc.data().score +
                " </div></div>";
                
            }
           
            console.log(count);``
            
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
function AlertLogin() {
    $('.alertStart').hide();
    login();
}
function alertGuest(){
    if (userName = '') {
        alert("You're using guest mode, \n Jadi Cuma boleh sampai 10 soal aja ya");
        return true;
    }else
        return false;
}