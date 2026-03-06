const inputUsername = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const signInBtn = document.getElementById("sign-in-btn");

// Go to Main Page
signInBtn.addEventListener("click", ()=>{
    if(inputUsername.value === "admin" && inputPassword.value === "admin123"){
        window.location.assign("/main.html");
    }
    else{
        alert("Wrong Username or Password!")
        return;
    }
})

