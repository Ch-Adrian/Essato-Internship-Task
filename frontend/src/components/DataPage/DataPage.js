import React, { useState } from 'react';
import Topbar from '../Topbar/Topbar';
import './DataPage.css';
import bgImageLeft from '../../assets/left-image.jpg';
import bgImageright from '../../assets/right-image.jpg';
import { useLocations } from '../../context/LocationContext';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';

function DataPage(){
    const [resetState, setResetState] = useState(false);
    const { locations, addLocation, handleSort, deleteLocation } = useLocations();
    const [locationFound, setLocationFound ] = useState(true);
    const [currentLocation, setCurrentLocation] = useState('');

    const findLocation = (location) => {
        console.log(location)
        setCurrentLocation(location);
        setLocationFound(false);
        locations.forEach(element => {
            if(element.name === location){
                setLocationFound(true);
            }
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        findLocation(currentLocation);
    }

    return (<div>
        <Topbar/>
        <div className="main-container">
        <div className="left-image" style={{backgroundImage: `url(${bgImageLeft})`,}}>
            <div className='credits-image'>Photo by <a href="https://unsplash.com/@marvelousraphael?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Marvelous Raphael</a> on <a href="https://unsplash.com/photos/a-tall-building-with-a-statue-in-front-of-it-00ZDgfDBwfY?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a></div>
        </div>
        
            <div className='mid-box'>
                <div className="locations-box2">
                    <h1>Search</h1>
                    <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicLocation">
                        <Form.Label>Enter location:</Form.Label>
                        <Form.Control type="location" placeholder="Location" onChange={(e) => findLocation(e.target.value)}/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Search
                    </Button>
                    </Form>
                    <div>
                        {locationFound? null: <div className='text-error'>Location missing!</div>}
                    </div>
                </div>
                <div className="locations-box2">
                    <div>
                        <div>Get current temperature for selected location:</div>
                            <Button variant="success">Get</Button>
                    </div>
                </div>
                <div className="locations-box2">
                    <div>
                        <div>Show history of temperatures for selected location:</div>
                            <Button variant="success">Show</Button>
                    </div>
                </div>
            </div>
        <div className="right-image" style={{backgroundImage: `url(${bgImageright})`,}}>
        <div className='credits-image'>Photo by <a href="https://unsplash.com/@sujeethpotla?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Sujeeth Potla</a> on <a href="https://unsplash.com/photos/green-boat-on-focus-photography-gGFymzEv9oA?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a></div>
        </div>
      
        </div>
    </div>
);
}

export default DataPage;