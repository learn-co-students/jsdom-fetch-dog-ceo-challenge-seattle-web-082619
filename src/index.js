console.log('%c HI', 'color: firebrick')

document.addEventListener("DOMContentLoaded", () => {
  main()
})

const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'

function main(){
  getImages()
  getBreeds()
  changeBreedColorOnClick()
  filterBreedsByLetterFetch()
}

function getImages() {
  fetch(imgUrl)
  .then(response => response.json())
  .then (imges => {
    renderImages(imges)
  })
}

function getBreeds() {
  fetch(breedUrl)
  .then(response => response.json())
  .then(breeds => {
    renderBreeds(breeds)
  })
}

function renderBreeds(breeds) {
  const breedArr = Object.keys(breeds.message);
  const breedsContainerUl = document.getElementById("dog-breeds");

  for (let i = 0; i < breedArr.length; i++){
    const breedLi = document.createElement('li');
    breedLi.textContent = breedArr[i];
    breedsContainerUl.appendChild(breedLi);
  }
}

function renderImages (imges){
  let ul = document.createElement('ul');
  let div = document.getElementById("dog-image-container");
  div.appendChild(ul);
  for (let i = 0; i < imges.message.length; i++){
    let li = document.createElement('li')
    let img = document.createElement('img')
    img.setAttribute('className', 'sizeRestriction');
    li.appendChild(img)
    img.setAttribute("src",imges.message[i])
    ul.appendChild(li)
  }
}

function changeBreedColorOnClick() {
  const breedsUl = document.getElementById("dog-breeds");
  breedsUl.addEventListener('click', (event) => {
    event.preventDefault()
    let breedLi = event.target
    breedLi.setAttribute('style', 'color:teal');
  })
}

function filterBreedsByLetterFetch() {
  const breedDropdown = document.getElementById("breed-dropdown");
  fetch(breedUrl)
  .then( response => response.json())
  .then(breeds => {
    filterBreedsByLetter(breeds)
  })
}

function filterBreedsByLetter(breeds) {
  const breedArr = Object.keys(breeds.message);
  const breedsContainerUl = document.getElementById("dog-breeds");
  const breedDropdown = document.getElementById("breed-dropdown");
  
  breedDropdown.addEventListener('change', (event) => {
    let breedOption = event.target.value;
    console.log(breedOption)
    console.log(breedsContainerUl)
    while (breedsContainerUl.firstChild){
      breedsContainerUl.removeChild(breedsContainerUl.firstChild);
    }
    // for (let i = 0; i < breedsContainerUl.children.length; i++){
    //   breedsContainerUl.children[i].remove()
    // }
    for (let i = 0; i < breedArr.length; i++){
      if (breedArr[i][0] == breedOption){
        const breedLi = document.createElement('li');
        breedLi.textContent = breedArr[i];
        breedsContainerUl.appendChild(breedLi);
      }
    }
  });
}