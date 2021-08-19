const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const search = document.querySelector('input')
const weatherForm = document.querySelector('form')

weatherForm.addEventListener('submit',(e)=>{

    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'loading...'
    messageTwo.textContent = ' '

    fetch('/weather?address='+location).then( (response) => {

    response.json().then((data)=>{

        if(data.error) {

           messageOne.textContent = data.error
           messageOne.style.color = "#FF0000";
        }

        else
        {
         messageOne.style.color = "#13867d"
           messageOne.textContent = data.location
           messageTwo.textContent = data.forecast
       }
    })


  })


})