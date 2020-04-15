fetch("http://localhost:3000/dCharacters").then((response) => {
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
        let dCharacterBestFriend = document.createElement("h4")
        dCharacterBestFriend.innerText = dCharacter.bestFriend

        let dCharacterDiv = document.createElement("div")
        
        dCharacterDiv.appendChild(dCharacterName)
        dCharacterDiv.appendChild(dCharacterBestFriend)

        alldCharactersContainer.appendChild(dCharacterDiv)
    })
}

document.getElementById("findOne").addEventListener("click", getOne)

function getOne() {

    const id = document.getElementById("idInput").value 
    console.log(id)
    fetch("http://localhost:3000/dCharacters/" + id).then((response) => {
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
        let dCharacterBestFriend = document.createElement("h4")
        dCharacterBestFriend.innerText = dCharacter.bestFriend
        
        dCharacterContainer.appendChild(dCharacterName)
        dCharacterContainer.appendChild(dCharacterBestFriend)

    } else {
        let errorResponse = document.createElement("h4")
        errorResponse.innerText = "Hittade ingen användare :/"
        dCharacterContainer.appendChild(errorResponse)

    }
}