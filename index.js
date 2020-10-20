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

// POST ROUTE

app.post('/prehistoric_creatures', (req, res)=>{
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    creatures = JSON.parse(creatures)

    creatures.push(req.body)

    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatures))

    res.redirect('/prehistoric_creatures')
})

//NEW/READ (GET) ROUTE


app.get('/prehistoric_creatures/new', (req, res)=>{
    res.render('prehistoric_creatures/new')
})

app.get('/prehistoric_creatures/:idx', (req, res)=>{
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(creatures)

    let creatureIndex = parseInt(req.params.idx)

    res.render('prehistoric_creatures/show', {myCreatures: creatureData[creatureIndex]})
})

// SHOW/READ (GET) ROUTE

// app.get('/dinosaurs/:idx', (req, res)=>{
//     let dinosaurs = fs.readFileSync('./dinosaurs.json')
//     let dinoData = JSON.parse(dinosaurs)

//     let dinoIndex = parseInt(req.params.idx)

//     res.render('dinosaurs/show', {myDinos: dinoData[dinoIndex]})
// })



