const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
let toyList = document.querySelector('#toy-collection');

function swagarino(toyObj) {
  let card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = ` 
    <h2>${toyObj.name}</h2>
    <img src="${toyObj.image}" class="toy-avatar" />
    <p>${toyObj.likes} Likes </p>
    <button class="like-btn" id="${toyObj.id}" data-likes = ${toyObj.likes}>Like <3</button>
  `;
  toyList.appendChild(card);
}

function createToy(newToy) {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      accepts: "application/json"
    },
    body: JSON.stringify(newToy)})
    .then(function(response) {return response.json()})
    .then(swagarino);
}

document.body.addEventListener('click', function (e) {
  if (e.target.innerText === 'Like <3') {
    e.target.dataset.likes = parseInt(e.target.dataset.likes) + 1
    fetch(`http://localhost:3000/toys/${e.target.id}`, {
      method: "PATCH",
      headers: {
      "Content-Type" : "application/json",
      Accept: "application/json"
      },
      body: JSON.stringify({ 
        "likes": `${e.target.dataset.likes}`
      })
    })
    e.target.parentNode.querySelector('p').innerText = `${e.target.dataset.likes} Likes`
  }
})

document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:3000/toys")
  .then(function(response) {return response.json()})
  .then(function (toys) { 
  toys.forEach(swagarino);

  })
})

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    toyForm.addEventListener('submit', function(event) {
      event.preventDefault()
      let newToy = { name: `${event.target.name.value}`, image: `${event.target.image.value}`, likes: 0 };
      createToy(newToy);
    })
  } else {
    toyForm.style.display = 'none'
  }
})