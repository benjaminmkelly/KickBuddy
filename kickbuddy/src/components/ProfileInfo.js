import '../css/ProfilePage.css';

export default function ProfileInfo({ contents }) {
    
    return (
        <div className="profile-stats">
            <p><strong>PlayerID: </strong>{contents.playerID}</p>
            <p><strong>Name: </strong>{contents.name}</p>
            <p><strong>Games: </strong>{contents.gamesPlayed}</p>
            <p><strong>Wins: </strong>{contents.wins}</p>
            <p><strong>Draws: </strong>{contents.draws}</p>
            <p><strong>Losses: </strong>{contents.losses}</p>
            <p><strong>Goals: </strong>{contents.goals}</p>
            <p><strong>Assists: </strong>{contents.assists}</p>
            <p><strong>Avg Rating: </strong>{contents.avgRating}</p>
        </div>
    )
}