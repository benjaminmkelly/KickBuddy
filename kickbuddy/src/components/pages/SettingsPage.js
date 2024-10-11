import '../../css/SettingsPage.css';
import Switch from '@mui/material/Switch';
import changeBackgroundIcon from "../../img/background-change-icon.png";
import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

function SettingsPage() {

    // State variable for showing bug report page
    const [openReportBug, setOpenReportBug] = useState(false);

    const [bugReportInput, setBugReportInput] = useState('');

    const [darkMode, setDarkMode] = useState(false);

    const handleDarkModeChange = () => {
        // code here to set dark mode
        if (!darkMode) {
            alert("You have enabled dark mode!");
            setDarkMode(true);
            console.log("Dark Mode: Enabled");
        } else {
            alert("You have disabled dark mode!");
            setDarkMode(false);
            console.log("Dark Mode: Disabled");
        }

    }

    // -=-=-=-=-=-=- SO CLOSE TO GETTING THIS TO WORK, THINK THE ISSUE IS WITH THE FILE PATHS -=-=-=-=-=-=-
    // useEffect(() => {
    //     const appContainer = document.getElementById('App');
    //     if(darkMode) {
    //         appContainer.style.backgroundImage = "url('../img/background-pitch.png')";
    //         console.log("useEffect darkmode on");
    //     } else {
    //         appContainer.style.backgroundImage = "url('../img/background-pitch.png')";
    //         console.log("useEffect darkmode off");
    //     }
    // }, [darkMode]);


    const changeBackground = () => {
        // code here to change background
        alert("You have changed the background!");
    }

    const handleClickToOpenReportBug = () => {
        setOpenReportBug(true);
    };
    const handleToCloseReportBug = () => {
        setOpenReportBug(false);
    };

    // Functions to send bug report text to API
    const handleBugReportInput = (event) => {
        setBugReportInput(event.target.value);
    };

    // Function to send bug report to API
    const handleBugReport = () => {
        
        if(bugReportInput.trim() !== "") {
            
            fetch("http://unn-w19014367.newnumyspace.co.uk/kickbuddy/api/bugreport", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text: bugReportInput }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json(); // Return the response text instead of JSON
                })
                .then((text) => {
                    // console.log("Response text: ", text); // Log the response text 
                    alert("Thank you for letting us know about an issue.");
                    if (text) {
                        console.log("Bug report successful, thanks for letting us know.");
                    } else {
                        console.log("Error reporting bug ELSE: ", text.message, ". Please try again.");
                    }
                })
                .catch((error) => {
                    console.log("Error reporting bug CATCH: ", error.message, ". Please try again.");
                });

                setOpenReportBug(false);

        } else {
            alert("You must enter a bug before submitting.");
        }
            
    };
    

    return (

        <div className="settings-page-container">
            <h2>Settings</h2>
            <div className="settings-container">
                <div className="menu-item">
                    <span>
                        Dark Mode
                    </span>
                    <Switch
                        checked={darkMode}
                        onChange={handleDarkModeChange}
                        className="dark-mode-switch"
                        color='default'
                    />
                </div>
                <div className="menu-item">
                    <span>
                        Change background
                    </span>
                    <button className="background-button" onClick={changeBackground}>
                        <img className="background-change-icon" src={changeBackgroundIcon} alt="Change background icon" />
                    </button>
                </div>
                <div className='menu-item'>
                    <span>
                        Report a bug
                    </span>
                    <button className="bug-button" onClick={handleClickToOpenReportBug} />
                </div>

                <Dialog open={openReportBug} onClose={handleToCloseReportBug}>
                    <DialogTitle>{"Report a bug"}</DialogTitle>
                    <DialogContent>
                        <div className='report-bug-container'>
                            <p>Please describe the bug you have encountered:</p>
                            <input type="text" onChange={handleBugReportInput} id='report-bug-text-input' name='report-bug-text-input'></input>
                            <button onClick={handleBugReport}>SUBMIT</button>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={handleToCloseReportBug}
                            color="primary"
                            autoFocus
                        >
                            CLOSE
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    )

}

export default SettingsPage;