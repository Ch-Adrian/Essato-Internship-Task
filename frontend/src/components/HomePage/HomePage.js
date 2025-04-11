import React from 'react';
import Topbar from '../Topbar/Topbar';
import './HomePage.css';
import bgImage from '../../assets/background-home.jpg';

function HomePage(){

    return (<div>
        <Topbar/>
        <div className="hero" style={{backgroundImage: `url(${bgImage})`,}}>
        <div className="menu-box">
            <h1>Welcome</h1>
            <button className="menu-btn">Locations</button>
            <button className="menu-btn">Data</button>
            <button className="menu-btn">Contact</button>
        </div>
        </div>
        <div className='credits'>
        Photo by <a href="https://unsplash.com/@robertlukeman?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Robert Lukeman</a> on <a href="https://unsplash.com/photos/green-grass-field-during-sunset-_RBcxo9AU-U?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
        </div>
    </div>);
}

export default HomePage;