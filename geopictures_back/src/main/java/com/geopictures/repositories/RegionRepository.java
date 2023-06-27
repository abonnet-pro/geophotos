package com.geopictures.repositories;

import com.geopictures.models.entities.Region;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RegionRepository extends JpaRepository<Region, Long> {
    Region findByCode(String code);
}
