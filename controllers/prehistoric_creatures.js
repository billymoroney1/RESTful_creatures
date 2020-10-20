const express = require('express')
const router = express.Router()
const fs = require('fs')

module.exports = router

router.get('/', (req, res)=>{
    let prehistoricCreatures = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(prehistoricCreatures)
    res.render('prehistoric_creatures/index', {myCreatures: creatureData})
})

router.post('/', (req, res)=>{
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    creatures = JSON.parse(creatures)

    creatures.push(req.body)

    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatures))

    res.redirect('/prehistoric_creatures')
})

router.get('/new', (req, res)=>{
    res.render('prehistoric_creatures/new')
})

router.get('/:idx', (req, res)=>{
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(creatures)

    let creatureIndex = parseInt(req.params.idx)

    res.render('prehistoric_creatures/show', {myCreatures: creatureData[creatureIndex]})
})
