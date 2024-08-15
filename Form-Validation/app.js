const userName = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#cpassword");
const form = document.querySelector("#form");

// emailpattern = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;

form.addEventListener("submit",(event) => {
    // event.preventDefault();
    // validateInputs();  --- validation logics
    // console.log("Subit")

    //check success is true or false;
    if(!validateInputs()) {
        event.preventDefault();
    }
});

function validateInputs() {
    const userNameVal = userName.value.trim();
    const emailVal = email.value.trim();
    const passwordVal = password.value.trim();
    const confirmPasswordVal = confirmPassword.value.trim();

    let success = true;//if any one error the form  not be submited


    //username check
    if(userNameVal==="") {
        success = false;
        setError(userName,"User name is required");

    } else {
        setSuccess(userName);
    }

    //email check
    if(emailVal === "") {
        success = false;
        setError(email, "Email is required");
    } else if(!validateEmail(emailVal)) {
        success = false;
        setError(email,"Please enter a valid email");
    } else {
        setSuccess(email);
    }

    //check password
    if(passwordVal === "") {
        success = false;
        setError(password, "Password is required");
    } else if(passwordVal.length<8){
        success = false;
        setError(password,"Password must be contain 8 characters");
    } else {
        setSuccess(password);
    }

    //check Confirmpassword
    if(confirmPasswordVal !== passwordVal) {
        success = false;
        setError(confirmPassword,"Confirm password does not match your password");
    } else if(confirmPasswordVal === "") {
        success = false;
        setError(confirmPassword, "Confirm password is required")
    } 
    else {
        setSuccess(confirmPassword);
    }



};

//element / set - err msg to the element
function setError(element,message) {
    const inputField = element.parentElement;
    const errorElement = inputField.querySelector(".error");

    errorElement.innerText = message;
    inputField.classList.add("error"); //add class to input filed error style
    inputField.classList.remove("success");

};

function setSuccess(element) {
    const inputField = element.parentElement;
    const errorElement = inputField.querySelector(".error");

    errorElement.innerText = "";
    inputField.classList.add("success"); //to add input-filed succes style
    inputField.classList.remove("error");

};

const validateEmail = (email) => {
    //regex method
    //convert lowercase and match regular expression - to check regular expression;
    return String(email).toLowerCase().match(/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/);

}

