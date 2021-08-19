const hbs = require('hbs')
const path = require('path')
const express = require('express')
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

console.log(__dirname)
const app = express()
const port = process.env.PORT || 3000

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

app.listen(port,()=>{

    console.log('server running on port ' + port)
})



