package pl.edu.adrian.forge.backend.repositories;
import org.springframework.data.mongodb.repository.MongoRepository;
import pl.edu.adrian.forge.backend.models.Temperature;

import java.util.List;

public interface TemperatureRepository extends MongoRepository<Temperature, String> {
    List<Temperature> findByLocationName(String locationName);
}

