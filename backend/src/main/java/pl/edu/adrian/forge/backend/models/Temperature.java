package pl.edu.adrian.forge.backend.models;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Setter
@Getter
@Document(collection = "temperatures")
public class Temperature {

    @Id
    private String id;
    private String locationName;
    private double temperature;
    private Date timestamp;

    public Temperature(String locationName, double temperature, Date timestamp) {
        this.locationName = locationName;
        this.temperature = temperature;
        this.timestamp = timestamp;
    }

    public String getId() {
        return id;
    }

    public String getLocationName() {
        return locationName;
    }

    public double getTemperature() {
        return temperature;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setLocationName(String locationName) {
        this.locationName = locationName;
    }

    public void setTemperature(double temperature) {
        this.temperature = temperature;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }
}
