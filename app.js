// -------------------------------------------- ****** Variables ****** -----------------------------------------

// basket button itself
const basketBtn = document.querySelector(".enter2"),
  //this is shopping card container (basket)
  basket = document.querySelector(".boxes"),
  // all part of main section (allPart)
  allPart = document.querySelector(".all-part"),
  // shopping card content area
  shoppingCartContent = document.querySelector("#cart-content tbody"),
  // clear all food button
  clearCartBtn = document.querySelector("#clear-cart");

// ------------------------------------------ ****** Event Listener ****** --------------------------------------

basketBtn.addEventListener("click", display);

allPart.addEventListener("click", buy);

allPart.addEventListener("click", addToCart);

shoppingCartContent.addEventListener("click", removeFromCart);

clearCartBtn.addEventListener("click", clearCart);

document.addEventListener("DOMContentLoaded", showFoodOnLoad);

// --------------------------------------------- ******  Function ****** ----------------------------------------

// display when U click on basket button
function display(e) {
  basket.classList.toggle("disp");
}

// alert for regestration when U click on price button
function buy(e) {
  e.preventDefault();

  if (e.target.classList.contains("buy")) {
    alert("لطفا ثبت نام کنید 😁🍔");
  }
}

// ****** start of shopping card script ******

function addToCart(e) {
  if (e.target.classList.contains("add-to-cart")) {
    const food = e.target.parentElement.parentElement.parentElement;

    getFoodInfo(food);
  }
}

// food information
function getFoodInfo(food) {
  const foodInfo = {
    image: food.querySelector("img").src,
    title: food.querySelector("h5").innerText,
    price: food.querySelector(".buy").innerText,
    id: food.querySelector(".add-to-cart").getAttribute("data-id"),
  };

  let row = document.createElement("tr");

  // Build HTML Template
  row.innerHTML = `
      <tr>
          <td>
              <img src = "${foodInfo.image}" width = "90px" 
              style="border-radius:10px;"
              >
          </td>
          <td>${foodInfo.title}</td>
          <td >${foodInfo.price}</td>
          <td>
              <a class = "remove" href = "#" data-id ="${foodInfo.id}">❌</a>
          </td>
      </tr>
  `;

  shoppingCartContent.appendChild(row);

  saveToStorage(foodInfo);
}

// add to localstorage
function saveToStorage(foodInfo) {
  // get array of food from storage
  let foodsS = getFromStorage();

  // add the new food to the array of foodsS
  foodsS.push(foodInfo);

  localStorage.setItem("foodsS", JSON.stringify(foodsS));
}

// get content from storage
function getFromStorage() {
  let foodsS;

  // if foods exist before
  if (localStorage.getItem("foodsS")) {
    foodsS = JSON.parse(localStorage.getItem("foodsS"));
  } else {
    foodsS = [];
  }

  return foodsS;
}

// reload
function showFoodOnLoad() {
  let foodssLs = getFromStorage();

  // add courses into the cart
  foodssLs.forEach(function (foodInfo) {
    // create <li> tag
    let row = document.createElement("tr");

    // Build HTML Template
    row.innerHTML = `
            <tr>
                <td>
                <img src = "${foodInfo.image}" width = "90px" 
                style="border-radius:10px;"
                >                </td>
                <td>${foodInfo.title}</td>
                <td>${foodInfo.price}</td>
                <td>
                <a class = "remove" href = "#" data-id ="${foodInfo.id}">❌</a>
                </td>
            </tr>
        `;
    shoppingCartContent.appendChild(row);
  });
}

// remove food from card
function removeFromCart(e) {
  let myFood, foodId;

  if (e.target.classList.contains("remove")) {
    e.target.parentElement.parentElement.remove();
    myFood = e.target.parentElement.parentElement;
    foodId = myFood.querySelector("a").getAttribute("data-id");
  }

  removeCourseLS(foodId);
}

// remove food from LS
function removeCourseLS(id) {
  let foodLS = getFromStorage();

  foodLS.forEach(function (fooD, index) {
    if (fooD.id === id) {
      foodLS.splice(index, 1);
    }
  });

  localStorage.setItem("foodsS", JSON.stringify(foodLS));
}

// clear all food from DOM
function clearCart(e) {
  while (shoppingCartContent.firstChild) {
    shoppingCartContent.firstChild.remove();
  }
  clearCartLS();
}
// clear all food from localStorage
function clearCartLS() {
  localStorage.clear();
}
