import { useEffect, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import '../../css/PlayPage.css';
import '../../css/Match.css';
import Match from '../Match.js';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Fab } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';


function PlayPage() {

    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openPostMatch, setOpenPostMatch] = useState(false);
    const [openJoinMatch, setOpenJoinMatch] = useState(false);
    const [showUserInput, setShowUserInput] = useState(false);
    const [showInfo, setShowInfo] = useState(true);

    /** Variables to store uploaded match details */
    const [upload_Team1, setUpload_Team1] = useState("");
    const [upload_Team2, setUpload_Team2] = useState("");
    const [upload_Date, setUpload_Date] = useState("");
    const [upload_Time, setUpload_Time] = useState("");
    const [upload_Venue, setUpload_Venue] = useState("");
    const [matchFormData, setMatchFormData] = useState([]);

    useEffect(() => {
        fetch('http://unn-w19014367.newnumyspace.co.uk/kickbuddy/api/play')
            .then(response => response.json())
            .then(
                (json) => {
                    setMatches(json.data);
                    setLoading(false);
                }
            )
            .catch(
                (e) => {
                    console.log(e.message);
                    setLoading(false);
                }
            )
    }, []);

    const extendMatchesList = () => {
        // Code to produce more matches here
        alert("There are no more available matches currently, try again later!");
    };

    /** Post match dialog box functions */
    const handleClickToOpenPostMatch = () => {
        setOpenPostMatch(true);
    };
    const handleToClosePostMatch = () => {
        setOpenPostMatch(false);
    };

    const handleClickToOpenJoinMatch = () => {
        setOpenJoinMatch(true);
    };
    const handleToCloseJoinMatch = () => {
        setOpenJoinMatch(false);
    };

    /** Post Match Form functions */
    const handlePostMatch = (event) => {
        if ((upload_Team1 === "") || (upload_Team2 === "") || (upload_Date === "") || (upload_Time === "") || (upload_Venue === "")) {
            event.preventDefault();
            alert("You must fill in all fields.")
        } else {
            event.preventDefault();
            const random = (min, max) => {
                return Math.floor(Math.random() * (max - min)) + min;
            }
            setMatchFormData({
                "matchName": upload_Team1 + " vs " + upload_Team2,
                "KODate": upload_Date,
                "KOTime": upload_Time,
                "venue": upload_Venue,
                "matchID": random(30, 80)
            });
            matchesList.push(matchFormData);
            setShowUserInput(true);
            alert("You have successfully posted a match!");
            handleToClosePostMatch();
        }
    };

    const handleJoinMatch = () => {
        if (localStorage.getItem('username')) {
            setOpenJoinMatch(false);
            alert("You have successfully joined the match!\r")
        } else {
            alert("You must be signed in to join a match.")
        }


    };

    const handleShowInfo = () => {
        setShowInfo(!showInfo);
    };

    const handleUpload_Team1 = (event) => {
        setUpload_Team1(event.target.value);
    };
    const handleUpload_Team2 = (event) => {
        setUpload_Team2(event.target.value);
    };
    const handleUpload_Date = (event) => {
        setUpload_Date(event.target.value);
    };
    const handleUpload_Time = (event) => {
        setUpload_Time(event.target.value);
    };
    const handleUpload_Venue = (event) => {
        setUpload_Venue(event.target.value);
    };


    /** Mapping the query result into individual objects */
    const matchesList = matches.map(match => (<Match key={match.matchID} contents={match} handleClickToOpenJoinMatch={handleClickToOpenJoinMatch} />));

    return (
        <div>
            <div className="heading-container">
                <div className="info-container">
                    <Fab size="small" onClick={handleShowInfo}>
                        <InfoIcon />
                    </Fab>
                    {showInfo && <div>
                        <span>Tap me to close!</span>
                        <p>
                            KickBuddy is a 5-a-side football management hub, that not only facilitates finding matches to play in and players to join your matches, 
                            but also draws your attention towards self-care through the medium of fitness and wellbeing information and tips, as well as system to 
                            keep track of how you are getting on. <br/><strong> Sign in on the Profile tab to get started!</strong>
                        </p>
                    </div>}
                </div>
                <h2>JOIN OR POST A MATCH</h2>
                {loading && <CircularProgress color="inherit" />}
            </div>
            <button className="post-match-button" onClick={handleClickToOpenPostMatch}>POST MATCH</button>
            <div>
                {showUserInput && <Match key={matchFormData.matchID} contents={matchFormData} handleClickToOpenJoinMatch={handleClickToOpenJoinMatch} />}
                {matchesList}
                <button className="more-matches-button" onClick={extendMatchesList}>LOAD MORE MATCHES</button>

                <Dialog open={openPostMatch} onClose={handleToClosePostMatch}>
                    <DialogTitle>{"POST A MATCH"}</DialogTitle>
                    <DialogContent>
                        <div>
                            <form className="upload-match-form">
                                <input
                                    type="text"
                                    placeholder="Enter Team 1"
                                    defaultValue={upload_Team1}
                                    onChange={handleUpload_Team1}
                                />
                                <input
                                    type="text"
                                    placeholder="Enter Team 2"
                                    defaultValue={upload_Team2}
                                    onChange={handleUpload_Team2}
                                />
                                <input
                                    type="text"
                                    placeholder="Enter date (dd/mm/yy)"
                                    defaultValue={upload_Date}
                                    onChange={handleUpload_Date}
                                />
                                <select
                                    value={upload_Time}
                                    onChange={handleUpload_Time}
                                >
                                    <option value="">Choose a time</option>
                                    <option value="8:00">8:00</option>
                                    <option value="8:30">8:30</option>
                                    <option value="9:00">9:00</option>
                                    <option value="9:30">9:30</option>
                                    <option value="10:00">10:00</option>
                                    <option value="10:30">10:30</option>
                                    <option value="11:00">11:00</option>
                                    <option value="11:30">11:30</option>
                                    <option value="12:00">12:00</option>
                                    <option value="12:30">12:30</option>
                                    <option value="13:00">13:00</option>
                                    <option value="13:30">13:30</option>
                                    <option value="14:00">14:00</option>
                                    <option value="14:30">14:30</option>
                                    <option value="15:00">15:00</option>
                                    <option value="16:30">16:30</option>
                                    <option value="17:00">17:00</option>
                                    <option value="17:30">17:30</option>
                                    <option value="18:00">18:00</option>
                                    <option value="18:30">18:30</option>
                                    <option value="19:00">19:00</option>
                                    <option value="19:30">19:30</option>
                                    <option value="20:00">20:00</option>
                                    <option value="20:30">20:30</option>
                                    <option value="21:00">21:00</option>
                                    <option value="21:30">21:30</option>
                                    <option value="22:00">22:00</option>
                                </select>
                                <input
                                    type="text"
                                    placeholder="Enter Venue"
                                    defaultValue={upload_Venue}
                                    onChange={handleUpload_Venue}
                                />
                                <br />
                                <button onClick={handlePostMatch}>POST</button>
                            </form>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={handleToClosePostMatch}
                            color="primary"
                            autoFocus>
                            CLOSE
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={openJoinMatch} onClose={handleToCloseJoinMatch}>
                    <DialogTitle>{"JOIN A MATCH"}</DialogTitle>
                    <DialogContent>
                        <div className="join-match-container">
                            <span>This match has a free spot for you to join! Click below to join the match.</span>
                            <button onClick={handleJoinMatch}>JOIN MATCH</button>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={handleToCloseJoinMatch}
                            color="primary"
                            autoFocus>
                            CLOSE
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    )

}

export default PlayPage;