import { findByLabelText } from "@testing-library/react";
import { relative } from "node:path/win32";
import React from "react"
import { Link } from 'react-router-dom';

export const Footer = () => {
    return (
        <div style = {footer}>
            <p><Link to = "/OurTeam" style={{ textDecoration: 'underline', color: 'white', position: 'absolute' as 'absolute',
                                     top: 'calc(50% - 25px/2 - 35px)', left: 'calc(50% - 42px)', fontWeight: '700', fontSize: '15px', 
                                     cursor: 'pointer', lineHeight: '24px'}}>Our Team</Link></p>
            
            <p style = {{color: 'white', fontWeight: '700', fontSize: '15px', lineHeight: '24px', position: 'absolute' as 'absolute',
                        left: 'calc(50% - 122px)', top: 'calc(65% - 25px/2 - 33px)', textDecoration: 'none'}}>Terms of Service · Privacy Policy</p>
            
            <p style = {{color: '#BCBAAC', fontWeight: '700', fontSize: '13px', lineHeight: '18px', position: 'absolute' as 'absolute',
                        left: 'calc(50% - 63px)', top: 'calc(80% - 25px/2 - 35px)', textDecoration: 'none'}}> &copy; 2022 CompSigh</p>
        </div>
    );
}

    const footer = {
       //position: 'absolute' as 'absolute',
        //bottom: '0%',
        position: 'relative' as 'relative',
        width: '100%',
        backgroundColor: '#3D405B',
        minHeight: '175px',
        display: 'flex',
        flexDirection: 'column' as 'column',
        textAlign: 'center' as 'center',
    }
