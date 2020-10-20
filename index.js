const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const fs = require('fs')

app.set('view engine', 'ejs')
app.use(ejsLayouts)
//body-parser middleware
app.use(express.urlencoded({extended: false}))

app.listen(8000, ()=>{
    console.log('listening to port 8000')
})

app.get('/', (req, res)=>{
    res.render('home')
})

app.use('/dinosaurs', require('./controllers/dinosaurs'))
// app.use('/prehistoric_creatures', require('./controllers/prehistoric_creatures'))

app.get('/prehistoric_creatures', (req, res)=>{
    let prehistoricCreatures = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(prehistoricCreatures)
    res.render('prehistoric_creatures/index', {myCreatures: creatureData})
})

// app.post('/dinosaurs', (req, res)=>{
//     let dinosaurs = fs.readFileSync('./dinosaurs.json')
//     dinosaurs = JSON.parse(dinosaurs)

//     dinosaurs.push(req.body)

//     fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinosaurs))

//     res.redirect('/dinosaurs')
// })

// POST ROUTE

app.post('/prehistoric_creatures', (req, res)=>{
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    creatures = JSON.parse(creatures)

    creatures.push(req.body)

    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatures))

    res.redirect('/prehistoric_creatures')
})

//NEW/READ (GET) ROUTE

// app.get('/dinosaurs/new', (req, res)=>{
//     res.render('dinosaurs/new')
// })

app.get('/prehistoric_creatures/new', (req, res)=>{
    res.render('prehistoric_creatures/new')
})

app.get('/prehistoric_creatures/:idx', (req, res)=>{
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(creatures)

    let creatureIndex = parseInt(req.params.idx)

    res.render('prehistoric_creatures/show', {myCreatures: creatureData[creatureIndex]})
})

// form to edit certain creature

//need to somehow edit the creatureData array with the form response and reload instead of pushing?

// SHOW/READ (GET) ROUTE

app.get('/dinosaurs/:idx', (req, res)=>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)

    let dinoIndex = parseInt(req.params.idx)

    res.render('dinosaurs/show', {myDinos: dinoData[dinoIndex]})
})

// app.get('/prehistoric_creatures/edit/:idx', (req, res)=>{
//     let creatures = fs.readFileSync('./prehistoric_creatures.json')
//     let creatureData = JSON.parse(creatures)

//     let creatureIndex = parseInt(req.params.idx)
//     res.render('prehistoric_creatures/edit', {myCreatures: creatureData[creatureIndex]})
// })


