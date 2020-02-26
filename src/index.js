console.log('%c HI', 'color: firebrick')
const imgURL = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'

document.addEventListener('DOMContentLoaded', () => {
  createUl();
  fetchImages();
  fetchBreeds();
})

function createUl() {
  const imgUl = document.createElement('ul')
  imgUl.id = 'dog-image-list'
  const imgDiv = document.getElementById('dog-image-container')
  imgDiv.appendChild(imgUl)
}

function fetchImages() {
  fetch(imgURL)
  .then( res => res.json() )
  .then( json => addAllImages(json) )
}

function addAllImages(json) {
  json.message.forEach( img => addImages(img) )
}

function addImages(img) {
  const imgUl = document.getElementById('dog-image-list')
  const imgLi = document.createElement('li')
  const newImg = document.createElement('img')
  newImg.setAttribute('src', img)
  newImg.setAttribute('alt', 'dog picture')
  newImg.setAttribute('width', '200px')
  imgLi.appendChild(newImg)
  imgUl.appendChild(imgLi)
}

function fetchBreeds() {
  fetch(breedUrl)
  .then( res => res.json() )
  .then( json => addAllBreeds(json.message) )
}

function addAllBreeds(breeds) {
  const dogBreeds = Object.keys(breeds)
  dogBreeds.forEach( breed => addBreeds(breed) )
  dogClick();
  dropDown();
}

function addBreeds(breed) {
  const breedsUl = document.getElementById('dog-breeds')
  const breedsLi = document.createElement('li')
  breedsLi.innerText = breed
  breedsUl.appendChild(breedsLi)
}

function dogClick() {
  document.querySelectorAll('li').forEach( (li) => {
    li.addEventListener('click', () => {
       li.style.color = '#00ffcc';
    })
  })
}

function dropDown() {
  const drop = document.getElementById('breed-dropdown')
  drop.addEventListener('change', () => {
    const breeds = document.getElementById('dog-breeds')
    breeds.querySelectorAll('li').forEach( (li) => {
      li.style.display = 'list-item';
      if (drop.value !== li.innerText.slice(0, 1) && drop.value !== "all-breeds") {
        li.style.display = 'none';
      }
    })
  })
}
