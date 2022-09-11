const buttonEl = document.querySelector('#btn2')
const inputField = document.querySelector('#email')
const errorField = document.querySelector('.return_error')

  buttonEl.addEventListener('click', (e)=>{
    e.preventDefault()
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;    
    if (inputField.value.length == 0) {
      inputField.classList.add('error_active')
      errorField.innerHTML = "Email Field can't be empty!🙄 "
      errorField.style.display = 'block'
      setTimeout(() => {
        inputField.classList.remove('error_active')
        errorField.innerHTML = ""
        errorField.style.display = 'none'
      }, 1500)
    } else if (re.test(String(inputField.value).toLowerCase()) !== true) {
      inputField.classList.add('error_active')
      errorField.innerHTML = "Invalid Email syntax!"
      errorField.style.display = 'block'
      setTimeout(() => {
        inputField.classList.remove('error_active')
        errorField.innerHTML = ""
        errorField.style.display = 'none'
      }, 1500)
    } else {
      try {
      
        buttonEl.innerHTML = '';
        const newSpan = document.createElement('div')
        buttonEl.disabled = true
        newSpan.classList.add('loader')
        buttonEl.appendChild(newSpan)
        buttonEl.style.display = 'block';
        buttonEl.style.justifyContent = 'center';
        buttonEl.style.alignItems = 'center';




        // Send Ajax for Email Operations https://inhoods.herokuapp.com/api/addEmail
			
        
        $.ajax({
          url: "https://inhoods.herokuapp.com/api/addEmail",
          method: "POST",
          data: { email: inputField.value },
          success: function (data) {
            // console.log(data.email);
  
            if (data.status == "401") {
              buttonEl.innerHTML = "Request Access";
              buttonEl.disabled = false;
              inputField.classList.add("error_active");
              errorField.innerHTML = "Email Already Exists!";
              errorField.style.display = "block";
              setTimeout(() => {
                inputField.classList.remove("error_active");
                errorField.innerHTML = "";
                errorField.style.display = "none";
              }, 1500);
            } else if (data.status == "200") {
              inputField.value = "";
              errorField.style.color = 'Green'
              errorField.style.display = "block";
              errorField.innerHTML = 'You have been added to the wait-list!😀'
              buttonEl.innerHTML = "Request Access";
              buttonEl.disabled = false;
            }
          },
        });
      } catch (error) {      
          buttonEl.innerHTML = 'Request Access'
          buttonEl.disabled = false
          alert('Something went wrong, Try Again Later', error)        
      }
      
    }     
    }) 



