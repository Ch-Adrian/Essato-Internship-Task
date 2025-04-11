import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const LocationContext = createContext();

export const useLocations = () => useContext(LocationContext); // custom hook for easier use

export const LocationProvider = ({ children }) => {
  const [locations, setLocations] = useState([]);
  const [temperatures, setTemperatures] = useState([]);

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

  const addTemperature = async (location, temp) => {
    const response = await axios.post(`http://localhost:8080/locations/${location}/temperature`, {
        name: location.name,
        temperature: temp
      });
    
    let wasPlaced = false;
    temperatures.forEach((elem) => {
        if(elem.name === location){
            elem.temperatures.push(temp);
            wasPlaced = true;
            return;
        }
    })
    if(wasPlaced === false){
        temperatures.push({name: location, temperatures: [temp]})
        wasPlaced = true;
    }
    setTemperatures(temperatures);

  }

  const getTemperatures = async (location) => {
    if(location !== '' || location !== null){
        const response = await axios.get(`http://localhost:8080/locations/${location}/temperatures`);
        let temps = []
        response.data.forEach((element) => {
            temps.push(element.temperature)

        })

        setTemperatures([{name: location, temperatures: temps}])
    }
  }

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
    temperatures,
    addLocation,
    handleSort,
    deleteLocation,
    addTemperature,
    getTemperatures
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};