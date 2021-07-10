//Signup form handler 
async function signupFormHandler(event) {
    event.preventDefault();
    //get the information from the signup form 
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    //if all three fields have content 
    if(username && email && password) {
        const response = await fetch('/api/users', {
            method: 'post', 
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json'}
        });
        if (response.ok) {
            alert('Account created! Logging You in Now!');
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText)
        }
    }

}
//Login form handler 
async function loginFormHandler(event) {
    event.preventDefault();

//get infromation from the login form 
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

//if both fields have been filled out 
    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json'}
        });
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText)
        }
    }
}

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);