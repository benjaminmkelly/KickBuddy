import { React, useEffect, useState } from 'react';
import '../css/Match.css';

/**
 * Match component - Stores the structure for a match object
 * 
 * @author Ben Kelly w19014367
 */

export default function Match({ contents, handleClickToOpenJoinMatch }) {

    const [randomNumber, setRandomNumber] = useState(null);
    useEffect(() => {
        setRandomNumber( Math.floor( Math.random() * 5 ) );
    }, []);

    return(
        <div className="matchContents">
            <p><strong>{contents.matchName}</strong></p>
            <p><strong>Date: </strong>{contents.KODate}</p>
            <p><strong>Time: </strong>{contents.KOTime}</p>
            <p><strong>Venue: </strong>{contents.venue}</p>
            <p><strong>Match ID: </strong>{contents.matchID}</p>
            <p><strong>Players Needed: </strong>{randomNumber}</p>
            <button onClick={handleClickToOpenJoinMatch}>Join Match</button>
        </div>
    )
}