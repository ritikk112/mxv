import React from 'react';
import logo from './logo.png';
import Button from '@mui/joy/Button';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <>
            <div className="header">
                <div className="header-left">
                  <img style={{
                        width: '65px',
                        height: '50px',
                        objectFit: 'contain',
                        cursor: 'pointer'
                  }} src={logo} alt="mxv" />
                  May The Flix Be With You
                </div>
                <div className="header-right">
                    <Button variant="contained" color="primary"
                        onClick={() => window.location.href = "/search"}
                    >Search</Button>
                </div>
            </div>
        </>
    );
};

export default Header;

