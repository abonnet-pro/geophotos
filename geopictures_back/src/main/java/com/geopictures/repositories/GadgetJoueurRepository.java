package com.geopictures.repositories;

import com.geopictures.models.entities.GadgetJoueur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GadgetJoueurRepository extends JpaRepository<GadgetJoueur, Long> {
}
