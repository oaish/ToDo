const eye = document.querySelector(".eye");
const user = document.querySelector("#usr");
const pass = document.querySelector("#pass");
const modal = document.querySelector(".modal");
const okBtn = document.querySelector(".btn-ok");
const login = document.querySelector(".AuthBtn");
const backCard = document.querySelector(".back");
const overlay = document.querySelector(".overlay");
const authBtn = document.querySelector(".AuthBtn");
const authText = document.querySelector(".AuthText");
const Auth = document.querySelector(".Authentication");
const themeCard = document.querySelector(".theme-card");
const loginAuth = document.querySelector(".login-btn-xl");
const signupAuth = document.querySelector(".signup-btn-xl");
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

let themes = [ "teal", "crimson", "blueviolet", "gold"]
let themeCount = 0;

loginAuth.addEventListener("click", () => {
    authText.innerHTML = "Login<span id='backBtn' class=\"close x\">&#xAB;</span>";
    authBtn.textContent = "Login";
    Auth.setAttribute("action", "/login")
    if (isMobile) {
        backCard.classList.add("fade-in");
    } else {
        backCard.classList.add("slide-out");
    }
    clearInput()
    addBackListener();
})

signupAuth.addEventListener("click", () => {
    authText.innerHTML = "SignUp<span id='backBtn' class=\"close y\">&#xAB;</span>";
    authBtn.textContent = "SignUp";
    Auth.setAttribute("action", "/signup")
    if (isMobile) {
        backCard.classList.add("fade-in");
    } else {
        backCard.classList.add("slide-out");
    }
    clearInput()
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
        eye.setAttribute("src", "/images/eye.svg")
    } else {
        pass.type = "text";
        eye.setAttribute("src", "/images/invisible.svg")
    }
}

pass.addEventListener("input", function () {
    if (pass.value) {
        eye.style.display = "unset";
    } else {
        eye.style.display = "none";
    }
})

login.onclick = async function (event) {
    event.preventDefault()
    if (user.value === "" || pass.value === "") {
        return
    }
    login.style.boxShadow = "inset -0.5rem 0.5rem 1rem rgba(0, 0, 0, 0.5)"

    let credentials = {
        username: user.value,
        password: pass.value
    }
    const action = Auth.getAttribute("action")
    if (action === "/signup") {
        const res = await fetch(action, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
        }).then(response => response.json())
            .then(data => {
                setTimeout(() => {
                    login.style.boxShadow = "-0.5rem 0.5rem 1rem rgba(0, 0, 0, 0.5)"
                }, 2000)
                data.auth && handleBackClick()
                modalDialog("block", data)
            })
    } else {
        const res = await fetch(action, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
        }).then(response => response.json())
            .then(data => {
                setTimeout(() => {
                    login.style.boxShadow = "-0.5rem 0.5rem 1rem rgba(0, 0, 0, 0.5)"
                }, 2000)
                if (data.error) {
                    modalDialog("block", data)
                } else if (data.auth) {
                    window.location.href = '/ToDo';
                }
            })
    }
}

okBtn.onclick = async function () {
    okBtn.style.boxShadow = "inset -0.5rem 0.5rem 1rem rgba(0, 0, 0, 0.5)"
    setTimeout(() => {
        okBtn.style.boxShadow = "-0.5rem 0.5rem 1rem rgba(0, 0, 0, 0.5)"
        modalDialog("none")
    }, 300)
}

themeCard.addEventListener('click', () => {
    const root = document.querySelector(":root")
    themeCount = themeCount === 3? 0 : ++themeCount
    themeCard.style.boxShadow = "none"
    setTimeout(() => {
        themeCard.style.boxShadow = "-1rem 1rem 1rem rgba(0, 0, 0, 0.5)"
        root.style.setProperty("--color", themes[themeCount])

    }, 500)
})


function clearInput() {
    user.value = "" 
    pass.value = ""
    pass.type = "password";
    eye.style.display = "none";
}

function modalDialog(option, err) {
    if (option === "block") {
        const {title, msg} = err
        const errTitle = document.querySelector(".err-title")
        const errMsg = document.querySelector(".err-msg")
        errTitle.textContent = title;
        errMsg.textContent = msg;
    }
    overlay.style.display = option
    modal.style.display = option
}