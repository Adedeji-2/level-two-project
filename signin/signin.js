// const sign = () => {
//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;
//     let allUsers = JSON.parse(localStorage.getItem('jumiaUsers')) || [];

//     if (email.trim() === '' || password.trim() === '') {
//         alert('Please fill in all fields.');
//         return;
//     } 
//     const foundUser = find(user => (user.mail === email || user.num === email) && user.pass === password);

//     if (foundUser) {
//        setTimeout(() => {
//         window.location.href = 'dashboard.html'
//        }, 1000);
//     } else {
//         alert('Invalid email/number or password.');
//     }
// }

let allUsers = JSON.parse(localStorage.getItem('jumiaUsers')) || [];
const sign = () => {
    if(email.value.trim() === '' || password.value.trim() === '') {
        alert("Input all fields!")
    } else {
        const signedInUsers = {
            mail: email.value,
            pass: password.value
        }
        console.log(signedInUsers);
        const foundUser = allUsers.find(user => (user.mail === signedInUsers.mail && user.pass === signedInUsers.pass));
        if(foundUser) {
            setTimeout(() => {
                window.location.href = '../dashboard/dashboard.html'
            }, 1000);
            // alert('hi')
        } else{
            alert("email or password is not found!");
        }
    }
}