package com.geopictures.models.mappers;

import com.geopictures.models.dtos.photo.PhotoDTO;
import com.geopictures.models.entities.Joueur;
import com.geopictures.models.entities.Photo;
import com.geopictures.models.entities.PhotoJoueur;
import com.geopictures.repositories.PhotoJoueurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class PhotoMapper {

    @Autowired
    private PhotoJoueurRepository photoJoueurRepository;

    public PhotoDTO toDto(Photo entity, Joueur joueur) {
        Optional<PhotoJoueur> photoJoueurOpt = photoJoueurRepository.findByJoueurAndPhoto(joueur, entity);

        return PhotoDTO.builder()
                .titulaire(entity.getTitulaire().getUtilisateur().getNom())
                .datePublication(entity.getDatePublication())
                .titre(entity.getTitre())
                .id(entity.getId())
                .score(photoJoueurOpt.map(PhotoJoueur::getScore).orElse(null))
                .difficulte(entity.getDifficulte())
                .image(entity.getImage())
                .imageJouee(photoJoueurOpt.map(PhotoJoueur::getImageJoue).orElse(null))
                .succesGps(photoJoueurOpt.map(PhotoJoueur::getSuccesGps).orElse(null))
                .succesGlobale(photoJoueurOpt.map(PhotoJoueur::getSuccesGlobale).orElse(null))
                .build();
    }
}
