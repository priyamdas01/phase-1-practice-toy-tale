let addToy = false;
const toyCollectionEl = document.getElementById("toy-collection");
const newToyForm = document.querySelector(".add-toy-form");

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  fetch("http://localhost:3000/toys")
  .then(res=>res.json())
  .then(toys=>{
    toys.forEach(handleToy);
  })

  newToyForm.addEventListener("submit", function(e){
    e.preventDefault();
    const newToy = {
      name: e.target.name.value,
      image: e.target.image.value,
      likes: 0
    }
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(newToy)
    })
    .then(res=>res.json())
    .then(data=>{
      handleToy(data);
    })
  })
});


function handleToy(toy){
  console.log(toy);
  const toyElement = document.createElement("div");
  buildIndividualToyDiv(toyElement, toy);
  toyElement.classList.add("card");
  toyCollectionEl.appendChild(toyElement)
}

function buildIndividualToyDiv(el, toy){
  const toyH2 = document.createElement("h2")
  toyH2.textContent = toy.name;
  el.appendChild(toyH2);
  const toyImg = document.createElement("img");
  toyImg.src = toy.image;
  el.appendChild(toyImg);
  toyImg.classList.add("toy-avatar");
  const toyBtn = document.createElement("button");
  toyBtn.classList.add("like-btn");
  toyBtn.id = toy.id;
  toyBtn.textContent = "Like ❤️";
  const toyP = document.createElement("p");
  toyBtn.addEventListener("click",function(e){
    ++toy.likes;
    patchNewToy(toy);
    toyP.textContent = `${toy.likes} likes`;
  });
  toyP.textContent = `${toy.likes} likes`;
  el.appendChild(toyP);

  el.appendChild(toyBtn);
}

function patchNewToy(toy){
  fetch(`http://localhost:3000/toys/${toy.id}`, {
      method:"PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(toy)
    })
    .then(res=>res.json())
    .then(data=>console.log(data))
}