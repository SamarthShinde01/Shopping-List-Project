const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
const items = itemList.querySelectorAll('li');
const formBtn = itemForm.querySelector('button');
let isEditMode = false;

function displayItems() {
    const items = getItemsFromStorage();
    items.forEach(item => addItemToDOM(item));

    checkUI();
}

// add itemm start
function onAddItemSubmit(e) {
    e.preventDefault();

    const newItem = itemInput.value;
    
    if(newItem === '') {
        alert('Please add an item');
        return;
    }

    //check for edit mode
    if(isEditMode) {
        const itemToEdit = itemList.querySelector('.edit-mode');
        removeItemFromStorage(itemToEdit);
        itemToEdit.classList.remove('edit-mode');
        itemToEdit.remove();
        isEditMode = false;
    } else {
        // if item exists then we dont add item 
        if(checkIfItemExists(newItem)){
        alert('That item is already exists!');
        return;
        }
        
    }


    //create item to DOM 
    addItemToDOM(newItem);

    //add item to storage
    addItemToStorage(newItem);

    checkUI();

    itemInput.value = '';

}

function addItemToDOM(item) {
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));

    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);

    //add li to the DOM
    itemList.appendChild(li);
}

function createButton (classes) {
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;
}

function createIcon (classes) {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}
// add item end


function addItemToStorage(item) {
    const itemsFromStorage = getItemsFromStorage();

    //new item to array
    itemsFromStorage.push(item);

    //convert to JSON string and set to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));


}

function getItemsFromStorage() {
    let itemsFromStorage;

    if(localStorage.getItem('items') === null) {
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }

    return itemsFromStorage;
}


function onClickItem(e) {
    if(e.target.parentElement.classList.contains('remove-item')) {
        removeItem(e.target.parentElement.parentElement);
    } else {
        setItemToEdit(e.target);
    }
}

function checkIfItemExists(item) {
    const itemsFromStorage = getItemsFromStorage();

    if(itemsFromStorage.includes(item)){
        return true;
    } else {
        return false;
    }
}

function setItemToEdit(item) {
    isEditMode = true;
    
    // if we select another value then gray color will turn to black
    itemList.querySelectorAll('li').forEach(item => item.classList.remove('edit-mode'));

    //black text color will turn to gray after selection of text
    // item.style.color = '#ccc';
    item.classList.add('edit-mode');

    formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';
    formBtn.style.backgroundColor = "#228B22";

    itemInput.value = item.textContent;
}


function removeItem(item) {
    if(confirm('Are You Sure?')){
        //remove item from DOM
        item.remove();

        //remove item from local storage
        removeItemFromStorage(item.textContent);

        checkUI();
    }
}

function removeItemFromStorage(item) {
    let itemsFromStorage = getItemsFromStorage();

    // Filter-out array to be removed
    itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

    //Re-set to localstorage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));

}


function clearItems() {
    // itemList.innerHTML = '';           //one way of deleting all item

    while(itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }

    //clear from local storage
    localStorage.removeItem('items');

    checkUI();
}


function filterItems(e) {
    const items = itemList.querySelectorAll('li');
    const text = e.target.value.toLowerCase();

    items.forEach((item) => {
        const itemName = item.firstChild.textContent.toLowerCase();

        if(itemName.indexOf(text) != -1){
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    })

}


function checkUI() {
    itemInput.value = '';

    const items = itemList.querySelectorAll('li');

    if(items.length === 0) {
        itemFilter.style.display = 'none';
        clearBtn.style.display = 'none';
    } else {
        itemFilter.style.display = 'block';
        clearBtn.style.display = 'block';
    }

    formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
    formBtn.style.backgroundColor = '#333';

    isEditMode = false;
}

// Event Listeners
itemForm.addEventListener('submit', onAddItemSubmit);
itemList.addEventListener('click', onClickItem);
clearBtn.addEventListener('click', clearItems);
itemFilter.addEventListener('input', filterItems);

document.addEventListener('DOMContentLoaded', displayItems);

checkUI();

