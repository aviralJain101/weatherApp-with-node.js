//fetch api can only be used in client side js


const form = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


form.addEventListener('submit',(e)=>{
    e.preventDefault() //doesnt refershes page
    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error)
            messageOne.textContent = data.error
        }else{
            messageOne.textContent = data.location
            messageTwo.textContent = 'Today Temperature is '+data.forecast + '. The weather is '+data.type
        }
    })
    })
})