import PlayPage from './pages/PlayPage.js';
import ProfilePage from './pages/ProfilePage.js';
import SettingsPage from './pages/SettingsPage.js';

function Body( {showPlayPage, showProfilePage, showSettingsPage, authenticated, setAuthenticated } ) {

    return(
        <div>
            <div>
                {showPlayPage && <PlayPage />}
            </div>
            <div>
                {showProfilePage && <ProfilePage
                    authenticated={authenticated}
                    setAuthenticated={setAuthenticated}
                />}
            </div>
            <div>
                {showSettingsPage && <SettingsPage />}
            </div>
        </div>
    );
    
}

export default Body;