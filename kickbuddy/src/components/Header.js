import '../css/Header.css';
import footballLogo from '../img/football.png';

function Header() {

    return(
        <div className="header">
            <img className="football-logo" src={footballLogo} alt="football logo" />
            <h1 className="title">KickBuddy</h1>
            <img className="football-logo" src={footballLogo} alt="football logo" />
        </div>
    );

}

export default Header;