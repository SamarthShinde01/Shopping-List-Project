const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
const items = itemList.querySelectorAll('li');

// add itemm start
function addItem(e) {
    e.preventDefault();

    const newItem = itemInput.value;
    
    if(newItem === '') {
        alert('Please add an item');
        return;
    }

    const li = document.createElement('li');
    li.appendChild(document.createTextNode(newItem));

    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);

    //adding item to the list
    itemList.appendChild(li);

    checkUI();

    itemInput.value = '';

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
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItems);

checkUI();
