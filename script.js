const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearAll = document.getElementById("clearAll");
const filter = document.getElementById("filter");
const items = document.querySelectorAll("li");

// funciton add gareko
function addItem(e) {
  e.preventDefault();

  const item = itemInput.value;
  if (item === "") {
    alert("enter the item");
    return;
  }

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

  checkPage();
}
// remove gareko item
function removeItem(e) {
  const btn = e.target.parentElement;

  if (btn.classList.contains("cross")) {
    btn.parentElement.remove();
  }
  checkPage();
}
// all item clear gareko
function clearAllItem() {
  itemList.innerHTML = "";

  checkPage();
}

function checkPage() {
  const items = document.querySelectorAll("li");
  console.log(items);
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
    if (itemName.indexOf(value !== -1)) {
      item.style.display = "flex";
    } else {
      items.style.display = "none";
    }
  });
}

itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);
clearAll.addEventListener("click", clearAllItem);
filter.addEventListener("click", filterItems);
checkPage();
