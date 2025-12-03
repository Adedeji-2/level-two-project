let allUsers = JSON.parse(localStorage.getItem('jumiaUsers')) || []
    
const signUpButton = () =>{
    if(surName.value.trim() === '' || firstName.value.trim() === '' || lastName.value.trim() === '' || email.value.trim() === '' || number.value.trim() === '' || password.value.trim() === '' || check.value.trim() === '') {
        showError.style.display = 'block'
        showError2.style.display = 'none'
    }   else {
      showError.style.display = 'none'
      const userObj = {
        surN: surName.value,
        firstN: firstName.value,
        lastN: lastName.value,
        mail: email.value,
        num: number.value,
        pass: password.value,
        chec: check.value
      }
      let regexString = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      const confirmEmail = regexString.test(userObj.mail)
      if (confirmEmail) {
        const found = allUsers.find(user => user.mail === userObj.mail)
        if (found){
          alert('Account already existed!')
        } else {
           allUsers.push(userObj) 
            localStorage.setItem('jumiaUsers', JSON.stringify(allUsers))
            window.location.href = '../signin/signin.html'

        }
      }
      allUsers.push(userObj)
      console.log(allUsers);
      
      localStorage.setItem('jumiaUsers',JSON.stringify(allUsers))
    }
}
