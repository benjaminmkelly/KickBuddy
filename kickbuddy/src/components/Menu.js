import React, { useState } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import SettingsIcon from '@mui/icons-material/Settings';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function FixedBottomNavigation({ handlePageChange }) {

    const [value, setValue] = useState('play');
    const ref = React.useRef(null);

    return (
        <Box sx={{ pb: 7 }} ref={ref}>
            <CssBaseline />
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation
                    sx={{ backgroundColor: "#AAAAAA", borderTop: "solid" }}
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                        handlePageChange(newValue);
                    }}
                >
                    <BottomNavigationAction label="PROFILE" value="profile" icon={<AccountCircleIcon />} />
                    <BottomNavigationAction sx={{ borderLeft: "solid", borderRight: "solid" }} label="PLAY" value="play" icon={<PlayCircleFilledIcon />} />
                    <BottomNavigationAction label="SETTINGS" value="settings" icon={<SettingsIcon />} />
                </BottomNavigation>
            </Paper>
        </Box>
    );
}