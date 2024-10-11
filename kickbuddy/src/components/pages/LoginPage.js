import { useState, useEffect } from "react";
import { Buffer } from 'buffer';
import '../../css/LoginPage.css';

function LoginPage({ authenticated, setAuthenticated, handleAuthenticated }) {

    /** Username and password variables for logging in */
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    /** Login detail variables for signing up to create an account */
    const [signUpName, setSignUpName] = useState("");
    const [signUpUsername, setSignUpUsername] = useState("");
    const [signUpPassword, setSignUpPassword] = useState("");
    const [signUpPassword2, setSignUpPassword2] = useState("");
    const [signUpFormData, setSignUpFormData] = useState({
        signUpName: '',
        signUpUsername: '',
        signUpPassword: '',
        signUpPassword2: '',
    });


    useEffect(
        () => {
            if (localStorage.getItem('token')) {
                handleAuthenticated(true);
            }
        });

    /** Arrow functions to handle authentication */
    const handleUsername = (event) => {
        setUsername(event.target.value);
    }
    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleSignUpName = (event) => {
        setSignUpName(event.target.value);
    }
    const handleSignUpUsername = (event) => {
        setSignUpUsername(event.target.value);
    }
    const handleSignUpPassword = (event) => {
        setSignUpPassword(event.target.value);
    }
    const handleSignUpPassword2 = (event) => {
        setSignUpPassword2(event.target.value);
    }


    const handleLogin = () => {

        const encodedString = Buffer.from(username + ":" + password).toString('base64');

        if(!username || !password) {
            alert("You must enter a username and password.");
        } else {
            fetch("http://unn-w19014367.newnumyspace.co.uk/kickbuddy/api/login",
            {
                method: 'POST',
                headers: new Headers({ "Authorization": "Basic " + encodedString })
            })
            .then(
                (response) => {
                    return response.json();
                }
            )
            .then(
                (json) => {
                    if (json.message.toLowerCase() === "success") {
                        if (json.data.hasOwnProperty('token')) {
                            localStorage.setItem('token', json.data.token);
                            localStorage.setItem('username', username);
                            handleAuthenticated(true);
                        }
                    } else {
                        console.log("Error: " + json.message)
                        alert(json.message);
                    }
                }
            )
            .catch(
                (e) => {
                    console.log(e.message)
                }
            )
        }
    }

        

    // Handling signup
    const handleSignUp = () => {
        setSignUpName(signUpName);
        setSignUpUsername(signUpUsername);
        setSignUpPassword(signUpPassword);
        setSignUpPassword2(signUpPassword2);

        // if(signUpPassword !== signUpPassword2) {
        //     alert("Your passwords must match.")
        // } else {
        //     const { name, value } = event.target;
        //     setSignUpFormData((prevFormData) => ({
        //         ...prevFormData,
        //         [name]: value,
        //     }));
        // };

        const handleSubmit = async (event) => {
            event.preventDefault();

            try {
                const response = await fetch('http://unn-w19014367.newnumyspace.co.uk/kickbuddy/api/signup', {
                    method: 'POST',
                    body: JSON.stringify(signUpFormData),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                alert("You have successfully signed up!");
            } catch (error) {
                console.log("Error: " + error);
            }
        };

        alert("We are not currently accepting new members, sorry for any inconvenience caused.");
    }


    return (
        <div>
            {!authenticated && <div>
                <h2>Sign In</h2>
                <div className="login-container">
                    <div className="login-container-login">
                        <p>Sign in with your username and password</p>
                        <input
                            className="login-username-field"
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={handleUsername}
                        />
                        <br />
                        <input
                            className="login-password-field"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={handlePassword}
                        />
                        <br />
                        <input
                            className="login-signin-button"
                            type="button"
                            value="Sign In"
                            onClick={handleLogin}
                        />
                    </div>
                    <br />
                    <div className="login-container-signup" id>
                        <p>Don't have an account? Sign up here:</p>
                        <form onSubmit={handleSignUp}>
                            <input
                                className="signup-name-field"
                                type="text"
                                placeholder="Enter your name"
                                value={signUpName}
                                onChange={handleSignUpName}
                            />
                            <br />
                            <input
                                className="signup-username-field"
                                type="text"
                                placeholder="Enter your username"
                                value={signUpUsername}
                                onChange={handleSignUpUsername}
                            />
                            <br />
                            <input
                                className="signup-password-field"
                                type="password"
                                placeholder="Enter your password"
                                onChange={handleSignUpPassword}
                            />
                            <br />
                            <input
                                className="signup-password-field2"
                                type="password"
                                placeholder="Re-enter your password"
                                onChange={handleSignUpPassword2}
                            />
                            <br />
                            <input
                                className="signup-signup-button"
                                type="button"
                                value="Sign Up"
                                onClick={handleSignUp}
                            // need to write handleSignUp function to add user details to database
                            // also need validation for that info
                            />
                        </form>
                    </div>
                </div>
            </div>
            }
        </div>
    )

}

export default LoginPage;