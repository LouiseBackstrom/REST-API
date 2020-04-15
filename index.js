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
    if (!req.body.name ||
        !req.body.fairyTale.toString() ||
        !req.body.bestFriend.toString()){
        res.status(400).send()
        
     } else {
        const newId = dCharacters[dCharacters.length-1].id+1
        dCharacters.push({
           id: newId,
           name: req.body.name,
           fairyTale: req.body.fairyTale,
           bestFriend: req.body.bestFriend
        });
     }
    res.json(req.body)
})

app.put('/dCharacters/:id', function(req, res) {
    if (!req.body.name ||
        !req.body.fairyTale.toString() ||
        !req.body.bestFriend.toString() ||
        !req.params.id.toString().match(/^[0-9]{3,}$/g)){
        res.status(400)
    } else {
       const updateIndex = dCharacters.map(function(dCharacter){
          return dCharacter.id;
       }).indexOf(parseInt(req.params.id));
       
       if(updateIndex === -1){
        dCharacters.push({
             id: req.params.id,
             name: req.body.name,
             bestFriend: req.body.bestFriend,
             fairyTale: req.body.fairyTale
          })
  
       } else {
        dCharacters[updateIndex] = {
             id: req.params.id,
             name: req.body.name,
             bestFriend: req.body.bestFriend,
             fairyTale: req.body.fairyTale
          }
       }
    }
 })
 
app.delete('/dCharacters/:id', (req, res) => {
    dCharacters.splice(req.params.id, 1)
    res.json(req.body)

})

app.listen(port, () => console.log(`listening at http://localhost:${port}`))