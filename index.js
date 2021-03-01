document.addEventListener("DOMContentLoaded", function(e) {
    fetchStart();


});

function fetchStart() {
    fetch('http://localhost:3000/pops')
    .then(res => res.json())
    .then(data => {
        data.forEach(pop => {
            let div = document.createElement('div');
            div.className = 'card';
            div.innerHTML = `<h2>${pop.name}</h2>
            <img alt="${pop.name}" src="${pop.image}" class="avatar" />
            <button class="btn">Remove</button>`;

            document.querySelector('#collection').append(div);
        })
    })
}