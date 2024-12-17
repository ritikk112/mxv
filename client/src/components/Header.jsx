import React from 'react';
import logo from './logo.png';
import Button from '@mui/joy/Button';
import { Link } from "react-router-dom";


const Header = () => {
    return (
        <>
            <div className="header">
                <div className="header-left">
                    <a href='/'>
                    <img style={{
                        width: '65px',
                        height: '50px',
                        objectFit: 'contain',
                        cursor: 'pointer'
                        }} src={logo} alt="mxv" />
                    </a>
                  May The Flix Be With You
                </div>
                <div className="header-right">
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <Button variant="contained" color="primary">Home</Button>
                </Link>
                <Link to="/search" style={{ textDecoration: 'none' }}>
                    <Button variant="contained" color="primary">Search</Button>
                </Link>
                <Link to="/discover" style={{ textDecoration: 'none' }}>
                    <Button variant="contained" color="primary">Discover</Button>
                </Link>
                <Link to="/auth" style={{ textDecoration: 'none' }}>
                    <Button variant="contained" color="primary">Login/Signup</Button>
                </Link>
                </div>
            </div>
        </>
    );
};

export default Header;

