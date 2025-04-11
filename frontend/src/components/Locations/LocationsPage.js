import React, { useState } from 'react';
import Topbar from '../Topbar/Topbar';
import './LocationsPage.css';
import bgImageLeft from '../../assets/left-image.jpg';
import bgImageright from '../../assets/right-image.jpg';
import Pagination from 'react-bootstrap/Pagination';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import { useLocations } from '../../context/LocationContext';

function LocationsPage(){
    const [activePage, setActivePage] = useState(1);
    const pageSize = 9;
    const [location, setLocation] = useState('');
    const [isInEU, setIsInEU] = useState(false);
    const [resetState, setResetState] = useState(false);
    const { locations, addLocation, handleSort, deleteLocation } = useLocations();
    let pages = [];
    let numOfPages = Math.ceil(locations.length/pageSize);
    
    const handleClick = (pageNumber) => {
        setActivePage(pageNumber);
    };

    const handleClickPrev = () => {
        if(activePage > 1){
            setActivePage(activePage-1);
        }
    };

    const handleClickNext = () => {
        if(activePage < numOfPages){
            setActivePage(activePage+1);
        }
    };

    for (let number = 1; number <= numOfPages; number++) {
      pages.push(
        <Pagination.Item key={number} active={number === activePage} onClick={() => handleClick(number)}>
          {number}
        </Pagination.Item>,
      );
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (location.trim() === '') return;

        addLocation({name: location, isEU: isInEU})
        setIsInEU(false);
      };

    return (<div>
        <Topbar/>
        <div className="main-container">
        <div className="left-image" style={{backgroundImage: `url(${bgImageLeft})`,}}>
            <div className='credits-image'>Photo by <a href="https://unsplash.com/@marvelousraphael?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Marvelous Raphael</a> on <a href="https://unsplash.com/photos/a-tall-building-with-a-statue-in-front-of-it-00ZDgfDBwfY?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a></div>
        </div>
        
            <div className='mid-box'>
                <div className="locations-box">
                    <div>
                    <h1>Locations</h1>
                    <Button variant="primary" className='sortBtn' onClick={(e) => {handleSort(true); setResetState(!resetState);}}>Sort Ascending</Button>
                    <Button variant="primary" className='sortBtn' onClick={(e) => {handleSort(false); setResetState(!resetState);}}>Sort Descending</Button>
                    </div>
                    <div>
                    <ListGroup>
                        {locations.slice(activePage*pageSize-pageSize, activePage*pageSize).map((item, index) => (
                            <ListGroup.Item
                                    as="li"
                                    className="d-flex justify-content-between align-items-start"
                                    key={index}
                                >
                                    <div className="ms-2 me-auto">
                                    <div className="fw-bold">{item.name}</div>
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
                    <div className='pagination-box'>
                        <Pagination>
                            <Pagination.Prev onClick={() => handleClickPrev()} />
                            {pages}
                            <Pagination.Next onClick={() => handleClickNext()} />
                        </Pagination>
                        
                    </div>
                </div>
                <div className="locations-add">
                    <h2>Add location</h2>
                    <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicLocation">
                        <Form.Label>Enter location:</Form.Label>
                        <Form.Control type="location" placeholder="Location" onChange={(e) => setLocation(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Is it in EU?" onChange={(e) => setIsInEU(e.target.checked)} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Add location
                    </Button>
                    </Form>
                </div>
            </div>
        <div className="right-image" style={{backgroundImage: `url(${bgImageright})`,}}>
        <div className='credits-image'>Photo by <a href="https://unsplash.com/@sujeethpotla?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Sujeeth Potla</a> on <a href="https://unsplash.com/photos/green-boat-on-focus-photography-gGFymzEv9oA?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a></div>
        </div>
      
        </div>
    </div>
);
}

export default LocationsPage;