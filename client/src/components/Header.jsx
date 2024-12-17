import React from 'react';
import logo from './logo.png';
import Button from '@mui/joy/Button';
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div style={styles.header}>
            {/* Left Section - Logo and Title */}
            <div style={styles.headerLeft}>
                <a href="/" style={styles.logoLink}>
                    <img
                        src={logo}
                        alt="mxv"
                        style={styles.logo}
                    />
                </a>
                <span style={styles.title}>May The Flix Be With You</span>
            </div>

            {/* Right Section - Navigation Buttons */}
            <div style={styles.headerRight}>
                <Link to="/" style={styles.link}>
                    <Button variant="contained" color="primary">Home</Button>
                </Link>
                <Link to="/search" style={styles.link}>
                    <Button variant="contained" color="primary">Search</Button>
                </Link>
                <Link to="/discover" style={styles.link}>
                    <Button variant="contained" color="primary">Discover</Button>
                </Link>
                <Link to="/auth" style={styles.link}>
                    <Button variant="contained" color="primary">Login/Signup</Button>
                </Link>
            </div>
        </div>
    );
};

const styles = {
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgb(169 187 185)', // White background
        boxShadow: 'rgb(125 153 165 / 46%) 0px 100px 50px', // Subtle shadow
        padding: '10px 20px',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        marginBottom: '20px',
        borderRadius: '30px',
    },
    headerLeft: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    logo: {
        width: '65px',
        height: '50px',
        objectFit: 'contain',
        cursor: 'pointer',
    },
    title: {
        fontSize: '0.8rem',
        fontWeight: 'bold',
        color: '#333', // Dark grey text
    },
    headerRight: {
        display: 'flex',
        gap: '10px',
    },
    link: {
        textDecoration: 'none',
    },
    logoLink: {
        display: 'flex',
        alignItems: 'center',
    },
};

export default Header;
