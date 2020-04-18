const express = require('express')
const app = express()

//disney characters
const characters = [
    {   
        id: 1,
        name: "Elsa",
        fairyTale: "Frost",
        bestFriend: "Anna"
    },
    {   
        id: 2,
        name: "Robin Hood",
        fairyTale: "Robin Hood",
        bestFriend: "Little John"
    },
    {   
        id: 3,
        name: "Winnie the Pooh",
        fairyTale: "Winnie the Pooh",
        bestFriend: "Piglet"
    },
    {   
        id: 4,
        name: "Princess Jasmine",
        fairyTale: "Aladdin",
        bestFriend: "Aladdin"
    },
    {   
        id: 5,
        name: "Simba",
        fairyTale: "Lion King",
        bestFriend: "Nala"
    }
]

app.use(express.json())
app.use(express.static('public'))


//Read, get all characters
app.get('/characters', (req, res) => {
    res.json(characters)
})

//Read, get one specific character
app.get('/characters/:id', (req, res) => {
    let character = characters.find((character) => 
    (character.id.toString() === req.params.id)) 
        if(!character) {
            res.status(404).send()
        } else {
            res.send(character)
        }
    })

//Create, create new characters
app.post('/characters', (req, res) => {
    const character = { 
        id: characters.length + 1, 
        ...req.body }
    characters.push(character)
    res.status(201).json(character)
})

//Update, update characters
app.put('/characters/:id', (req, res) => {
    let updatedCharacter = characters.find((character) => character.id.toString() === (req.params.id))
    const indexCharacter = characters.findIndex((character) => character.id === updatedCharacter.id)
    updatedCharacter = Object.assign(updatedCharacter, req.body)
    characters[indexCharacter] = updatedCharacter
    res.send(updatedCharacter)
  
 })
 
 //Delete, deletes characters
app.delete('/characters/:id', (req, res) => {

    let character = characters.find((character) => 
    (character.id.toString() === req.params.id))
    characters.splice(characters.indexOf(character), 1)
    res.json(req.body)
})

app.listen(3000, () => console.log('Server is up and running!'))

