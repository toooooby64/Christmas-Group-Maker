let names = []
let groups = {}
function addName(){
    event.preventDefault();
    // Grab/Create all HTML needed
    const name = document.getElementById('name-input').value;
    if (!validateInput(name)){
        alert('Please enter a valid input')
        return
    }
    if (name.includes(' ')){
        names.push.apply(names, name.split(' '))
        allNames = name.split(' ')

        allNames.forEach(name => {
            createNameCards(name)
        });
    }else{
        names.push(name);
        createNameCards(name)
    }
    organizeNameCards();
    
    const nameInput = document.getElementById('name-input');
    nameInput.value = '';

    window.sessionStorage.setItem("names", names)
}

function createGroups(){
    const groupNumber = document.getElementById('group-input').value;
    const names = window.sessionStorage.getItem("names")
    let namesArray = names.split(',')
    // Shuffle namesArray
    namesArray = namesArray.sort(() => Math.random() - 0.5);
    

    for (let i = 0; i < groupNumber; i++){
        groups[i] = []
    }

    namesArray.forEach(function(name,index){
        let groupIndex = index % groupNumber; // Use modulo to cycle through groups
        nameIndex = getRandomInt(namesArray.length)
        groups[groupIndex].push(name)
    })
    console.log(groups)
    displayGroups()
}

function displayGroups(){
    const groupsList = document.getElementById('groups-list');
    for (let key in groups){
        const groupCards = document.createElement('div');
        groupCards.innerHTML = `<div>Group ${parseInt(key) + 1}</div>`;
        groupCards.classList.add('group-card');
        groups[key].forEach(element => {
            const nameCard = document.createElement('div');
            nameCard.innerText = element;
            groupCards.appendChild(nameCard);
        });
        
        groupsList.appendChild(groupCards);
    }
    
    

}

function getRandomInt(max) {
  console.log(Math.floor(Math.random() * max))
  return Math.floor(Math.random() * max);
}

function validateInput(name){
    isEmpty = false
    if (name.trim() === ''){
        isEmpty = true
    }
    // Regular expression that matches any string containing characters other than alphanumeric characters and spaces
    const regex = /^([a-zA-Z]+ +)*[a-zA-Z]+$/;
    // Test the input string against the regular expression
    return regex.test(name) && !isEmpty;
}

function createNameCards(name){
    const container = document.getElementById('names-list');
    const listItem = document.createElement('li');
    const nameCard = document.createElement('div');
    const button = document.createElement('button');


    // Add name to nameCard
    nameCard.innerText = name;
    listItem.appendChild(nameCard)
    //Add id and text to button
    button.classList.add('delete-button');
    button.innerText = 'X';

    // Add name-card class to nameCard
    nameCard.classList.add('name-card');

    // Add event listener to button to remove name from array and DOM when clicked
    button.addEventListener('click', function(){
        const index = names.indexOf(name); // Find index of name
        if (index > -1) {
            names.splice(index, 1); // Remove name from array
        }
        window.sessionStorage.setItem("names", names)
        listItem.remove(); // Remove li from DOM      
          
    });

    // Add name and button to nameCard
    nameCard.appendChild(button);
    container.appendChild(listItem);
}

function organizeNameCards() {
    let nameCol = document.createElement('div');
    nameCol.className = 'name-card-col';

    let namesList = document.querySelector('#names-list');
    let nameCards = namesList.querySelectorAll('li');

    nameCards.forEach((nameCard, index) => {
        nameCol.appendChild(nameCard);

        if ((index + 1) % 5 === 0 || index === nameCards.length - 1) {
            namesList.appendChild(nameCol);
            nameCol = document.createElement('div');
            nameCol.className = 'name-card-col';
        }
    });
}



