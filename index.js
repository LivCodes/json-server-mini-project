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
            <p>${pop.likes}</p>
            <button class='btn like'>Like</button>
            <button class="btn">Remove</button>`;

            document.querySelector('#collection').append(div);
            deleteFromCollection(div)
            likeFeat(div);
        })
        
    })
}

function addToCollection(e) {
    e.preventDefault();
    // user inputs name and url 
    // submit event adds new pop to "pops" 
    
   let name = document.getElementById("name-input").value
   let url = document.getElementById("img-url-input").value
   fetch(`http://localhost:3000/pops?name=${name}`)
   .then(res => res.json())
   .then(data => {
       if(data[0].length === 0) {
        let options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
             name : name,
             image  : url,
             likes : 0
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
        <p>0</p>
        <button class='btn like'>Like</button>
        <button class="btn">Remove</button>`;
        deleteFromCollection(div)
        likeFeat(div);
        document.querySelector('#collection').append(div);
       } else {
           console.log("toy already exists!")
       }
   })
   
    e.target.reset();
    
}

function deleteFromCollection(card) {
    let btn = card.children[4]
    let name = card.children[0].innerText

    btn.addEventListener("click", () => {
        fetch(`http://localhost:3000/pops?name=${name}`)
        .then(response => response.json())
        .then(data => {
            console.log(data[0].id)
            let options = {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            fetch(`http://localhost:3000/pops/${data[0].id}`, options)
        })
        card.remove()
    })
}

function likeFeat(card) {
    let like = card.children[3];
    let likeCount = parseInt(card.children[2].innerText);
    const name = card.children[0].innerText;

    console.log(like, likeCount)
    like.addEventListener('click', function(e) {
       
        likeCount ++
        card.children[2].innerText = likeCount
    
        fetch(`http://localhost:3000/pops?name=${name}`)
        .then(res => res.json())
        .then(data => {
            let options = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify
                ({
                    likes: parseInt(card.children[2].innerText)
                })
            }

            fetch(`http://localhost:3000/pops/${data[0].id}`, options);
           
        })
        
    })
}
