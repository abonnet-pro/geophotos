package com.geopictures.repositories;

import com.geopictures.models.entities.Titre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TitreRepository extends JpaRepository<Titre, Long> {
    Titre findByCode(String code);
}
