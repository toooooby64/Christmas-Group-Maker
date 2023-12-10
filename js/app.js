const names = []
let groups = {}
function addName(){
    event.preventDefault();
    // Grab/Create all HTML needed
    const name = document.getElementById('name-input').value;
    if (name === ''){
        alert('Please enter a name')
        return
    }
    const container = document.getElementById('names-list');
    const nameCard = document.createElement('div');
    const button = document.createElement('button');

    // Add name to array
    names.push(name);

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
        nameCard.remove(); // Remove nameCard from DOM
        console.log(names);
    });

    // Add name and button to nameCard
    nameCard.innerText = name;
    nameCard.appendChild(button);

    // Add the new nameCard to the names-list container
    container.appendChild(nameCard); 

    // Clear input field
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



