package com.geopictures.models.mappers;

import com.geopictures.models.dtos.photo.PhotoDTO;
import com.geopictures.models.entities.*;
import com.geopictures.models.dtos.enums.GadgetCode;
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
        GadgetJoueur gadgetRecommencer = joueur.getMesGadgets().stream().filter(gadgetJoueur -> gadgetJoueur.getGadget().getCode().equals(GadgetCode.RECOMMENCER)).findFirst().orElse(null);

        return PhotoDTO.builder()
                .titulaire(entity.getTitulaire().getUtilisateur().getNom())
                .datePublication(entity.getDatePublication())
                .titre(entity.getTitre())
                .id(entity.getId())
                .zoneId(entity.getZone().getId())
                .regionCode(entity.getZone().getRegion().getCode())
                .score(photoJoueurOpt.map(PhotoJoueur::getScore).orElse(null))
                .difficulte(entity.getDifficulte())
                .image(entity.getImage())
                .imageJouee(photoJoueurOpt.map(PhotoJoueur::getImageJoue).orElse(null))
                .succesGps(photoJoueurOpt.map(PhotoJoueur::getSuccesGps).orElse(null))
                .succesGlobale(photoJoueurOpt.map(PhotoJoueur::getSuccesGlobale).orElse(null))
                .gadgetRecommencerDisponible(gadgetRecommencer != null && gadgetRecommencer.getQuantite() > 0)
                .build();
    }

    public PhotoDTO toDtoWithPhotoJoueur(Photo entity, PhotoJoueur photoJoueur) {
        GadgetJoueur gadgetRecommencer = photoJoueur.getJoueur().getMesGadgets().stream().filter(gadgetJoueur -> gadgetJoueur.getGadget().getCode().equals(GadgetCode.RECOMMENCER)).findFirst().orElse(null);

        return PhotoDTO.builder()
                .titulaire(entity.getTitulaire().getUtilisateur().getNom())
                .datePublication(entity.getDatePublication())
                .titre(entity.getTitre())
                .id(entity.getId())
                .zoneId(entity.getZone().getId())
                .score(photoJoueur.getScore())
                .difficulte(entity.getDifficulte())
                .image(entity.getImage())
                .imageJouee(photoJoueur.getImageJoue())
                .succesGps(photoJoueur.getSuccesGps())
                .succesGlobale(photoJoueur.getSuccesGlobale())
                .gadgetRecommencerDisponible(gadgetRecommencer != null && gadgetRecommencer.getQuantite() > 0)
                .build();
    }
}
