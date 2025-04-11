import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const LocationContext = createContext();

export const useLocations = () => useContext(LocationContext); // custom hook for easier use

export const LocationProvider = ({ children }) => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get('http://localhost:8080/locations');
        let loc2 = []
        response.data.forEach((location) => {
            loc2.push({name: location.name, isEU: location.eu})
        })
        setLocations(loc2);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, []);

  const addLocation = async (location) => {
    let present = false;
    locations.forEach((elem) => {
        if(elem.name === location.name){
            present = true;
            return;
        }
    })
    if(present) return;
    console.log('added')
    const response = await axios.post(`http://localhost:8080/locations`, {
        name: location.name,
        isEU: location.isEU,
        dateOfCreation: new Date().toJSON().slice(0, 10)
      });

    setLocations((prev) => [...prev, location]);

  };

  const handleSort = (isAsc) => {
    locations.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
    if(!isAsc){
        locations.reverse();
    }
}

const deleteLocation = (index) => {
    console.log(locations[index])
    const response = axios.delete(`http://localhost:8080/locations/${locations[index].name}`);

    locations.splice(index, 1);
    setLocations(locations);
}

  const value = {
    locations,
    addLocation,
    handleSort,
    deleteLocation
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};