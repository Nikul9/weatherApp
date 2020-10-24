const path = require('path')
const express = require('express')
const hbs =  require('hbs')
const forcast = require('./utils/forcast')
const giocode = require('./utils/giocode')
const port = process.env.PORT || 3000
const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname , '../templets/views')
const partialsPath = path.join(__dirname , '../templets/partials')

app.set('view engine', 'hbs')
app.set('views',viewPath);
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index',{
        title: 'weather',
        name: 'Nikul'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'ABOUT',
        name: 'Nikul'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title: 'HELP', 
        helpText: 'HELP A TEAM ', 
        name: 'NIKUL'
    })
})

app.get('/weather',(req,res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    
    giocode(req.query.address,(error,{logtitut,laptitute,location} = {}) => {
        if(error) {
            res.send({error})
        }
        forcast(logtitut,laptitute,(error,data) => {
            if(error) {
                res.send({error})
            }
            else{
            res.send({
                forcast: data,
                location,
                address: req.query.address
            })
        }
        }) 
    })
}) 


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})


app.get('/help/*',(req,res) => {
    res.render('404',{
        title: '404',
        name:'Nikul',
        errorMessage: 'HELP Page Not Found.'
    })
})
app.get('*',(req,res) => {
    res.render('404',{
        title: '404',
        name:'Nikul',
        errorMessage: 'Page Not Found.'
    })
})

app.listen(port, () => {
        console.log('Server is up on port 3000.')
})