import React, { useState, useEffect } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Mediacard from './Mediacard';
import { Typography } from "@mui/material";
import Allinonecard from './Allinonecard';

const theme = createTheme({
    typography: {
        h6: {
            fontFamily:'sen',
            fontSize: '1.0417vw',
            lineHeight: 'normal',
            letterSpacing: '0.4px',
            color: "#F1F1F1",
            textTransform: 'none',
        },

        h3: {
            fontFamily: "Lato",
            fontWeight:700,
            fontSize:'1.4583vw',
            color: "#F1F1F1",
            textTransform: 'none',
        },
        button: {
            fontFamily: 'Inter',
            fontSize: '1.0417vw',
            textTransform: 'none',
            color: "#F1F1F1",
        },
    },
});

const fetchNewsData = async () => {
    try {
        const topNewsResponse = await fetch('https://site.vitruvianshield.com/api/v1/top-news');
        const topNewsData = await topNewsResponse.json();

        const latestNewsResponse = await fetch('https://site.vitruvianshield.com/api/v1/news');
        const latestNewsData = await latestNewsResponse.json();

        const eventsNewsResponse = await fetch('https://site.vitruvianshield.com/api/v1/event-news');
        const eventsNewsData = await eventsNewsResponse.json();

        return [
            { team_name: "Top News", members: topNewsData.results },
            { team_name: "Latest News", members: latestNewsData.results },
            { team_name: "Events News", members: eventsNewsData.results },
        ];
    } catch (error) {
        console.error("Error fetching news data: ", error);
        return [];
    }
};

const TeamMembers = () => {
    const [selectedTeam, setSelectedTeam] = useState('view_all');
    const [teamsData, setTeamsData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchNewsData();
            setTeamsData(data);
        };

        fetchData();
    }, []);

    const handleToggle = (event, newSelection) => {
        if (newSelection !== null) {
            setSelectedTeam(newSelection);
        }
    };

    const renderContent = () => {
        if (selectedTeam === 'view_all') {
            return (
                <Box
                    sx={{
                        
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: { xs: 2, sm: 4, md: 6, lg: 8, xl: 10 },
                        mt: { xs: 2, sm: 4, md: 6, lg: 8, xl: 10 },
                    }}
                >
                    {teamsData.map(({ team_name, members }) => (
                        <Box key={team_name} sx={{ width: '80%' }}>
                            <Typography
                                gutterBottom
                                sx={{ ...theme.typography.h3, mb: 3, textAlign: 'left',ml:'0.8vw' }}
                            >
                                {team_name}
                            </Typography>
                            <Mediacard data={members} />
                        </Box>
                    ))}
                </Box>

            );
        } else {
            const selectedTeamData = teamsData.find(team => team.team_name === selectedTeam)?.members || [];
            return (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: { xs: 2, sm: 4, md: 6, lg: 8, xl: 10 },}}>
                    <Box sx={{ width: '100%',}}>
                        <Allinonecard data={selectedTeamData} />
                    </Box>
                </Box>
            );
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ textAlign: 'left',mb:15,}}>
                <Box sx={{ mt: '40px', textAlign: 'center' }}>
                    <Typography sx={{ ...theme.typography.h3 }}>
                        NEWS
                    </Typography>
                    <Typography sx={{ ...theme.typography.h6,mt: { xs: 1, sm: 1, md: 2, lg: 3, xl: 4 },}}>
                        Meet our diverse team of world-class creators, designers, and problem solvers.
                    </Typography>
                </Box>
                <Box
                    sx={{
                        
                        display: 'flex',
                        justifyContent: 'center',
                        mt: { xs: 2, sm: 4, md: 6, lg: 8, xl: 10 },
                        maxHeight: '40px',

                    }}
                >
                    <ToggleButtonGroup
                        value={selectedTeam}
                        exclusive
                        onChange={handleToggle}
                        aria-label="Team selection"
                        sx={{
                            display: 'flex',
                            gap: { xs: 0.8, sm: 1, md: 2, lg: 3, xl: 4 },
                            justifyContent: 'center',
                            width: '100%',
                        }}
                    >
                        <ToggleButton
                            value="view_all"
                            selected={selectedTeam === "view_all"}
                            sx={{
                                padding: 0,
                                minWidth: 0,
                                color: '#ffffff',
                                width: '9.375vw',
                                height: '2.3958vw',
                                ...theme.typography.button,
                                '&.Mui-selected': {
                                    borderRadius: '0.3125vw',
                                    backgroundColor: '#B50304',
                                    color: '#ffffff',
                                    '&:hover': {
                                        backgroundColor: '#B50304',
                                    },
                                },
                                '&:not(.Mui-selected)': {
                                    backgroundColor: '#0B0B0B',
                                    borderRadius: '0.3125vw',
                                    border:'0.01px solid rgba(255, 255, 255, 0.2)',
                                    '&:hover': {
                                        backgroundColor: '#0B0B0B',
                                    },
                                },
                            }}
                            disableRipple
                        >
                            View All
                        </ToggleButton>


                        {teamsData.map(({ team_name }) => (
                            <ToggleButton
                                key={team_name}
                                value={team_name}
                                selected={selectedTeam === team_name}
                                sx={{
                                    padding: 0,
                                    minWidth: 0,
                                    color: '#e0e0e0',
                                    width: '9.375vw',
                                    height: '2.3958vw',
                                    ...theme.typography.button,
                                    '&.Mui-selected': {
                                        borderRadius: '0.3125vw',
                                        backgroundColor: '#B50304',
                                        color: '#ffffff',
                                        '&:hover': {
                                            backgroundColor: '#B50304',
                                        },
                                    },
                                    '&:not(.Mui-selected)': {
                                        backgroundColor: '#0B0B0B',
                                        borderRadius: '0.3125vw',
                                        border:'0.01px solid rgba(255, 255, 255, 0.2)',
                                        '&:hover': {
                                            backgroundColor: '#0B0B0B',
                                        },
                                    },
                                }}
                                disableRipple
                            >
                                {team_name}
                            </ToggleButton>
                        ))}
                    </ToggleButtonGroup>
                </Box>

                <Box width={'100%'}>
                    {renderContent()}
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default TeamMembers;
