async function loginFormHandler(event) {
    event.preventDefault();
  
    // Collect values from the login form
    const username = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    
    if (username && password) {
         // Send a POST request to the API endpoint
      const response = await fetch('/api/users/login', {
        method: 'post',
        body: JSON.stringify({
          username,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        console.log("logged in");
        alert("logged in!!!")
        // If successful, redirect the browser to the dashboard page
        document.location.replace('/');
      } else {
        alert(response.statusText);  
      }
    }
    else
    {
      alert("Please enter both username and password");
    }
  };
  
  document.querySelector('#login-btn').addEventListener('click', loginFormHandler);