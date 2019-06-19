const path=require('path')
const express=require('express')
const hbs=require('hbs')
//console.log(path.join(__dirname,'../public'))
const app=express()
const port =process.env.PORT || 3000
const publicDir=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../templates/views')
const viewPathPartials=path.join(__dirname,'../templates/partials')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(viewPathPartials)

app.use(express.static(publicDir))

app.get('',(req,res)=>{
   res.render('index',{
       title:'Test',
       name:'soni'
   })
    })  
    app.get('/about',(req,res)=>{
        res.render('about',{
            title:'abt hbs',
            name:'soni'
        })
         })  
         app.get('/help',(req,res)=>{
            res.render('help',{
                message:'help hbs-soni',
                title:'help hbs',
                name:'soni'
            })
             })  
app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return  res.send(
            {
                error:"you must provide a address option!"
            }
        )
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error)
        {
            return  console.log(error);
        }
        
           forecast(latitude,longitude,(error,forecastdata)=>{
            if(error)
            {
                return  console.log(error);
            }  
            res.send({
                forecastdata:forecastdata,
                location,
                address:req.query.address
            })
        })
    })
        
})  
app.get('/products',(req,res)=>{
    if(!req.query.search)
    {
        return  res.send(
            {
                error:"you must provide a search option!"
            }
        )
    }
    console.log(req.query.search)
                res.send(
                    {
                        product:[]
                    }
                )
})     
          
app.get('/help/*',(req,res)=>{
                res.render('404',{
                    title:'404',
                    name:'soni',
                    errorMessage:'help article not found!'
                })
            })              
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'soni',
        errorMessage:'page not found!'
    })
})            
app.listen(port,()=>{
    console.log('Server is up on port number '+ port)
})