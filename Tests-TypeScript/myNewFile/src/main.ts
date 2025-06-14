const submitButton = document.querySelector('.submitButton');
if (submitButton) {
  submitButton.addEventListener('click', async (e) => {
    e.preventDefault();

    const firstName = (document.querySelector('#firstName') as HTMLInputElement)?.value;
    const lastName = (document.querySelector('#lastName') as HTMLInputElement)?.value;
    const userName = (document.querySelector('#userName') as HTMLInputElement)?.value;
    const email = (document.querySelector('#email') as HTMLInputElement)?.value;
    const password = (document.querySelector('#password') as HTMLInputElement)?.value;
        
    try {
        const response = await fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ firstName, lastName, userName, email, password }),
          credentials: "include" // This is required to allow cookies. DO NOT FORGET THIS!
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('User submitted:', result);
        alert('User created successfully! Please log in.');
        if (loginForm && registerForm) {
            loginForm.classList.remove('hidden');
            registerForm.classList.add('hidden');
        }
        
      } catch (error) {
        console.error('Submission failed:', error);
        alert('Failed to create user. See console for details.');
      }

    });
}

        const linkToForm = document.querySelector('.linkToForm')
        const loginButton = document.querySelector('.login-bar');
        const loginForm = document.querySelector('.loginForm');
        const registerForm = document.querySelector('.registerForm');
        if (loginButton && loginForm && registerForm && linkToForm) {
          linkToForm.addEventListener('click', (e) => {
            e.preventDefault();
            registerForm.classList.remove('hidden');
            loginForm.classList.add('hidden');
          });
        }
        if (loginButton && loginForm && registerForm && linkToForm) {
          loginButton.addEventListener('click', (e) => {
            e.preventDefault();
            loginForm.classList.remove('hidden');
            registerForm.classList.add('hidden');
          });
        }

        const submitLoginButton = document.querySelector('.submitLoginButton');
        if (submitLoginButton) {
          submitLoginButton.addEventListener('click', async (e) => {
            e.preventDefault();

            const usernameLogin = (document.querySelector('#userNameLogin') as HTMLInputElement)?.value;
            const passwordLogin = (document.querySelector('#passwordLogin') as HTMLInputElement)?.value;

            try {
              const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  userName: usernameLogin,
                  password: passwordLogin
                }),

                credentials:"include"
              });
              if(!response.ok) {
                throw new Error (`Login failed:  ${response.status}`);
              }

              const result = await response.json();
              console.log(`User logged in ${result}`);
              alert('you are logged in!');
            } catch (error) {
              console.error('Login error:', error);
              alert('Login failed. Please check your credentials.');
            }
          });
        }