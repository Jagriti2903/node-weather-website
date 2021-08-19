const hbs = require('hbs')
const path = require('path')
const express = require('express')
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

console.log(__dirname)
const app = express()

// console.log(__dirname)
// console.log( path.join(__dirname,'../public'))
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
// hbs.registerPartials(partialsPath)

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {

    res.render('index',{

        title : 'Weather ',
        name : 'Jagriti'
    })
})

app.get('/Help',(req,res) => {

    res.render('help',{

        helpText: 'This is some helpful text.',
        title : 'Help ',
        name : 'Jagriti',
       
    })
})

app.get('/About',(req,res) => {

    res.render('about',{

        title : 'About me ',
        name : 'Jagriti'
    })
})

app.get('/Weather',(req,res)=>{

    if(!req.query.address) {

        return res.send({
            error : 'You must provide an address!'
        })

    }

    geocode(req.query.address, (error, {latitude,longitude,location} = {}) => {

        if(error) {

            return res.send({error})
        }

        forecast(latitude,longitude,(error,forecastData)=>{

            if(error) {

                return res.send({error})
            }

            res.send({

                forecast : forecastData,
                location,
                address : req.query.address

            })
        })
    })


})

app.get('/Help/*',(req,res) => {

    res.render('404',{
        title: '404',
        name: 'Jagriti',
        errorMessage: 'Help article not found.'
    })
})

app.get('*',(req,res) => {

    res.render('404', {
        title: '404',
        name: 'Jagriti',
        errorMessage: 'Page not found.'
    })
})

// app.get('' , (req,res)=>{

//     res.send('hello express')
// })

// app.get('/help',(req,res)=>{
    
//     res.send('help page')
// })

// app.get('/about',(req,res)=>{

//     res.send('<h1>about</h1>')
// })

// app.get('/weather',(req,res)=>{
    
//     res.send({

//         forecast:'it is raining ',
//         location : 'india'
//     })
// })

app.listen(3000,()=>{

    console.log('server running on port 3000')
})


