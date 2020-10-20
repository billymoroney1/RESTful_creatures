const express = require('express')
const router = express.Router()
const fs = require('fs')

router.get('/', (req, res)=>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    console.log(dinoData)

    //handle a query string if there is one
    console.log("Req. query is "+req.query.nameFilter)
    let nameFilter = req.query.nameFilter
    if(nameFilter){ // reassign dinoData to only be an array of dinos whose name matches the query string name (and make it ignore case)
        dinoData = dinoData.filter(dino=>{
          return dino.name.toLowerCase() === nameFilter.toLowerCase()  
        })
    }

    res.render('dinosaurs/index', {myDinos:dinoData})
})

router.get('/', (req, res)=>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    res.render('dinosaurs/index', {myDinos: dinoData})
})

router.post('/', (req, res)=>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    dinosaurs = JSON.parse(dinosaurs)

    dinosaurs.push(req.body)

    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinosaurs))

    res.redirect('dinosaurs')
})

router.get('/new', (req, res)=>{
    res.render('dinosaurs/new')
})

router.get('/:idx', (req, res)=>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)

    let dinoIndex = parseInt(req.params.idx)

    res.render('dinosaurs/show', {myDinos: dinoData[dinoIndex]})
})







module.exports = router