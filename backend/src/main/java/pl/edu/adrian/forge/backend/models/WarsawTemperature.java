package pl.edu.adrian.forge.backend.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection="warsaw")
public class WarsawTemperature {

    @Id
    private int id;
    private float value;
    private Date date;

    public WarsawTemperature() {}
}
