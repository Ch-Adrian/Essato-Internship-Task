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
import axios from 'axios';


function DataPage(){
    const [resetState, setResetState] = useState(false);
    const { locations, temperatures, addLocation, handleSort, deleteLocation, addTemperature, getTemperatures } = useLocations();
    const [locationFound, setLocationFound ] = useState(true);
    const [currentLocation, setCurrentLocation] = useState('');
    const [currentTemperature, setCurrentTemperature] = useState(null);
    const [showTemperatures, setShowTemperatures ] = useState([]);

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

    const fetchTemperature = async () => {
        try {
          const response = await axios.get('http://api.weatherstack.com/current?access_key=012107e01b8c71dd5c9135604e56f02d&query='+currentLocation);
            // console.log(response.data)
            if(response.data.success === false) {
                throw Error;
            }
            let location = response.data.location;
            let temp = response.data.current.temperature;
            // console.log(location, temp)
            setCurrentTemperature(temp);
            addTemperature(currentLocation, temp);
        } catch (error) {
          console.error('Error fetching locations:', error);
        }
      };

    const handleGet = (e) => {
        e.preventDefault();
        fetchTemperature();
    }

    const handleShow = (e) => {
        e.preventDefault();
        // console.log(currentLocation)
        if((currentLocation == '')) return;
        getTemperatures(currentLocation)
        temperatures.forEach((elem) => {
            // console.log('handle', elem.name)
            if(elem.name == currentLocation){
                
                setShowTemperatures(elem.temperatures);
            }
        })
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
                            <Button variant="success" onClick={(e) => handleGet(e)}>Get</Button>
                        <div>Current temperature: {currentTemperature}</div>
                    </div>
                </div>
                <div className="locations-box2">
                    <div>
                        <div>Show history of temperatures for selected location:</div>
                            <Button variant="success" onClick={(e) => handleShow(e)}>Show</Button>
                        <div>
                        <ListGroup>
                        {showTemperatures.slice(-6, -1).map((item, index) => (
                            <ListGroup.Item
                                    as="li"
                                    className="d-flex justify-content-between align-items-start"
                                    key={index}
                                >
                                    <div className="ms-2 me-auto">
                                    <div className="fw">{item}</div>
                                    </div>
                                    <Button className="d-flex justify-content-center align-items-center delete-btn" onClick={() => {deleteLocation(index); setResetState(!resetState);}} >X</Button>
                                    {item.isEU ? 
                                    <Badge bg="primary" pill>
                                    EU
                                    </Badge> : null}
                                </ListGroup.Item>
                        ))}
                        </ListGroup>
                        </div>
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