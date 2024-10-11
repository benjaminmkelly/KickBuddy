import "./css/Reset.css";
import "./css/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Header from './components/Header.js';
import Body from './components/Body.js';
import Menu from "./components/Menu.js";

function App() {

  const [showPlayPage, setShowPlayPage] = useState(true);
  const [showProfilePage, setShowProfilePage] = useState(false);
  const [showSettingsPage, setShowSettingsPage] = useState(false);
  const [authenticated, setAuthenticated] = useState();

  const handlePageChange = (value) => {
    if(value === 'play') {
      setShowPlayPage(true);
      setShowProfilePage(false);
      setShowSettingsPage(false);
      return(showPlayPage);
    } else if (value === 'profile') {
      setShowProfilePage(true);
      setShowSettingsPage(false);
      setShowPlayPage(false);
      return(showProfilePage);
    } else if (value === 'settings') {
      setShowSettingsPage(true);
      setShowProfilePage(false);
      setShowPlayPage(false);
      return(showSettingsPage);
    }
  }

  return (
    <div className="App" id="App">
      <Header />
      <Body 
        showPlayPage={showPlayPage}
        showProfilePage={showProfilePage}
        showSettingsPage={showSettingsPage}
        handlePageChange={handlePageChange}
        authenticated={authenticated}
        setAuthenticated={setAuthenticated}
      />
      <Menu
        handlePageChange={handlePageChange}
      />
    </div>
  );
}

export default App;
