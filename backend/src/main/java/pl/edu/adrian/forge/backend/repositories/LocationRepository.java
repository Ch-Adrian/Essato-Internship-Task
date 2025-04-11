package pl.edu.adrian.forge.backend.repositories;
import org.springframework.data.mongodb.repository.MongoRepository;
import pl.edu.adrian.forge.backend.models.Location;

public interface LocationRepository extends MongoRepository<Location, String> {
    Location findByName(String name);
}

