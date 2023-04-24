package com.geopictures.repositories;

import com.geopictures.models.entities.Photo;
import com.geopictures.models.entities.Zone;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PhotoRepository extends JpaRepository<Photo, Long> {
    List<Photo> findAllByZone(Zone zone);

    Long countAllByZone(Zone zone);
}
