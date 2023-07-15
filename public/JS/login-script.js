const eye = document.querySelector(".eye")
const user = document.querySelector("#usr")
const pass = document.querySelector("#pass")
const login = document.querySelector(".AuthBtn")
const yesBtn = document.querySelector(".btn-yes")
const noBtn = document.querySelector(".btn-no")
const overlay = document.querySelector(".overlay")
const modal = document.querySelector(".modal")

const backCard = document.querySelector(".back");
const authText = document.querySelector(".AuthText");
const authBtn = document.querySelector(".AuthBtn");
const loginAuth = document.querySelector(".login-btn-xl");
const signupAuth = document.querySelector(".signup-btn-xl");
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

loginAuth.addEventListener("click", () => {
    authText.innerHTML = "Login<span id='backBtn' class=\"close x\">&#xAB;</span>";
    authBtn.textContent = "Login";
    if (isMobile) {
        backCard.classList.add("fade-in");
    } else {
        backCard.classList.add("slide-out");
    }
    addBackListener();
})
signupAuth.addEventListener("click", () => {
    authText.innerHTML = "SignUp<span id='backBtn' class=\"close y\">&#xAB;</span>";
    authBtn.textContent = "SignUp";
    if (isMobile) {
        backCard.classList.add("fade-in");
    } else {
        backCard.classList.add("slide-out");
    }
    addBackListener();
})

function addBackListener() {
    const backBtn = document.querySelector("#backBtn");
    backBtn.removeEventListener("click", handleBackClick);
    backBtn.addEventListener("click", handleBackClick);
}

function handleBackClick() {
    if (isMobile) {
        backCard.classList.remove("fade-in");
    } else {
        backCard.classList.remove("slide-out");
    }
}

eye.onclick = function () {
    if (pass.type === "text") {
        pass.type = "password";
        eye.setAttribute("src", "/images/invisible.svg")
    } else {
        pass.type = "text";
        eye.setAttribute("src", "/images/eye.svg")
    }
}

pass.addEventListener("input", function() {
    if (pass.value) {
        eye.style.display = "unset";
    } else {
        eye.style.display = "none";
    }
})

login.onclick = async function () {
    if (user.value === "" || pass.value === "") {
        return
    }
    login.style.boxShadow = "inset -0.5rem 0.5rem 1rem rgba(0, 0, 0, 0.5)"

    let credentials = {
        username: user.value,
        password: pass.value
    }

    const res = await fetch('/login',{
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    }).then(response => response.json())
        .then(data => {
            if (data.auth) {
                window.location.href = '/ToDo';
            } else {
                setTimeout(() => {
                    login.style.boxShadow = "-0.5rem 0.5rem 1rem rgba(0, 0, 0, 0.5)"
                }, 2000)
                modalDialog("block")
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

yesBtn.onclick = async function () {
    modalDialog("none")
    let credentials = {
        username: user.value,
        password: pass.value
    }
    const res = await fetch('/signup', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    })
}

noBtn.onclick = function () {
    modalDialog("none")
}

function modalDialog(option) {
    overlay.style.display = option
    modal.style.display = option
}