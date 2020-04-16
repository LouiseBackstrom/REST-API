fetch("/dCharacters").then((response) => {
    return response.json()
}).then((dCharacters) => {
    console.log(dCharacters)
    AllDCharacters(dCharacters)
})

function AllDCharacters(dCharacters) {
    let alldCharactersContainer = document.getElementById("all")
    
    dCharacters.forEach(dCharacter => {
        let dCharacterName = document.createElement("h4")
        dCharacterName.innerText = dCharacter.name
        let dCharacterFairyTale = document.createElement("h4")
        dCharacterFairyTale.innerText = dCharacter.fairyTale
        let dCharacterBestFriend = document.createElement("h4")
        dCharacterBestFriend.innerText = dCharacter.bestFriend

        let dCharacterDiv = document.createElement("div")
        
        dCharacterDiv.appendChild(dCharacterName)
        dCharacterDiv.appendChild(dCharacterFairyTale)
        dCharacterDiv.appendChild(dCharacterBestFriend)

        alldCharactersContainer.appendChild(dCharacterDiv)
    })
}

document.getElementById("findOne").addEventListener("click", getOne)

function getOne() {

    const id = document.getElementById("idInput").value 
    console.log(id)
    fetch("/dCharacters/" + id).then((response) => {
        if(response.status === 404) {
            printOne()
        } else {
            return response.json()
        }
    }).then((dCharacters) => {
        console.log(dCharacters)
        printOne(dCharacters) 
    })
}

function printOne(dCharacter) {
    let dCharacterContainer = document.getElementById("getOne")
    dCharacterContainer.innerHTML = ""

    if(dCharacter) {
        let dCharacterName = document.createElement("h4")
        dCharacterName.innerText = dCharacter.name
        let dCharacterFairyTale = document.createElement("h4")
        dCharacterFairyTale.innerText = dCharacter.fairyTale
        let dCharacterBestFriend = document.createElement("h4")
        dCharacterBestFriend.innerText = dCharacter.bestFriend
        
        dCharacterContainer.appendChild(dCharacterName)
        dCharacterContainer.appendChild(dCharacterFairyTale)
        dCharacterContainer.appendChild(dCharacterBestFriend)

    } else {
        let errorResponse = document.createElement("h4")
        errorResponse.innerText = "Hittade ingen användare :/"
        dCharacterContainer.appendChild(errorResponse)

    }
}

window.addEventListener('load', loadPage)

function loadPage() {
const form = document.querySelector('form')
form.addEventListener('submit', createNew)
}

function createNew(event) {
    event.stopPropagation()
    event.preventDefault()

    const formData = new FormData(event.target)
    const dCharacter = {}
    for (const pair of formData.entries()) {
        const [key, value] = pair
        dCharacter[key] = value
    }

    fetch("/dCharacters", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(dCharacter)
});
   
}
