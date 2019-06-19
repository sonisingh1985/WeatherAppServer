console.log('client side java script is loaded')
/*fetch('http://localhost:3000/weather?address=boston').then((response)=>{
    response.json().then((data)=>{
       if(data.error)
       {
        console.log(data.error) 
       }
       else
       {
           console.log(data.location) 
           console.log(data.forecast)

       }
    })
}) */

const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')
//messageOne.textContent='Form JavaScript'
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value
    messageOne.textContent='location...'
    messageTwo.textContent=''
    var url='/weather?address='+location
    fetch(url).then((response)=>{
    response.json().then((data)=>{
        //console.log(data)
       if(data.error)
       {
        //console.log(data.error)
        messageOne.textContent=data.error
        messageTwo.textContent='' 
       }
       else
       {
          // console.log(data.location) 
           //console.log(data.forecast)
           messageOne.textContent=data.location
           messageTwo.textContent=data.forecast 

       }
    })
}) 

})