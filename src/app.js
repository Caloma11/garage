// grabs the form
const form = document.querySelector(".car-form")
// api endpoint
const url = "https://wagon-garage-api.herokuapp.com/potato/cars"
// grabs container of the card grid
const carsList = document.querySelector(".cars-list");

// Creates a stringified HTML element, ready to later on be inserted in the DOM
const createCard = (carObj) => {
  return `<div class="car">
    <div class="car-image">
      <img src="http://loremflickr.com/280/280/${carObj.model}" />
    </div>
    <div class="car-info">
      <h4>${carObj.brand} ${carObj.model}</h4>
      <p><strong>Owner:</strong> ${carObj.owner}</p>
      <p><strong>Plate:</strong> ${carObj.plate}</p>
    </div>
  </div>`
}

const fetchAllCars = () => {
  carsList.innerHTML = "";
  fetch(url)
  .then(response => response.json())
  .then((data) => {
    // iterate through all the cars received from the api
    data.forEach((carObj) => {
      // for each car, create a card in the cars grid
      carsList.insertAdjacentHTML("beforeend", createCard(carObj))
    })
  })
  // clears the form
  form.reset();
}


// grab the information on each one of the inputs
// and builds a car object out of that
const buildCar = () => {
  const myBrand = document.getElementById("brand").value
  const myModel = document.getElementById("model").value
  const myOwner = document.getElementById("owner").value
  const myPlate = document.getElementById("plate").value

  return {
    brand: myBrand,
    model: myModel,
    owner: myOwner,
    plate: myPlate
  }
}


const postCar = (car) => {
   fetch(url, {
    method: "POST",
    body: JSON.stringify(car),
    headers: {'Content-Type': 'application/json'}
  })
    .then(response => response.json())
    .then((data) => {
      // prints the response of the api after posting
      console.log(data);
    });
}


//fetches all cars on page load
fetchAllCars();


// add an event listener to the form
form.addEventListener("submit", (e) => {
  // prevent the default behavior of the form submission (page reload)
  e.preventDefault();
  // returns a car object
  const newCar = buildCar();
  // post that object to the api
  postCar(newCar);
  // fetch the cars from the api again, including the newly posted one
  fetchAllCars();
})


