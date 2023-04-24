package com.geopictures.repositories;

import com.geopictures.models.entities.Region;
import com.geopictures.models.entities.Zone;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ZoneRepository extends JpaRepository<Zone, Long> {
    List<Zone> findAllByRegion(Region region);

    Zone findByLibelle(String libelle);
}
