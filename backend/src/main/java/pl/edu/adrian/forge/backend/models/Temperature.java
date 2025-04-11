package pl.edu.adrian.forge.backend.models;

import org.springframework.data.annotation.Id;

import java.util.Date;

public class Temperature {

    private float value;
    private Date date;
    private String location;

    public Temperature() {}
}