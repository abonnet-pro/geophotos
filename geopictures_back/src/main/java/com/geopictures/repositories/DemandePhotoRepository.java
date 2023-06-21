package com.geopictures.repositories;

import com.geopictures.models.entities.DemandePhoto;
import com.geopictures.models.entities.Joueur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DemandePhotoRepository extends JpaRepository<DemandePhoto, Long> {
    List<DemandePhoto> findAllByJoueurOrderByCreatedDesc(Joueur joueur);
}
