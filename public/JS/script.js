let tasks = {
    deleted: [],
    added: []
}

function strike(checkbox) {
    let label = checkbox.parentNode;
    if (checkbox.checked) {
        label.classList.add("strikethrough");
        remove(label.textContent.trim())
            .then(() => console.log("Done"))
        setTimeout(() => {
            let div = label.parentNode
            div.remove()
        }, 1200)
    }
}

const btn = document.querySelector(".sub-btn")
btn.addEventListener('click', add)

async function add(event) {
    event.preventDefault()
    let text = document.querySelector(".sub-text").value
    if (text === '') {
        return
    }
    let ins = {
        insert: text
    }
    const res = await  fetch('/add', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(ins)
    })
    location.reload()
}

async function remove(task) {
    let del = {
        delete: task
    }
    const res = await  fetch('/remove', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(del)
    })
}


const divs = document.querySelectorAll('.list-card');

// Function to apply animation classes
function animateDivs() {
    divs.forEach((div, index) => {
        setTimeout(() => {
            div.classList.add('animated');
        }, index * 150); // Delay each div by 500ms
    });
}

// Call the animateDivs function after the page loads
window.addEventListener('load', animateDivs);