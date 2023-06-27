package com.geopictures.repositories;

import com.geopictures.models.entities.DemandeZone;
import com.geopictures.models.entities.Joueur;
import com.geopictures.models.dtos.enums.EtatDemande;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DemandeZoneRepository extends JpaRepository<DemandeZone, Long> {
    List<DemandeZone> findAllByJoueurOrderByCreatedDesc(Joueur joueur);

    List<DemandeZone> findAllByEtatDemandeOrderByCreatedDesc(EtatDemande etatDemande);
}
