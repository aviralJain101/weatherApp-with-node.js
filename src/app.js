const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')

const app = express()

//define path for express config
const publicDirecPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handelbar engine and views location
//to integrate handler hbs with express it allowes us to use dynamic web pages
app.set('view engine','hbs')
app.set('views',viewsPath) //for using views if we change folder name other than views
hbs.registerPartials(partialsPath)

//the index.html is for home page
app.use(express.static(publicDirecPath))//to use static html pages

app.get('',(req,res)=>{
    res.render('index.hbs',{
        title: 'Weather app',
        name: 'AVJ'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About',
        name: 'AVJ'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        message: 'Need any help contact me'
    })
})
////request for home page
// app.get('',(req,res)=>{
//     res.send('Express running')
// })

// app.get('/help',(req,res)=>{
//     res.send('Help Page')
// })

// app.get('/about',(req,res)=>{
//     res.send('<h1>About page<h1>')
// })

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send('Provide an address')
    }
    forecast(req.query.address,(error,data)=>{
        if(error){
            return res.send({error})
        }
        res.send({
            location: data.location,
            forecast: data.temp,
            type: data.type 
        })
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        message: 'Help Page not found'
    })
})

app.get('*',(req,res)=>{ //* is for the pages that is not defined above
    res.render('404',{
        title: '404',
        message: 'Page not found'
    })
})

//starting a server //3000 is server for dev
app.listen(3000, ()=>{
    console.log('server started')
})