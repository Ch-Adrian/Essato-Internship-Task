package pl.edu.adrian.forge.backend.models;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "locations")
public class Location {

    @Id
    private String name;
    private boolean isEU;
    private Date dateOfCreation;

    public Location(String name, Date dateOfCreation, boolean isEU) {
        this.name = name;
        this.dateOfCreation = dateOfCreation;
        this.isEU = isEU;
    }

    public String getName() {
        return name;
    }

    public Date getDateOfCreation() {
        return dateOfCreation;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDateOfCreation(Date dateOfCreation) {
        this.dateOfCreation = dateOfCreation;
    }

    public boolean isEU() {
        return isEU;
    }

    public void setEU(boolean isEU) {
        this.isEU = isEU;
    }
}
