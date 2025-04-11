package pl.edu.adrian.forge.backend.services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.edu.adrian.forge.backend.models.Location;
import pl.edu.adrian.forge.backend.models.Temperature;
import pl.edu.adrian.forge.backend.repositories.LocationRepository;
import pl.edu.adrian.forge.backend.repositories.TemperatureRepository;

import java.util.Date;
import java.util.List;

@Service
public class LocationService {

    @Autowired
    private LocationRepository locationRepository;

    @Autowired
    private TemperatureRepository temperatureRepository;

    public Location createLocation(String name, Date dateOfCreation, boolean isEU) {
        Location location = new Location(name, dateOfCreation, isEU);
        return locationRepository.save(location);
    }

    public List<Location> getAllLocations() {
        return locationRepository.findAll();
    }

    public Temperature recordTemperature(String locationName, double temperature, Date timestamp) {
        Temperature temp = new Temperature(locationName, temperature, timestamp);
        return temperatureRepository.save(temp);
    }

    public List<Temperature> getTemperaturesForLocation(String locationName) {
        return temperatureRepository.findByLocationName(locationName);
    }


    public void deleteLocationAndTemperatures(String locationName) {
        temperatureRepository.deleteAll(temperatureRepository.findByLocationName(locationName));
        locationRepository.deleteById(locationName);
    }

    public void deleteAllLocations() {
        locationRepository.deleteAll();
    }


}
