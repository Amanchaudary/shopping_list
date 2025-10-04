const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearAll = document.getElementById("clearAll");
const filter = document.getElementById("filter");
function addItem(e) {
  e.preventDefault();

  const item = itemInput.value;
  if (item === "") {
    alert("enter the item");
    return;
  }

  DOMmaItemadd(item);
  addItemtoStorage(item);

  checkPage();
}

function DOMmaItemadd(item) {
  const text = document.createTextNode(item);
  const li = document.createElement("li");
  const btn = document.createElement("button");
  const icon = document.createElement("i");
  btn.classList.add("cross");
  icon.classList.add("fa-solid");
  icon.classList.add("fa-xmark");
  li.appendChild(text);
  li.appendChild(btn);
  btn.appendChild(icon);
  itemList.appendChild(li);
  itemInput.value = "";
}
function removeItem(e) {
  const btn = e.target.parentElement;
  if (btn.classList.contains("cross")) {
    btn.parentElement.remove();
  }
  checkPage();
}

function clearAllItem() {
  itemList.innerHTML = "";
  checkPage();
}

function checkPage() {
  const items = document.querySelectorAll("li");
  if (items.length === 0) {
    filter.style.display = "none";
    clearAll.style.display = "none";
  } else {
    filter.style.display = "block";
    clearAll.style.display = "block";
  }
}

function filterItems(e) {
  const value = e.target.value.toLowerCase();
  console.log(value);
  const items = document.querySelectorAll("li");
  items.forEach((item) => {
    console.log(item.firstChild.textContent.toLowerCase());
    const itemName = item.firstChild.textContent.toLowerCase();
    if (itemName.indexOf(value) !== -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

function addItemtoStorage(item) {
  let itemsFromLocalStorage = getItemsFromLocalStorage();
  itemsFromLocalStorage.push(item);
  localStorage.setItem("items", JSON.stringify(itemsFromLocalStorage));
  console.log(itemsFromLocalStorage);
}

function getItemsFromLocalStorage() {
  let itemsFromLocalStorage = localStorage.getItem("items");
  console.log(typeof itemsFromLocalStorage);
  if (itemsFromLocalStorage === null) {
    itemsFromLocalStorage = []; //empty array
    console.log("no");
  } else {
    itemsFromLocalStorage = JSON.parse(localStorage.getItem("items"));
    console.log(itemsFromLocalStorage);
    console.log(typeof itemsFromLocalStorage);
  }
  return itemsFromLocalStorage;
}

function displayonDOM() {
  const itemsFromLocalStorage = getItemsFromLocalStorage();
  //banana,milk
  itemsFromLocalStorage.forEach((item) => {
    DOMmaItemadd(item);
  });
}
displayonDOM();
itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);
clearAll.addEventListener("click", clearAllItem);
filter.addEventListener("input", filterItems);

checkPage();
