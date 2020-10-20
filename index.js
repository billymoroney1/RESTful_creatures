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
app.use('/prehistoric_creatures', require('./controllers/prehistoric_creatures'))




