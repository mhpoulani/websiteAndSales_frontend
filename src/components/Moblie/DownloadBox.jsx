import {useEffect, useState} from 'react';
import { Box, Typography, Button, createTheme } from '@mui/material';
import background from '../../assets/Mobile-BG1.png';
import { ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import ContactDialog from './ContactDialog';
import axios from "axios";


const theme = createTheme({
    typography: {
        h6: {
            fontFamily: 'Lato',
            fontSize: '16px', 
            fontWeight: 400,
            color: "#EEEEEE",
            letterSpacing: '0.4px',
            lineHeight: '24px',
        },
        h3: {
            fontFamily: 'Lato',
            fontWeight: 600,
            fontSize: '24px', 
            color: "#FFFFFF",
            letterSpacing: '0.4px',
            lineHeight: '24px'
        },
        button: {
            fontFamily: 'Lato',
            fontSize: '14px',
            fontWeight: 600,
            lineHeight: '14px', 
            color: "#FCFCFC",
        },
    },
});


const Home = () => {
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleOpenDialog = () => {
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const [latestLink, setLatestLink] = useState('');

    useEffect(() => {
        const fetchLink = async () => {
            try {
                const response = await axios.get('https://vitruvianshield.com/api/v1/applications');
                const data = response.data;

                // پیدا کردن لینک با جدیدترین release_date
                const latestRelease = data
                    .sort((a, b) => new Date(b.release_date) - new Date(a.release_date))[0];

                // قرار دادن لینک جدیدترین نسخه
                setLatestLink(latestRelease.apk_file);
            } catch (error) {
                console.error('Error getting new link:', error);
            }
        };

        fetchLink();
    }, []);

    return (
        <ThemeProvider theme={theme}>
            {/* Parent Box that contains everything */}
                <Box
                    sx={{
                        position: 'relative',
                        maxHeight: '746px',
                        minHeight: { xs: '500px', sm: '600px', md: '700px', lg: '746px' },
                        width: '100%',
                        backgroundImage: `url(${background})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                >
                <Box
                    sx={{
                        position: 'absolute',
                        zIndex: 1,
                        ml: '11%',
                        mt: '16%',
                        maxWidth:'40%',
                    }}
                >
                    <Typography
                        sx={{
                            mb: '0.4vw',
                            ml: '-0.2vw',
                            lineHeight: '1.5',
                            ...theme.typography.h3,
                        }}
                    >
                        The Mobile Application
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            ...theme.typography.h6,
                        }}
                    >
                        Introducing an innovative mobile app that empowers health management! With the Vitruvian Watch, users can track their health data, manage medication schedules, log seizures, and schedule online appointments with healthcare professionals anytime, anywhere.
                    </Typography>

                    <Box sx={{ display: 'flex', gap: '0.78vw', marginTop: '1.56vw',}}>
                        <Button
                            variant="outlined"
                            sx={{
                                padding:0,
                                minWidth:0,
                                display: 'flex',
                                borderRadius: '4px',
                                width: '138px',
                                height: '42px',
                                ...theme.typography.button,
                                borderColor: 'white',
                                color: 'white',
                                textTransform: 'none',
                                '&:hover': {},
                            }}
                            onClick={handleOpenDialog}
                            disableRipple
                        >
                            Contact us
                        </Button>

                        <Button
                            variant="contained"
                            onClick={() => {
                                if (latestLink) {
                                    const newTab = window.open(latestLink, "_blank");
                                    setTimeout(() => {
                                        if (newTab) newTab.close();
                                    }, 2000);
                                } else {
                                    alert("No download link available.");
                                }
                            }}
                            sx={{
                                padding: 0,
                                minWidth: 0,
                                display: 'flex',
                                borderRadius: '4px',
                                width: '138px',
                                height: '42px',
                                backgroundColor: '#B50304',
                                textTransform: 'none',
                                '&:hover': {
                                    backgroundColor: '#B50304',
                                },
                            }}
                            disableRipple
                        >
                            Download
                        </Button>


                        <ContactDialog open={dialogOpen} onClose={handleCloseDialog} />
                    </Box>
                </Box>

                </Box>
        </ThemeProvider>
    );
};

export default Home;
