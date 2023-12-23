var userData = [];
var mybtn = document.getElementById("mybtn");
var updatedIndex;
var userName = document.getElementById("userName");
var userPassword = document.getElementById("userPassword");
var userEmail = document.getElementById("userEmail");
var userNumber = document.getElementById("userNumber");
var signinEmail = document.getElementById('signinEmail');
var signinPassword = document.getElementById('signinPassword');
function toggleSectionVisibility(id, visible = true) {
    var section = document.getElementById(id);
    section.style.display = visible ? 'block' : 'none';
}
function isEmpty() {
    var signupName = document.getElementById('userName');
    var signupEmail = document.getElementById('userEmail');
    var signupPassword = document.getElementById('userPassword');

    if (signupName.value === "" || signupEmail.value === "" || signupPassword.value === "") {
        
        document.getElementById("empty").textContent = `Input fields can't be empty.`;
        return false; // Stop the signup process if fields are empty
    }

    // No need for "return true" here
}


// Function to check if an email already exists in local storage
var mybtn = document.getElementById("mybtn");
var updatedIndex;
var userName = document.getElementById("userName");
var userPassword = document.getElementById("userPassword");
var userEmail = document.getElementById("userEmail");
var userNumber = document.getElementById("userNumber");
var signinEmail = document.getElementById('signinEmail');
var signinPassword = document.getElementById('signinPassword');
function toggleSectionVisibility(id, visible = true) {
    var section = document.getElementById(id);
    section.style.display = visible ? 'block' : 'none';
}
function isEmpty() {
    var signupName = document.getElementById('userName');
    var signupEmail = document.getElementById('userEmail');
    var signupPassword = document.getElementById('userPassword');

    if (signupName.value === "" || signupEmail.value === "" || signupPassword.value === "") {
        
        document.getElementById("empty").textContent = `Input fields can't be empty.`;
        return false; // Stop the signup process if fields are empty
    }

    // No need for "return true" here
}

// Function to check if an email already exists in local storage
function isEmailExist(userEmail) {
    for (var i = 0; i < userData.length; i++) {
        if (userData[i].email.toLowerCase() == userEmail.value.toLowerCase()) {
            return true;  // Fixed: Change to true if email exists
        }
    }
    return false;  // Fixed: Return false if email doesn't exist
}

function validatePassword(password) {
    var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;
    return regex.test(password);
}

function signup(event) {
    // Get the input values
    var userName = document.getElementById('userName').value;
    var userPassword = document.getElementById('userPassword').value;
    var userEmail = document.getElementById('userEmail').value;

    // Clear existing messages
    document.getElementById('empty').textContent = '';
    document.getElementById('exist').innerHTML = '';
    document.getElementById('warningpass').textContent = '';

    // Check for empty fields
    if (userName === '' || userEmail === '' || userPassword === '') {
        event.preventDefault();
        document.getElementById('empty').textContent = `Input fields can't be empty.`;
        return false; // Stop further processing
    }

    // Validate password
    if (!validatePassword(userPassword)) {
        document.getElementById('warningpass').textContent = 'Password must meet the specified criteria.';
        event.preventDefault(); // Stop the form submission
        return false;
    }

  // Function to check if an email already exists in local storage
  if (isEmailExist(userEmail)) {
    document.getElementById('exist').innerHTML = '<span class="text-danger m-3">Email already exists</span>';
    event.preventDefault(); // Stop the form submission
    return false;
}

    // Proceed with signup
    var user = {
        name: userName,
        email: userEmail,
        password: userPassword
    };

    var storedUserData = localStorage.getItem('userData');
     userData = storedUserData ? JSON.parse(storedUserData) : [];

    userData.push(user);
    localStorage.setItem('userData', JSON.stringify(userData));

    // Example code to show the values in the console
    console.log('Name:', userName);
    console.log('Password:', userPassword);
    console.log('Email:', userEmail);

    return false;
}





// Event listener for form submission
document.getElementById("forms").addEventListener('submit', signup);


        
     
   

// Function to handle the sign out process
function logout() {
    
        toggleSectionVisibility('SigninSection', true);
        toggleSectionVisibility('SignupSection', false);
        toggleSectionVisibility('welcomeSection', false);
    };
    

// Function to reset the form inputs
function reset() {
    document.getElementById('signinEmail').value = '';
    document.getElementById('signinPassword').value = '';
    document.getElementById('warning').textContent = '';
    document.getElementById('incorrect').textContent = '';
    document.getElementById('userName').value = '';
    document.getElementById('userPassword').value = '';
    document.getElementById('userEmail').value = '';
    document.getElementById('exist').textContent = '';
}

// Function to handle the login process
function login() {
    var storedData = localStorage.getItem('userData');

    if (storedData) {
         userData = JSON.parse(storedData);

        // Assuming these are defined somewhere in your HTML
        var signinEmailElement = document.getElementById('signinEmail');
        var signinPasswordElement = document.getElementById('signinPassword');

        if (signinEmailElement && signinPasswordElement) {
            var signinEmail = signinEmailElement.value.trim();
            var signinPassword = signinPasswordElement.value.trim();

            if (signinEmail && signinPassword) {
                for (var i = 0; i < userData.length; i++) {
                    var storedEmail = userData[i].email.trim();
                    var storedPassword = userData[i].password.trim();

                    if (signinEmail === storedEmail && signinPassword === storedPassword) {
                        toggleSectionVisibility('SigninSection', false);
                        toggleSectionVisibility('welcomeSection', true);
                        var welcomeMessage = document.getElementById('welcomeMessage');
                        welcomeMessage.textContent = 'Hello, ' + userData[i].name ;
                        
                        
            
                        return;  // Exit the function after successful login
                    }
                }

                document.getElementById('incorrect').textContent = 'Incorrect email or password.';
            } else {
                document.getElementById('incorrect').textContent = 'Please enter both email and password.';
            }
        } else {
            console.error('Error: Could not find signinEmail or signinPassword element.');
        }
    } else {
        document.getElementById('incorrect').textContent = 'No user found. Please register.';
    }
}

// Code to attach event listeners to the signup and signin links
document.getElementById('signupLink').addEventListener('click', function(event) {
    event.preventDefault();
    toggleSectionVisibility('SigninSection', false);
    toggleSectionVisibility('SignupSection', true);
    reset();
});

document.getElementById('signinLink').addEventListener('click', function(event) {
    event.preventDefault();
    toggleSectionVisibility('SignupSection', false);
    toggleSectionVisibility('SigninSection', true);
    reset();
});