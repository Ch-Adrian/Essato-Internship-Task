import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const LocationContext = createContext();

export const useLocations = () => useContext(LocationContext); // custom hook for easier use

export const LocationProvider = ({ children }) => {
  const [locations, setLocations] = useState([{name: 'Warsaw', isEu: true}, {name: 'London', isEu: false}, {name: 'New York', isEu: false}, {name: 'Madrit', isEu: true}, {name: 'Rome', isEu: true}]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/locations');
        setLocations(response.data);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, []);

  const addLocation = (location) => {
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