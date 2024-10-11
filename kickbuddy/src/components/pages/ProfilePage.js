import '../../css/ProfilePage.css';
import { useState, useEffect } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import LoginPage from './LoginPage.js';
import ProfileInfo from '../ProfileInfo.js';
import { Dialog, DialogTitle, Button, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import MatchHistory from '../MatchHistory';


function ProfilePage({ profileInfo, authenticated, setAuthenticated }) {

    const [profileInfos, setProfileInfos] = useState([]);
    const [currentProfile, setCurrentProfile] = useState(localStorage.getItem('username'));
    const [loading, setLoading] = useState(true);
    const handleAuthenticated = (isAuthenticated) => { setAuthenticated(isAuthenticated) }
    const [openWellbeing, setOpenWellbeing] = useState(false);
    const [openFitness, setOpenFitness] = useState(false);
    const [openMatchHistory, setOpenMatchHistory] = useState(false);
    const [openStats, setOpenStats] = useState(false);
    const [currentTip, setCurrentTip] = useState(0);
    // Wellbeing
    const [preMatchWellbeingScores, setPreMatchWellbeingScores] = useState([]);
    const [currentPreMatchWellbeing, setCurrentPreMatchWellbeing] = useState(0)
    const [averagePreMatchWellbeing, setAveragePreMatchWellbeing] = useState("-");

    const [postMatchWellbeingScores, setPostMatchWellbeingScores] = useState([]);
    const [currentPostMatchWellbeing, setCurrentPostMatchWellbeing] = useState(0)
    const [averagePostMatchWellbeing, setAveragePostMatchWellbeing] = useState("-");
    //Fitness
    const [preMatchFitnessScores, setPreMatchFitnessScores] = useState([]);
    const [currentPreMatchFitness, setCurrentPreMatchFitness] = useState(0);
    const [averagePreMatchFitness, setAveragePreMatchFitness] = useState("-");

    const [postMatchFitnessScores, setPostMatchFitnessScores] = useState([]);
    const [currentPostMatchFitness, setCurrentPostMatchFitness] = useState(0);
    const [averagePostMatchFitness, setAveragePostMatchFitness] = useState("-");

    // Input stats state variables
    const [stats_Date, setStats_Date] = useState("");
    const [stats_Time, setStats_Time] = useState("");
    const [stats_Venue, setStats_Venue] = useState("");
    const [stats_Goals, setStats_Goals] = useState("");
    const [stats_Assists, setStats_Assists] = useState("");
    const [stats_Wellbeing, setStats_Wellbeing] = useState("");
    const [stats_Fitness, setStats_Fitness] = useState("");
    const [statsFormData, setStatsFormData] = useState("");

    useEffect(() => {
        fetch('http://unn-w19014367.newnumyspace.co.uk/kickbuddy/api/profile')
            .then(response => response.json())
            .then(
                (json) => {
                    setProfileInfos(json.data);
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

    // Calculate average wellbeing
    function calculateAverageScore(scores, setter) {
        const average = scores.reduce((total, current) => total + current, 0) / scores.length;
        if (!isNaN(average)) {
          setter(average);
        }
      }
      
      useEffect(() => {
        calculateAverageScore(preMatchWellbeingScores, setAveragePreMatchWellbeing);
      }, [preMatchWellbeingScores]);
      
      useEffect(() => {
        calculateAverageScore(postMatchWellbeingScores, setAveragePostMatchWellbeing);
      }, [postMatchWellbeingScores]);

      useEffect(() => {
        calculateAverageScore(preMatchFitnessScores, setAveragePreMatchFitness);
      }, [preMatchFitnessScores]);

      useEffect(() => {
        calculateAverageScore(postMatchFitnessScores, setAveragePostMatchFitness);
      }, [postMatchFitnessScores]);


    const handleClickToOpenWellbeing = () => {
        setOpenWellbeing(true);
    };
    const handleToCloseWellbeing = () => {
        setCurrentTip(0);
        setOpenWellbeing(false);
    };

    const handleClickToOpenFitness = () => {
        setOpenFitness(true);
    };
    const handleToCloseFitness = () => {
        setCurrentTip(0);
        setOpenFitness(false);
    };

    const handleClickToOpenMatchHistory = () => {
        setOpenMatchHistory(true);
    };
    const handleToCloseMatchHistory = () => {
        setOpenMatchHistory(false);
    };

    // Handling pre-match and post-match wellbeing and fitness inputs
    const handlePrematch_Wellbeing = () => {
        const wellbeingScores = [...preMatchWellbeingScores, +currentPreMatchWellbeing];
        if(currentPreMatchWellbeing < 0 || currentPreMatchWellbeing > 10) {
            alert("You must enter a value between 0 and 10.");
        } else {
            setPreMatchWellbeingScores(wellbeingScores);
        }
    };
    const handlePostmatch_Wellbeing = () => {
        const wellbeingScores = [...postMatchWellbeingScores, +currentPostMatchWellbeing];
        if(currentPostMatchWellbeing < 0 || currentPostMatchWellbeing > 10) {
            alert("You must enter a value between 0 and 10.");
        } else {
            setPostMatchWellbeingScores(wellbeingScores);
        }
    };
    const handlePrematch_Fitness = () => {
        const fitnessScores = [...preMatchFitnessScores, +currentPreMatchFitness];
        if(currentPreMatchFitness < 0 || currentPreMatchFitness > 10) {
            alert("You must enter a value between 0 and 10.");
        } else {
            setPreMatchFitnessScores(fitnessScores);
        }
    }
    const handlePostmatch_Fitness = () => {
        const fitnessScores = [...postMatchFitnessScores, +currentPostMatchFitness];
        if(currentPostMatchFitness < 0 || currentPostMatchFitness > 10) {
            alert("You must enter a value between 0 and 10.");
        } else {
            setPostMatchFitnessScores(fitnessScores);
        }
    };

    // Open and Close 'Input Stats' dialog
    const handleClickToOpenStats = () => {
        setOpenStats(true);
    };
    const handleToCloseStats = () => {
        setOpenStats(false);
    };

    // Handle 'Input Stats' text fields
    const handleInputStats = (event) => {
        event.preventDefault();
        setStatsFormData({
            "Date": stats_Date,
            "Time": stats_Time,
            "Venue": stats_Venue,
            "Goals": stats_Goals,
            "Assists": stats_Assists,
            "Wellbeing": stats_Wellbeing,
            "Fitness": stats_Fitness
        });
        alert("Feature unavailable at this moment. Apologies for any inconvenience caused.");
    };
    const handleStats_Date = (event) => {
        setStats_Date(event.target.value);
    };
    const handleStats_Time = (event) => {
        setStats_Time(event.target.value);
    };
    const handleStats_Venue = (event) => {
        setStats_Venue(event.target.value);
    };
    const handleStats_Goals = (event) => {
        setStats_Goals(event.target.value);
    };
    const handleStats_Assists = (event) => {
        setStats_Assists(event.target.value);
    };
    const handleStats_Wellbeing = (event) => {
        setStats_Wellbeing(event.target.value);
    };
    const handleStats_Fitness = (event) => {
        setStats_Fitness(event.target.value);
    };

    const handleSignOut = (event) => {
        handleAuthenticated(false);
        localStorage.removeItem('token');
        localStorage.removeItem('username');
    }

    function checkUsername() {
        const storedUsername = localStorage.getItem('username');
        const foundUser = profileInfos.find(user => user.username === storedUsername);
        return (foundUser);
    }

    function nextTip() {
        setCurrentTip((currentTip + 1) % wellbeingTips.length);
    }

    const wellbeingTips = [
        'Reframe unhelpful thoughts - The way we think, feel and behave are linked. Sometimes we develop patterns of thoughts or behaviours that are unhelpful so recognising them, and taking steps to think about things differently, can improve your mental health and wellbeing.',
        'Be in the present - If we take time to be aware of ourselves and be in the present moment, noticing our own thoughts and feelings, and the world around us, we can gain a better perspective. Sometimes this is known as being more mindful.',
        "Get good sleep - Good-quality sleep makes a big difference to how we feel mentally and physically, so it's important to get enough.",
        'Connect with others - Spending quality time with friends or family, talking to someone about how we are feeling or finding ways to help other people can all help stop you from feeling lonely and improve your mental health and wellbeing.',
        'Check out the NHS website for more wellbeing tips - https://www.nhs.uk/every-mind-matters/mental-wellbeing-tips/top-tips-to-improve-your-mental-wellbeing/',
    ];
    const fitnessTips = [
        'Build stamina for football through endurance training - The road to building your stamina is not an easy one. It takes a great deal of hard work and commitment, but your overall level of stamina will have a huge impact on your level of football fitness.',
        "Never underestimate the importance of recovery and rest - All work and no play makes Jack a dull boy; and the same can be said about your fitness. All too often, footballers burn the candle at both ends and don’t acknowledge the importance of proper rest. Take it easy after matches.",
        "Compile a diet plan and stick to it - Let's face it, nobody enjoys sticking to a strict, regimented diet, but it’s vital if you’re truly serious about improving your football fitness.",
        'Build your flexibility and core strength - Whether you’re competing for the high ball or fending off the opposition strikers, core strength is important for your balance and power.',
        'Check out the Jenkins Therapy website for more wellbeing tips - https://jenkinstherapy.com/blog/five-tips-to-improve-football-fitness/',
    ];

    // const playerProfile = profileInfos.filter(checkUsername).map(profileInfo => <ProfileInfo key={profileInfo.playerID} contents={profileInfo} />);
    const playerProfile = profileInfos.filter(checkUsername).slice(0, 1).map(profileInfo => <ProfileInfo key={profileInfo.playerID} contents={profileInfo} />);
    /** Currently the line above cuts out just the first profile (ben's) for demo purposes */

    return (
        <div className="profile-page-container">
            {authenticated && <div>
                {loading && <CircularProgress color="inherit" />}
                <h2>You are now signed in!</h2>
                <input type="button" value="Sign out" onClick={handleSignOut} />
                {playerProfile}

                <Dialog open={openWellbeing} onClose={handleToCloseWellbeing}>
                    <DialogTitle>{"Wellbeing Centre"}</DialogTitle>
                    <DialogContent>

                        <div className='wellbeing-tips-container'>
                            <div>
                                <span>Wellbeing Tips & Info</span>
                                <div className='tips-container'>
                                    <span>"{wellbeingTips[currentTip]}"</span>
                                </div>
                            </div>

                            <button onClick={nextTip}>Next Tip</button>
                            <br />
                        </div>
                        <div className='wellbeing-rating-container'>

                            <div className='wellbeing-rating-item'>
                                <span>Pre-Match Wellbeing Avg:</span>
                                <div id='prematch-wellbeing'>
                                    {averagePreMatchWellbeing}
                                </div>
                            </div>

                            <div className='wellbeing-rating-item'>
                                <span>Post-Match Wellbeing Avg:</span>
                                <div id='postmatch-wellbeing'>
                                    {averagePostMatchWellbeing}
                                </div>
                            </div>

                            <p>Enter your rating (0-10) in the box below and hit submit to add it to the average when you are ready!</p>
                            <div className='wellbeing-input-text-container'>
                                <p className='prematch-text'>PRE-MATCH:</p>
                                <p className='postmatch-text'>POST-MATCH:</p>
                            </div>
                            <div className='wellbeing-input-container'>
                                <input type='number' value={currentPreMatchWellbeing} onChange={(event) => setCurrentPreMatchWellbeing(event.target.value)} className='prematch-input' required></input>
                                <input type='number' value={currentPostMatchWellbeing} onChange={(event) => setCurrentPostMatchWellbeing(event.target.value)} className='postmatch-input' required></input>
                            </div>
                            <div className='wellbeing-button-container'>
                                <button className='prematch-button' onClick={handlePrematch_Wellbeing} name='prematch-input'>SUBMIT</button>
                                <button className='postmatch-button' onClick={handlePostmatch_Wellbeing} name='postmatch-input'>SUBMIT</button>
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={handleToCloseWellbeing}
                            color="primary"
                            autoFocus>
                            CLOSE
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={openFitness} onClose={handleToCloseFitness}>
                    <DialogTitle>{"Fitness Centre"}</DialogTitle>
                    <DialogContent>
                        <div className='wellbeing-tips-container'>
                            <div>
                                <span>Fitness Tips & Info</span>
                                <div className='tips-container'>
                                    <span>"{fitnessTips[currentTip]}"</span>
                                </div>
                            </div>
                            <button onClick={nextTip}>Next Tip</button>
                            <br />
                        </div>

                        <div className='fitness-rating-container'>

                            <div className='fitness-rating-item'>
                                <span>Pre-Match Fitness Avg:</span>
                                <div id='prematch-fitness'>
                                    {averagePreMatchFitness}
                                </div>
                            </div>

                            <div className='fitness-rating-item'>
                                <span>Post-Match Fitness Avg</span>
                                <div id='postmatch-fitness'>
                                    {averagePostMatchFitness}
                                </div>
                            </div>

                            <p>Enter your rating (0-10) in the box below and hit submit to add it to the average when you are ready!</p>
                            <div className='fitness-input-text-container'>
                                <p className='prematch-text'>PRE-MATCH:</p>
                                <p className='postmatch-text'>POST-MATCH:</p>
                            </div>
                            <div className='fitness-input-container'>
                                <input type='text'  value={currentPreMatchFitness} onChange={(event) => setCurrentPreMatchFitness(event.target.value)} className='prematch-input' required></input>
                                <input type='text'  value={currentPostMatchFitness} onChange={(event) => setCurrentPostMatchFitness(event.target.value)} className='postmatch-input' required></input>
                            </div>
                            <div className='fitness-button-container'>
                                <button className='prematch-button' onClick={handlePrematch_Fitness} name='prematch-input'>SUBMIT</button>
                                <button className='postmatch-button' onClick={handlePostmatch_Fitness} name='postmatch-input'>SUBMIT</button>
                            </div>

                        </div>

                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={handleToCloseFitness}
                            color="primary"
                            autoFocus>
                            CLOSE
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={openMatchHistory} onClose={handleToCloseMatchHistory}>
                    <DialogTitle>{"Match History"}</DialogTitle>
                    <DialogContent>
                        <div className='match-history-container'>
                            <button onClick={handleClickToOpenStats}>INPUT STATS</button>
                            <MatchHistory />
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={handleToCloseMatchHistory}
                            color="primary"
                            autoFocus
                        >
                            CLOSE
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={openStats} onClose={handleToCloseStats} >
                    <DialogTitle>{"INPUT STATS"}</DialogTitle>
                    <DialogContent>
                        <div>
                            <form className="input-stats-form">
                                <input
                                    type="text"
                                    placeholder="Enter Date"
                                    defaultValue={stats_Date}
                                    onChange={handleStats_Date}
                                />
                                <input
                                    type="text"
                                    placeholder="Enter Time"
                                    defaultValue={stats_Time}
                                    onChange={handleStats_Time}
                                />
                                <input
                                    type="text"
                                    placeholder="Enter Venue"
                                    defaultValue={stats_Venue}
                                    onChange={handleStats_Venue}
                                />
                                <input
                                    type="text"
                                    placeholder="Enter Goals"
                                    defaultValue={stats_Goals}
                                    onChange={handleStats_Goals}
                                />
                                <input
                                    type="text"
                                    placeholder="Enter Assists"
                                    defaultValue={stats_Assists}
                                    onChange={handleStats_Assists}
                                />
                                <input
                                    type="text"
                                    placeholder="Enter Wellbeing Score (0-10)"
                                    defaultValue={stats_Wellbeing}
                                    onChange={handleStats_Wellbeing}
                                />
                                <input
                                    type="text"
                                    placeholder="Enter Fitness Score (0-10)"
                                    defaultValue={stats_Fitness}
                                    onChange={handleStats_Fitness}
                                />
                                <br />
                                <button onClick={handleInputStats}>POST</button>
                            </form>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={handleToCloseStats}
                            color="primary"
                            autoFocus>
                            CLOSE
                        </Button>
                    </DialogActions>
                </Dialog>

                <br />
                <div className='grid-container'>
                    <div className='wellbeing-button'>
                        <button onClick={handleClickToOpenWellbeing}>WELLBEING</button>
                    </div>
                    <div className='fitness-button'>
                        <button onClick={handleClickToOpenFitness}>FITNESS</button>
                    </div>
                    <div className='match-history-button'>
                        <button onClick={handleClickToOpenMatchHistory}>MATCH HISTORY</button>
                    </div>
                </div>
            </div>
            }
            {!authenticated && <div>
                <h2>You are not signed in.</h2>
                <LoginPage
                    authenticated={authenticated}
                    setAuthenticated={setAuthenticated}
                    handleAuthenticated={handleAuthenticated}
                />
            </div>
            }
        </div>
    )

}

export default ProfilePage;