package pl.edu.adrian.forge.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.edu.adrian.forge.backend.models.Temperature;
import pl.edu.adrian.forge.backend.models.WarsawTemperature;
import pl.edu.adrian.forge.backend.repositories.WarsawTemperatureRepository;

@Service
public class TemperatureService {
    @Autowired
    private WarsawTemperatureRepository warsawTemperatureRepository;

    public TemperatureService(WarsawTemperatureRepository temperatureRepository) {
    }

    public WarsawTemperature save(WarsawTemperature temperature) {
        return warsawTemperatureRepository.save(temperature);
    }
    public WarsawTemperature findById(Long id) {
        return warsawTemperatureRepository.findById(id).get();
    }

}
