package com.geopictures.repositories;

import com.geopictures.models.entities.Joueur;
import com.geopictures.models.entities.Photo;
import com.geopictures.models.entities.PhotoJoueur;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PhotoJoueurRepository extends JpaRepository<PhotoJoueur, Long> {
    Optional<PhotoJoueur> findByJoueurAndPhoto(Joueur joueur, Photo photo);

    List<PhotoJoueur> findAllByJoueur(Joueur joueur);

    List<PhotoJoueur> findAllByPhoto(Photo photo);

    List<PhotoJoueur> findAllByPhotoOrderByScoreDesc(Photo photo);
}
