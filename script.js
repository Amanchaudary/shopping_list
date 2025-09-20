const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const hello = document.getElementById("hello");
const clearAll=document.getElementById('clearAll')

function addItem(e) {
  // arko page ma najan ko lagi e.preventDefault use gareko
  e.preventDefault();
  const item = itemInput.value;
    if (item === '' ){
    alert("enter the item")
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
}
// clear each item
function removeItem(e){
  const btn=e.target.parentElement
  if(btn.classList.contains('cross')){
    btn.parentElement.remove();
  }
}
// clear all list
function clearAllitem(){
  itemList.remove()
}

itemForm.addEventListener("submit", addItem);
itemList.addEventListener('click',removeItem)
clearAll.addEventListener('click',clearAllitem)

