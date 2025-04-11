package pl.edu.adrian.forge.backend.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.edu.adrian.forge.backend.models.Location;
import pl.edu.adrian.forge.backend.models.Temperature;
import pl.edu.adrian.forge.backend.services.LocationService;

import java.util.List;
import java.util.Date;

@RestController
@RequestMapping("/locations")
@CrossOrigin(origins = "http://localhost:3000")
public class LocationController {

    @Autowired
    private LocationService locationService;

    @PostMapping
    public Location createLocation(@RequestBody Location location) {
        return locationService.createLocation(location.getName(), location.getDateOfCreation(), location.isEU());
    }

    @PostMapping("/{locationName}/temperature")
    public Temperature recordTemperature(@PathVariable String locationName, @RequestBody Temperature temperature) {
        return locationService.recordTemperature(locationName, temperature.getTemperature(), new Date());
    }

    @GetMapping("/{locationName}/temperatures")
    public List<Temperature> getTemperatures(@PathVariable String locationName) {
        return locationService.getTemperaturesForLocation(locationName);
    }

    @GetMapping
    public List<Location> getAllLocations() {
        return locationService.getAllLocations();
    }

    @DeleteMapping("/{locationName}")
    public void deleteLocation(@PathVariable String locationName) {
        locationService.deleteLocationAndTemperatures(locationName);
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteAllLocations() {
        locationService.deleteAllLocations();
        return ResponseEntity.noContent().build();
    }

}
