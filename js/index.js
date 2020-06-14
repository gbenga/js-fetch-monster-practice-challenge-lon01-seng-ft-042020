// the next button shows the next 50 monsters, not change the page
const URL = 'http://localhost:3000/monsters'
const monsterContainerDiv = document.querySelector('#monster-container');
const createMonsterDiv = document.querySelector('#create-monster');
const forwardButton = document.querySelector('#forward');
let currentPage = 1

document.addEventListener("DOMContentLoaded", () => {
    renderMonsters();
    createNewMonsterForm();
    forwardButton.addEventListener("click", function(e) {
        e.preventDefault();
        currentPage++
        renderMonsters();
      });
});

function renderMonsters() {
    fetchMonsters()
    .then((monsters => 
        monsters.forEach(monster => {
            renderMonster(monster);
        })
    ));
}

function fetchMonsters() {
    return fetch(`${URL}/?_limit=50&_page=${currentPage}`)
      .then(function (response) {
        return response.json();
      })
      .catch(function(error) {
        alert("THIS DIDN'T WORK, BE MORE SPECIFIC");
        console.log(error.message);
        });
}

function renderMonster(monster) {
   
    const monsterDiv = document.createElement("div");
    
    const monsterNameH3 = document.createElement("h3");
    monsterNameH3.innerText = monster.name;

    const monsterAgeH5 = document.createElement("h5");
    monsterAgeH5.innerText = monster.age;

    const monsterDescriptionP = document.createElement("p");
    monsterDescriptionP.innerText = monster.description;

    monsterDiv.appendChild(monsterNameH3);
    monsterDiv.appendChild(monsterAgeH5);
    monsterDiv.appendChild(monsterDescriptionP);

    monsterContainerDiv.appendChild(monsterDiv);
}

function createNewMonsterForm() {
    const newMonsterForm = document.createElement("form");

    const nameLabel = document.createElement("label");
    nameLabel.innerText = "Name:";
    const newMonsterName = document.createElement("input");
    newMonsterName.setAttribute("name","name");
    newMonsterForm.appendChild(nameLabel);
    newMonsterForm.appendChild(newMonsterName);

    const ageLabel = document.createElement("label");
    ageLabel.innerText = "Age:";
    const newMonsterAge = document.createElement("input");
    newMonsterAge.setAttribute("name","age")
    newMonsterForm.appendChild(ageLabel);
    newMonsterForm.appendChild(newMonsterAge);

    const descriptionLabel = document.createElement("label");
    descriptionLabel.innerText = "Description:";
    const newMonsterDescription = document.createElement("input");
    newMonsterDescription.setAttribute("name","description");
    newMonsterForm.appendChild(descriptionLabel);
    newMonsterForm.appendChild(newMonsterDescription);

    const submitButton = document.createElement("button");
    submitButton.innerText = "Submit"
    newMonsterForm.appendChild(submitButton);
    
    createMonsterDiv.appendChild(newMonsterForm);

    newMonsterForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const form = e.target
        post(form);
      });
}

function post(form) {
 
    const formData = {
      name : form.name.value,
      age : form.age.value,
      description : form.description.value
    };
     
    const configObject = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    };
     
    fetch(URL, configObject)
      .then(function(response) {
        return response.json();
      })
      .then(function() {
        renderMonsters();
      })
      .catch(function(error) {
        alert(`this patch request didn't work for ${formData}`);
        console.log(error.message);
      });
}