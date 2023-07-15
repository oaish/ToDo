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
    const res = await  fetch('/ToDo/add', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(ins)
    }).then(res => res.json())
        .then(data => {
            data.success && location.reload()
        })
}

async function remove(task) {
    let del = {
        delete: task
    }
    const res = await  fetch('ToDo/remove', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(del)
    })
}


const divs = document.querySelectorAll('.list-card');

function animateDivs() {
    divs.forEach((div, index) => {
        setTimeout(() => {
            div.classList.add('animated');
        }, index * 150); // Delay each div by 500ms
    });
}

const logoutBtn = document.querySelector(".logout")
logoutBtn.addEventListener('click', async () => {
    const res = await fetch('/logout', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({destroy: true})
    })
        .then(res => res.json())
        .then(data => data.destroy && (window.location.href = '/'))
})

// Call the animateDivs function after the page loads
window.addEventListener('load', animateDivs);