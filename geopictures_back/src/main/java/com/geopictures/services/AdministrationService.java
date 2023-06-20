package com.geopictures.services;

import com.geopictures.models.dtos.administration.AdministrationDemandeUpdateRequest;
import com.geopictures.models.entities.DemandePhoto;
import com.geopictures.models.entities.DemandeZone;
import com.geopictures.models.enums.EtatDemande;
import com.geopictures.repositories.DemandePhotoRepository;
import com.geopictures.repositories.DemandeZoneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdministrationService {

    @Autowired
    private DemandePhotoRepository demandePhotoRepository;

    @Autowired
    private DemandeZoneRepository demandeZoneRepository;

    public void demandePhoto(AdministrationDemandeUpdateRequest administrationDemandeUpdateRequest) throws Exception {
        Optional<DemandePhoto> optDemandePhoto = demandePhotoRepository.findById(administrationDemandeUpdateRequest.getDemandeId());

        if(!optDemandePhoto.isPresent()) {
            throw new Exception("Demande photo invalide");
        }

        DemandePhoto demandePhoto = optDemandePhoto.get();

        demandePhoto.setEtatDemande(administrationDemandeUpdateRequest.isAccept() ? EtatDemande.ACCEPTE : EtatDemande.REFUSE);
        demandePhoto.setCommentaire(administrationDemandeUpdateRequest.getCommentaire());

        demandePhoto = demandePhotoRepository.save(demandePhoto);

        // TODO : nouvelle photo
    }

    public void demandeZone(AdministrationDemandeUpdateRequest administrationDemandeUpdateRequest) throws Exception {
        Optional<DemandeZone> optionalDemandeZone = demandeZoneRepository.findById(administrationDemandeUpdateRequest.getDemandeId());

        if(!optionalDemandeZone.isPresent()) {
            throw new Exception("Demande zone invalide");
        }

        DemandeZone demandeZone = optionalDemandeZone.get();

        demandeZone.setEtatDemande(administrationDemandeUpdateRequest.isAccept() ? EtatDemande.ACCEPTE : EtatDemande.REFUSE);
        demandeZone.setCommentaire(administrationDemandeUpdateRequest.getCommentaire());

        demandeZone = demandeZoneRepository.save(demandeZone);

        // TODO : nouvelle zone
    }
}
