const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
const items = itemList.querySelectorAll('li');

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


function removeItem(e) {
    if(e.target.parentElement.classList.contains('remove-item')) {

        if(confirm('Are You Sure?')){
            e.target.parentElement.parentElement.remove();
        }

        checkUI();
    }
}


function clearItems(e) {
    // itemList.innerHTML = '';           //one way of deleting all item

    while(itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }

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
    const items = itemList.querySelectorAll('li');

    if(items.length === 0) {
        itemFilter.style.display = 'none';
        clearBtn.style.display = 'none';
    } else {
        itemFilter.style.display = 'block';
        clearBtn.style.display = 'block';
    }
}

// Event Listeners
itemForm.addEventListener('submit', onAddItemSubmit);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItems);
itemFilter.addEventListener('input', filterItems);

document.addEventListener('DOMContentLoaded', displayItems);

checkUI();

