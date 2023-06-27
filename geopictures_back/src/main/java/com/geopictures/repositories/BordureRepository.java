package com.geopictures.repositories;

import com.geopictures.models.entities.Bordure;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BordureRepository extends JpaRepository<Bordure, Long> {
    Bordure findByCode(String code);
}
