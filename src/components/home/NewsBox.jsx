import React, { useEffect, useState } from "react";
import { Box, Typography, createTheme, ThemeProvider, Button, useMediaQuery } from "@mui/material";
import moreicn from "../../assets/next.png";
import blueArrowIcon from "../../assets/blueArrowIcon.svg";
import BG from '../../assets/newsBoxBG.svg'
import noto_pushpin from '../../assets/noto_pushpin.svg'
import { Link, useNavigate } from "react-router-dom";

const navItemStyle = {
    fontFamily: 'Lato',
    fontSize: { xs: '14.22px', lg: '16px' },
    color: '#eee',
    fontStyle: 'normal',
    lineHeight: '100%',
    textTransform: 'none',
    fontWeight: 400
}
const theme = createTheme({
    typography: {
        h6: {
            fontFamily: 'sen',
            fontSize: '0.8333vw',
            color: "#F1F1F1",
            letterSpacing: '0.4px',
            lineHeight: 'normal',
        },
        h3: {
            fontFamily: 'Lato',
            fontWeight: 700,
            fontSize: '1.09375vw',
            color: "#FFFFFF",
            letterSpacing: '0.4px',
        },
        button: {
            fontFamily: 'Lato',
            fontSize: '0.677vw',
            textTransform: 'none',
            color: "#FFFFFF",
        },
        h1: {
            fontFamily: 'Lato',
            fontWeight: 700,
            fontSize: '1.458vw',
            color: "#FFFFFF",
            letterSpacing: '0.4px',
        },
    },
});


const NewsCard = ({ picture, title, details, slug, onClick }) => {
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    return (
        <Box
            sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                height: '360px',
                width: '284px',
                boxSizing: 'border-box',
                p: '24px',
                borderRadius: "16px",
                backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.01) 40.5%, rgba(0, 0, 0, 0.8) 71%, rgba(0, 0, 0, 0.9) 100%), url(${picture})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                justifyContent: 'end',
                boxShadow: '0px 2px 16px 0px rgba(0, 0, 0, 0.32)',
                textAlign: 'start',
                cursor: isMobile ? 'pointer' : 'default', // Pointer cursor only on mobile,
            }}
            onClick={isMobile ? onClick : undefined} // Only enable onClick for mobile
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '-5px',
                    right: '-5px',
                }}
            >
                <img src={noto_pushpin} alt="" />
            </Box>
            <Box
                sx={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: 'flex-end',
                    overflow: 'hidden',
                }} />
            <Box
                sx={{
                    position: "relative",
                }}>
                <Typography
                    sx={{
                        width: '100%',
                        ...navItemStyle,
                        fontSize: { xs: '12.64', md: '14.22px', lg: '16px' },
                        fontWeight: 600,
                        lineHeight: 'normal'
                    }}>
                    {title}
                </Typography>
                <Typography
                    sx={{
                        width: '100%',
                        ...navItemStyle,
                        fontSize: { xs: '10px', md: '12px' },
                        mt:'8px',
                        lineHeight:'130%'
                    }}>
                    {details.length > 50 ? `${details.substring(0, 80)}...` : details}
                </Typography>
            </Box>

            <Box
            sx={{
                mt:'35px'
            }}
            >
                <Button
                    onClick={(e) => {
                        e.stopPropagation();
                        onClick();
                    }}
                    sx={{
                        textTransform: "none",
                        display: "flex",
                        alignItems: "center",
                        gap: '4px',
                        "&:hover": { backgroundColor: "transparent" },
                        ...navItemStyle,
                        lineHeight: '0',
                        fontWeight: 600,
                        color:'#B0EEE9',
                        fontSize: { xs: '12.64px', md: '14.22px', lg: '16px' }
                    }}
                    disableRipple
                >
                    View More
                    <img src={blueArrowIcon} alt="" style={{ width: '16px', height: '16px', color:'#B0EEE9' }} />
                </Button>
            </Box>
        </Box>
    );
};

const NewsBox = () => {
    const [newsItems, setNewsItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch(`https://vitruvianshield.com/api/v1/home-news`);
                if (!response.ok) throw new Error("Network response was not ok");
                const data = await response.json();
                setNewsItems(data);
            } catch (error) {
                console.error("Error fetching news:", error);
            }
        };
        fetchNews();
    }, []);

    const handleClick = (slug) => navigate(`/news/${slug}`);

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    height: '100%',
                    justifyItems: "center",
                    backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.01) 40.5%, rgba(0, 0, 0, 0.8) 71%, rgba(0, 0, 0, 0.9) 100%), url(${BG})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    px: { xs: '40px', sm: '70px', md: '60px', lg: '80px', xl: '100px' },
                    pb: { xs: '30px', sm: '40px', md: '80px', lg: '70px' },
                    pt: { xs: '30px', sm: '40px', md: '70px' }
                }}>
                <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", mb: { xs: 1, sm: 1, md: 2, lg: 3, xl: 4 }, px: "3%" }}>
                    <Typography
                        sx={{
                            "&:hover": { backgroundColor: "transparent" },
                            ...navItemStyle,
                            lineHeight: '0',
                            fontWeight: 600,
                            fontSize: { xs: '14.22px', md: '18px', lg: '20px' }
                        }}>
                        News
                    </Typography>

                    <Button
                        component={Link}
                        to="/news"
                        sx={{
                            textTransform: "none",
                            display: "flex",
                            alignItems: "center",
                            gap: '4px',
                            "&:hover": { backgroundColor: "transparent" },
                            ...navItemStyle,
                            lineHeight: '0',
                            fontWeight: 600,
                            fontSize: { xs: '12.64px', md: '14.22px', lg: '16px' }
                        }}
                    >

                        View All

                        <img src={moreicn} alt="" style={{ width: '16px', height: '16px' }} />
                    </Button>
                </Box>

                <Box
                    sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        flexWrap: 'wrap',
                        gap: '20px'

                    }}>
                    {newsItems.map((box, index) => (
                        <NewsCard
                            key={index}
                            picture={box.picture}
                            title={box.title}
                            details={box.details}
                            slug={box.slug}
                            onClick={() => handleClick(box.slug)}
                        />
                    ))}
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default NewsBox;
