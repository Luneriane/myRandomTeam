// Eléments html
const people = document.getElementById('people');
const previousTeam = document.getElementById('previousTeam');
const howMany = document.getElementById('howMany');
const howManyBtn = document.getElementById('howManyBtn');
const newTeam = document.getElementById('newTeam');
const myTeams = document.getElementById('myTeams');
// Local Storage
let previousData = JSON.parse(window.localStorage.getItem('previousTeams'));
// JSON
let originalData;
// Copie temporaire du JSON
let tempData = [];
// Contenant des groupes
let myGroups = new Array();
// Présence de listes
let hasLists = false;


/* Récupération des datas JSON CHECKED*/
window.onload = () => {
    var request = new XMLHttpRequest();
    request.open("get", "./data.json", true);
    request.onreadystatechange = (e) => {
        if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
            console.log(e.currentTarget.response)
            originalData = JSON.parse(e.currentTarget.response);

            howMany.setAttribute('max', Math.ceil(originalData.data.length / 2));
            insertData(originalData);
        }
    };
    request.send();
}

/* Intégration des datas dans la page CHECKED*/
function insertData(data) {
    let newUl = document.createElement('ul');
    people.appendChild(newUl);

    for (let person in data.data) {
        let newLi = document.createElement('li');
        newLi.innerText = data.data[person].name;
        newUl.appendChild(newLi);
    }
}

/* Données temporaires CHECKED*/
function temporaryData (data) {
    for (let person in data) {
        tempData.push(data[person].name)
    };
}

/* Remise à zéro CHECKED*/
function cleanMyDatas(){
    myTeams.innerHTML = "";
    myGroups = [];
    tempData = [];
    hasLists = false;
}

/* Nombre de groupes CHECKED*/
function numberOfGroups(numb){
    for (let i = 0; i < numb; i++){
        var group = new Array();
        myGroups.push(group);
    }
}

/* Constitution des groupes */
function completingGroup(data){

    let groupI = 0;

    for (let dataI in originalData.data) {
        let randomI = Math.floor(Math.random()*data.length);
        
        myGroups[groupI].push(data[randomI]);
        data.splice(randomI, 1);

        groupI++;
        if (groupI > myGroups.length-1) { groupI = 0 };

    }
}

/* Affichage des groupes CHECKED*/
function showingGroups(groups){
    for (let group in groups) {
        let newUl = document.createElement('ul');
        let newTitle = document.createElement('h3');
        myTeams.appendChild(newUl);
        newUl.appendChild(newTitle);
        newTitle.innerText = "Groupe " + group;

        for (let person in groups[group]) {
            let newLi = document.createElement('li');
            newLi.innerText = groups[group][person];
            newUl.appendChild(newLi);
        }
    }
}

/* Random Team */
howManyBtn.onclick = () => {
    let howManyGroups = Math.ceil(originalData.data.length / howMany.value);

    /* Netoyage des listes */
    if (hasLists) {cleanMyDatas()};

    /* Stockage des données */
    temporaryData(originalData.data);

    /* Nombre de groupes */
    numberOfGroups(howManyGroups);

    /* Constitution des groupes */
    completingGroup(tempData);

    /* Afficher les groupes */
    showingGroups(myGroups)

    /* Présence de listes */
    hasLists = true;
}