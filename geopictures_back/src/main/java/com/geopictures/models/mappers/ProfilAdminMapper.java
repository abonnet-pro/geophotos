package com.geopictures.models.mappers;

import com.geopictures.models.dtos.profil.ProfildminDTO;
import com.geopictures.models.entities.Utilisateur;
import org.springframework.stereotype.Component;

@Component
public class ProfilAdminMapper {

    public ProfildminDTO toDto(Utilisateur entity) {
        return ProfildminDTO.builder()
                .utilisateurId(entity.getId())
                .actif(entity.isActif())
                .avatarActif(AvatarMapper.INSTANCE.avatarToDto(entity.getJoueur().getAvatarActif()))
                .bordureActive(BordureMapper.INSTANCE.bordureToDto(entity.getJoueur().getBordureActif()))
                .titreActif(TitreMapper.INSTANCE.titreToDto(entity.getJoueur().getTitreActif()))
                .dateCreation(entity.getCreated())
                .dateDerniereConnexion(entity.getDateDerniereConnexion())
                .dateSuspension(entity.getDateSuspension())
                .raisonSuspension(entity.getRaisonSuspension())
                .synchroGoogle(entity.getGoogleId() != null)
                .nom(entity.getNom())
                .niveau(entity.getJoueur().getNiveau())
                .build();
    }
}
