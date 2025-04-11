package pl.edu.adrian.forge.backend.repositories;


import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.data.mongodb.repository.MongoRepository;
import pl.edu.adrian.forge.backend.models.WarsawTemperature;

import java.util.List;
import java.util.Optional;

@ConditionalOnProperty(name = "storage", havingValue = "mongo")
public interface WarsawTemperatureRepository extends MongoRepository<WarsawTemperature, Long> {

    @Override
    Optional<WarsawTemperature> findById(Long id);

    @Override
    List<WarsawTemperature> findAllById(Iterable<Long> strings);

}