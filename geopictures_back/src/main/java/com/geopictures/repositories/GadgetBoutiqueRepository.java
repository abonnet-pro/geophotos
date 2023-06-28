package com.geopictures.repositories;

import com.geopictures.models.entities.GadgetBoutique;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GadgetBoutiqueRepository extends JpaRepository<GadgetBoutique, Long> {
    List<GadgetBoutique> findAllByEnVente(boolean enVente);
}
