let groups = {}
//TODO - More than half of the number of people in a group tell the user that it is not possible
//TODO - Add random name to group which has less ppl
function calculateGroups(){
    const pplPerGroup = document.getElementById('group-input').value;
    const names = window.sessionStorage.getItem("names")
    let namesArray = names.split(',')
    const numberOfGroups = Math.ceil(namesArray.length / pplPerGroup)
    return numberOfGroups
}

function createGroups(){
    const pplPerGroup = calculateGroups()
    const names = window.sessionStorage.getItem("names")
    let namesArray = names.split(',')
    // Shuffle namesArray
    namesArray = namesArray.sort(() => Math.random() - 0.5);
    

    for (let i = 0; i < pplPerGroup; i++){
        groups[i] = []
    }

    namesArray.forEach(function(name,index){
        let groupIndex = index % pplPerGroup; // Use modulo to cycle through groups
        nameIndex = getRandomInt(namesArray.length)
        groups[groupIndex].push(name)
    })

    for (let key in groups){
        maxGroupSize = groups[0].length

        if (groups[key].length < maxGroupSize){
            const randomName = namesArray[getRandomInt(namesArray.length)]
            groups[key].push(randomName)
        }
        
    }

    displayGroups()
}

function displayGroups(){
    const groupsList = document.getElementById('groups-list');
    const lineBreak = document.createElement('br');
    const div = document.createElement('div');
    const groupRow = document.createElement('div');
    groupRow.classList.add('group-row');
    for (let key in groups){
        const groupCards = document.createElement('div');
        groupCards.innerHTML = `<div>Group ${parseInt(key) + 1}</div>`;
        groupCards.classList.add('group-card');
        groups[key].forEach(element => {
            const nameCard = document.createElement('div');
            nameCard.innerText = element;
            groupCards.appendChild(nameCard);
        });
        groupRow.appendChild(groupCards);
        groupsList.appendChild(groupRow);
    }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}