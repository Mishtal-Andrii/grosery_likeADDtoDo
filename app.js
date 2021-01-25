// ****** select items **********

const form = document.querySelector(".grocery-form");
const alert = document.querySelector(".alert");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");

// Edit option
let editElement;
let editFlag = false;
let editID = '';

// Event listeners
//submit form
form.addEventListener('submit', addItem);
// Clear list of items
clearBtn.addEventListener('click', clearItems)

//Functions

//Add Items
function addItem(e) {
  e.preventDefault();
  const value = grocery.value.trim();
  // Generate unique id 
  const id = new Date().getTime().toString();

  if(value && !editFlag){
    const element = document.createElement('article');
    element.classList.add('grocery-item');
    const attr = document.createAttribute('data-id');
    attr.value = id;
    element.setAttributeNode(attr);
    element.innerHTML = `
      <p class=''title>${value}</p>
      <div class ='btn-container'>
        <button type="button" class ="edit-btn">
          <i  class='fas fa-edit'></i>
        </button>
        <button type="button" class ="delete-btn">
          <i class='fas fa-trash'></i>
        </button>
      </div>
    `;
    //Delete and editn items
    const deleteBtn = element.querySelector('.delete-btn');
    const editBtn = element.querySelector('.edit-btn');
    deleteBtn.addEventListener('click',deleteItem);
    editBtn.addEventListener('click',editItem);
    //append child
    list.appendChild(element);
    //display alert
      displayAlert('Item add to list', 'success');
      //show container
      container.classList.add('show-container');
      //Add to local storage
      addToLocalStorage(id,value);
      //Set back to default (input to white space)
      setBackToDefault();
  }
  else if(value  && editFlag) {
   editElement.innerHTML = value;
   displayAlert('value changed', 'success');
   editLocalSorage(editID,value);
   setBackToDefault();
  }
  else {
    displayAlert('Please enter value', 'danger');
  }
} 

//Display Alert
//text - text for alert
//action - class for alert
function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);
  //remove alert
  setTimeout(() => {
    alert.textContent = '';
    alert.classList.remove(`alert-${action}`);
  },1000)
}

//delete one item
function deleteItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;
  list.removeChild(element);
  if (list.children.length === 0) {
    container.classList.remove('show-container')
  }

  displayAlert('Item removed', 'danger');
  setBackToDefault();
  //remove from local sorage
  removeFromLocalStorage(id)
}

//edit one item
function editItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  //set effdit item
  editElement = e.currentTarget.parentElement.previousElementSibling;
  // set form value
  grocery.value = editElement.innerHTML;
  editFlag = true;
  editID = element.dataset.id;
  submitBtn.textContent = 'edit';
}

//Set back to default
function setBackToDefault() {
  grocery.value ='';
  editFlag = false;
  editID = '';
  submitBtn.textContent = 'submit'
}

function clearItems() {
  const items = document.querySelectorAll('.grocery-item');
  if (items.length > 0) {
    items.forEach(item => {
      list.removeChild(item);
    })
  }

  container.classList.remove('show-container');
  displayAlert('empty list', 'success');
   
  localStorage.removeItem('list');

}

//Local storage    
function addToLocalStorage(id,value) {
      
}

function  removeFromLocalStorage(id) {

}

function editLocalSorage(editID,value) {

}