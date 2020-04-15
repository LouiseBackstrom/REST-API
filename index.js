const express = require('express')
const app = express()
const port = 3000

//disney characters
const dCharacters = [
    {   
        id: 0,
        name: "Elsa",
        fairyTale: "Frost",
        bestFriend: "Anna",
        img: ""
    },
    {   
        id: 1,
        name: "Robin Hood",
        fairyTale: "Robin Hood",
        bestFriend: "Piglet",
        img: ""
    },
    {   
        id: 2,
        name: "Winnie the Pooh",
        fairyTale: "Robin Hood",
        bestFriend: "Little John",
        img: ""
    },
    {   
        id: 3,
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
    dCharacters.push(req.body)
    res.json(req.body)
})

app.delete('/dCharacters/:id', (req, res) => {
    dCharacters.splice(req.params.id, 1)
    res.json(req.body)

})

app.listen(port, () => console.log(`listening at http://localhost:${port}`))