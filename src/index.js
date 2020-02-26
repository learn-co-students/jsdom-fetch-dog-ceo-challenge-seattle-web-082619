const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'

document.addEventListener("DOMContentLoaded", () => {
  fetchDogImages();

  const breedDropdown = document.getElementById('breed-dropdown')
  breedDropdown.addEventListener("change", filterDogBreeds);

  fetchDogBreeds();
});

function fetchDogImages() {
  fetch(imgUrl)
    .then(res => res.json())
    .then(dogImgs => {
      addImages(dogImgs.message);
    });
}

function addImages(dogImgs) {
  const imageUl = document.getElementById('dog-image-container');

  for(dogImg of dogImgs) {
    const li = document.createElement('li');
    const img = document.createElement('img');

    img.src = dogImg;
    li.appendChild(img);
    imageUl.appendChild(li);
  }
}

function filterDogBreeds() {
  const breedsUl = document.getElementById('dog-breeds');
  breedsArray = breedsUl.getElementsByTagName('li')
  for (breed of breedsArray) {
    let filterValue = this.value;
    if (breed.innerText[0] !== filterValue)
      breed.style.display = "none"
    else 
      breed.style.display = ""
  }
}

function fetchDogBreeds() {
  fetch(breedUrl)
    .then(res => res.json())
    .then(dogBreeds => {
      addBreeds(dogBreeds.message);
    });
}

function addBreeds(dogBreeds) {
  for(breed in dogBreeds) {
    if(dogBreeds[breed].length) {
      for(subBreed of dogBreeds[breed]) {
        addLiToBreeds(breed, subBreed);
      }
    } else {
      addLiToBreeds(breed);
    }
  }

  function addLiToBreeds(breed, subBreed) {
    const breedsContainer = document.getElementById('dog-breeds');
    const li = document.createElement('li');

    li.textContent = breed;
    li.addEventListener("click", clickDogs);
    if(subBreed)
      li.textContent = subBreed + ' ' + breed;
    breedsContainer.appendChild(li);
  }
}

function clickDogs() {
  this.style.color = "red"
}
