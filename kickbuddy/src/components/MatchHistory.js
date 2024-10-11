import { React, useState } from 'react';
import '../css/MatchHistory.css';

/**
 * Match History Component
 * 
 * @author Ben Kelly w19014367
 */

export default function MatchHistory() {

    return(
        <div className='container'>
            <div className='matchHistory-contents'>
                <p><strong>Date: </strong>13/01/23</p>
                <p><strong>Time: </strong>18:00</p>
                <p><strong>Venue: </strong>The Bowl</p>
                <p><strong>Goals: </strong>2</p>
                <p><strong>Assists: </strong>0</p>
                <p><strong>Wellbeing: </strong>7</p>
                <p><strong>Fitness: </strong>6</p>
            </div>
            <div className='matchHistory-contents'>
                <p><strong>Date: </strong>20/01/23</p>
                <p><strong>Time: </strong>19:00</p>
                <p><strong>Venue: </strong>Powerleague Gateshead</p>
                <p><strong>Goals: </strong>3</p>
                <p><strong>Assists: </strong>1</p>
                <p><strong>Wellbeing: </strong>8</p>
                <p><strong>Fitness: </strong>7</p>
            </div>

        </div>
    )

}