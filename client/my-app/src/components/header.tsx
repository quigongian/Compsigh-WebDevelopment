import React from "react"
import { Link } from 'react-router-dom';
import compSighLogo from '../image_content/compsighLogo_white.png'


const container ={
    height: '100%',
    backgroundColor: '#3D405B',
    borderColor: 'red 2px'
    
}


const wrapper ={
    padding: '7px 15px',
    display: 'flex',
    alignItems: 'center',
    
    
}

//Div for the left side of the navbar
const Left={
    height: '30px',
    flex:'0.5',
    display: 'flex',
    alignItems: 'center',
    // backgroundColor: 'blue'
}

//Div for the center of the navbar
const Center={
    height: '25px',
    flex:'1.5',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'transparent'
}

//Div for the right side of the navbar
const Right={   
    borderRadius: '12px',
    height: '35px',
    // flex:'0.95',
    display: 'flex',
    backgroundColor: '#2C2E41',
    alignItems: 'center',
    justifyContent: 'Right',
    
}

//Setting and About were separated into two because setting needed a 'marginLeft'

const wordAbout={
    color: 'white',
    marginRight: '75px',
    fontWeight: '600',
    fontSize: '15px',
    cursor: 'pointer',
}


const wordSetting={
    color: 'white',
    marginRight: '75px',
    fontWeight: '600',
    fontSize: '15px',
    cursor: 'pointer',
    marginLeft: '25px'
}

const logoImage={
    height: '100px',
}

//Login Box
const box1={
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: '650',
    borderRadius: '12px',
    height: '100%',
    width: '80px',
    backgroundColor: '#81B29A',
    fontSize: '15px',
    border: 'none',
    cursor: 'pointer',
}




export const Header = () => {
    return (
        <>
        <div style={container}>

        <div style={wrapper}>

        <div style={Left}>
            <Link to = "/"><img style={logoImage} src={compSighLogo}/></Link>
        </div>

        <div style={Center}></div>

        <div style={Right}>
        
            <p style={wordSetting}><Link to = "/setting" style={{ textDecoration: 'none', color: 'white' }}>Settings</Link ></p>
            <p style={wordAbout}><Link to = "/about" style={{ textDecoration: 'none', color: 'white' }}>About</Link ></p>
            <p style={{marginRight:'20px',color: 'white', fontWeight: '600', fontSize: '15px',cursor:'pointer'}}><Link to = "/" style={{ textDecoration: 'none', color: 'white' }}>Home</Link ></p>
            
            <button style={box1}>
                <Link to = "/login" style={{ textDecoration: 'none', color: 'white' }}>Log In</Link >
            </button>
           
        </div>
        </div>

        </div>
        </>
    );
}