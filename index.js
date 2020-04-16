const express = require('express')
const app = express()
const port = 3000

//disney characters
let idIndex = 5
const dCharacters = [
    {   
        id: 1,
        name: "Elsa",
        fairyTale: "Frost",
        bestFriend: "Anna",
        img: ""
    },
    {   
        id: 2,
        name: "Robin Hood",
        fairyTale: "Robin Hood",
        bestFriend: "Little John",
        img: ""
    },
    {   
        id: 3,
        name: "Winnie the Pooh",
        fairyTale: "Winnie the Pooh",
        bestFriend: "Piglet",
        img: ""
    },
    {   
        id: 4,
        name: "Princess Jasmine",
        fairyTale: "Aladdin",
        bestFriend: "Aladdin",
        img: ""
    },
    {   
        id: 4,
        name: "Simba",
        fairyTale: "Lion King",
        bestFriend: "Nala",
        img: ""
    }
]

app.use(express.json())
app.use(express.static('public'))

app.get('/dCharacters', (req, res) => {
    res.json(dCharacters)
})

app.get('/dCharacters/:dCharacterId', (req, res) => {
    const character = dCharacters.find((dCharacter) => 
    (dCharacter.id.toString() === req.params.dCharacterId)) 
            if(!character) {
                res.status(404).send()
            } else {
                res.send(character)
            }
    })

app.post('/dCharacters', (req, res) => {
    const dCharacter = { id: idIndex++, ...req.body }
    dCharacters.push(dCharacter)
    res.status(201).json(dCharacter)
})

app.put('/dCharacters/:id', function(req, res) {
    dCharacter[req.params.id] = req.body
    res.json(req.body)
    
 })
 
app.delete('/dCharacters/:id', (req, res) => {
    dCharacters.splice(req.params.id, 1)
    res.json(req.body)

})

app.listen(port, () => console.log(`listening at http://localhost:${port}`))

