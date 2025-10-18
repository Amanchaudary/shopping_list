// alert("Hello world")
const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearAll = document.getElementById("clearAll");
const filter = document.getElementById("filter");
const addBtn = document.getElementById("addbtn");
let isEditMode = false;
function addItem(e) {
  // console.log(e)
  e.preventDefault();
  const item = itemInput.value;
  if (item === "") {
    alert("enter the item");
    return;
  }
  if (isEditMode) {
    const itemtoEdit = itemList.querySelector(".edit");
    removeItemFromLocalStorage(itemtoEdit.textContent);
    itemtoEdit.remove();
    isEditMode = false;
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
//remove item
function onClickItem(e) {
  const btn = e.target.parentElement;
  console.log(btn);
  if (btn.classList.contains("cross")) {
    // btn.parentElement.remove();
    removeItem(btn.parentElement); //apple banana
  } else {
    ItemEdit(e.target);
  }
}
function removeItem(item) {
  console.log(item);
  console.log(item.textContent);
  if (confirm("are you sure want to delete")) {
    item.remove();
    removeItemFromLocalStorage(item.textContent);
  }
  checkPage();
}

function removeItemFromLocalStorage(item) {
  let itemsFromLocalStorage = getItemsFromLocalStorage();
  console.log(itemsFromLocalStorage); //banana
  console.log(item);
  let newFilterItems = itemsFromLocalStorage.filter((i) => i !== item);
  console.log(newFilterItems);
  localStorage.setItem("items", JSON.stringify(newFilterItems));
}
function ItemEdit(item) {
  isEditMode = true;
  itemInput.value = item.textContent.toString().trim();
  itemList.querySelectorAll("li").forEach((i) => i.classList.remove("edit"));
  item.classList.add("edit");
  addBtn.innerHTML = ' <i class="fa-solid fa-pen"></i> Update Item';
  addBtn.style.backgroundColor = "green";
}

function clearAllItem() {
  itemList.innerHTML = "";
  localStorage.removeItem("items"); // filter.remove();
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
  addBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
  addBtn.style.backgroundColor = "black";
}

function filterItems(e) {
  const value = e.target.value.toLowerCase(); //ApPle apple
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
function duplicateItem(item) {
  let itemsFromLocalStorage = getItemsFromLocalStorage();
  if (itemsFromLocalStorage.includes(item)) {
    console.log("true");
    return true;
  } else {
    return false;
  }
}
let itemlower=item.toLowerCase()
if(duplicateItem(itemlower)){
    alert(`${item}`)
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
  itemsFromLocalStorage.forEach((item) => {
    DOMmaItemadd(item);
  });
}
displayonDOM();
itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", onClickItem);
clearAll.addEventListener("click", clearAllItem);
filter.addEventListener("input", filterItems);
checkPage();
