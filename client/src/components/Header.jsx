import React from 'react';
import logo from './logo.png';
import Button from '@mui/joy/Button';

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
                    <Button variant="contained" color="primary"
                        onClick={() => window.location.href = "/"}
                    >Home</Button>
                    <Button className='' variant="contained" color="primary"
                        onClick={() => window.location.href = "/search"}
                    >Search</Button>
                    <Button variant="contained" color="primary"
                        onClick={() => window.location.href = "/discover"}
                    >Discover</Button>
                    <Button variant="contained" color="primary"
                        onClick={() => window.location.href = "/auth"}
                    >Login/Signup</Button>
                </div>
            </div>
        </>
    );
};

export default Header;

