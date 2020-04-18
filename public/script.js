fetch("/characters").then((response) => {
    return response.json()
}).then((characters) => {
    console.log(characters)
    allCharacters(characters)
})

function allCharacters(characters) {
    let allCharactersContainer = document.getElementById("all")
    
    characters.forEach(character => {
        let characterName = document.createElement("h4")
        characterName.innerText = character.name
        let characterFairyTale = document.createElement("h4")
        characterFairyTale.innerText = character.fairyTale
        let characterBestFriend = document.createElement("h4")
        characterBestFriend.innerText = character.bestFriend

        let characterDiv = document.createElement("div")
        
        characterDiv.appendChild(characterName)
        characterDiv.appendChild(characterFairyTale)
        characterDiv.appendChild(characterBestFriend)

        allCharactersContainer.appendChild(characterDiv)
    })
}

document.getElementById("findOne").addEventListener("click", getOne)

function getOne() {

    const id = document.getElementById("idInput").value 
    console.log(id)
    fetch("/characters/" + id).then((response) => {
        if(response.status === 404) {
            printOne()
        } else {
            return response.json()
        }
    }).then((characters) => {
        console.log(characters)
        printOne(characters) 
    })
}

function printOne(character) {
    let characterContainer = document.getElementById("getOne")
    characterContainer.innerHTML = ""

    if(character) {
        let characterName = document.createElement("h4")
        characterName.innerText = character.name
        let characterFairyTale = document.createElement("h4")
        characterFairyTale.innerText = character.fairyTale
        let characterBestFriend = document.createElement("h4")
        characterBestFriend.innerText = character.bestFriend
        
        characterContainer.appendChild(characterName)
        characterContainer.appendChild(characterFairyTale)
        characterContainer.appendChild(characterBestFriend)

    } else {
        let errorResponse = document.createElement("h4")
        errorResponse.innerText = "Hittade ingen användare :/"
        characterContainer.appendChild(errorResponse)

    }
}


const form = document.getElementById('create')
form.addEventListener('submit', createNew)


function createNew(event) {
    event.stopPropagation()
    event.preventDefault()

    const formData = new FormData(event.target)
    const character = {}
    for (const pair of formData.entries()) {
        const [key, value] = pair
        character[key] = value
    }

    fetch("/characters", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(character)

})
    let createContainer = document.getElementById("message")
   
    let message = document.createElement("h4")
    message.innerText = "En ny Disneyfigur har lagts till"
    createContainer.appendChild(message) 

    setTimeout(function () { 
        window.location.reload() }, 2000)
}
