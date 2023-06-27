package com.geopictures.repositories;

import com.geopictures.models.entities.TitreBoutique;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TitreBoutiqueRepository extends JpaRepository<TitreBoutique, Long> {
}
