document.addEventListener("DOMContentLoaded", function(e) {
    fetchStart();
    let form = document.querySelector(".add-form")
    form.addEventListener("submit", addToCollection)

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

function addToCollection(e) {
    e.preventDefault();
    // user inputs name and url 
    // submit event adds new pop to "pops" 
   let name = document.getElementById("name-input").value
   let url = document.getElementById("img-url-input").value
    let options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
         name : name,
         image  : url
        })
    }
    fetch('http://localhost:3000/pops', options)
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })

    let div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `<h2>${name}</h2>
    <img alt="${name}" src="${url}" class="avatar" />
    <button class="btn">Remove</button>`;

    document.querySelector('#collection').append(div);
    
}