package com.geopictures.services;

import com.geopictures.controllers.UtilisateurHolder;
import com.geopictures.models.dtos.collaboration.DemandeDTO;
import com.geopictures.models.dtos.collaboration.DemandePhotoDTO;
import com.geopictures.models.dtos.collaboration.DemandesDTO;
import com.geopictures.models.entities.DemandePhoto;
import com.geopictures.models.entities.Zone;
import com.geopictures.models.enums.EtatDemande;
import com.geopictures.models.mappers.DemandePhotoMapper;
import com.geopictures.repositories.DemandePhotoRepository;
import com.geopictures.repositories.ZoneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CollaborationService extends UtilisateurHolder {

    @Autowired
    private DemandePhotoRepository demandePhotoRepository;

    @Autowired
    private ZoneRepository zoneRepository;

    @Autowired
    private UploaderService uploaderService;

    public DemandePhoto demandePhoto(MultipartFile file, DemandePhotoDTO demandePhotoDTO) throws Exception {
        Optional<Zone> optZone = zoneRepository.findById(demandePhotoDTO.getZoneId());

        if(!optZone.isPresent()) {
            throw new Exception("Zone invalide");
        }

        String photoDemande = uploaderService.uploadFile(file);

        if(photoDemande.isEmpty()) {
            throw new Exception("Photo demandé invalide");
        }

        DemandePhoto demandePhoto = DemandePhoto.builder()
                .etatDemande(EtatDemande.EN_ATTENTE)
                .difficulte(demandePhotoDTO.getDifficulte())
                .joueur(utilisateur().getJoueur())
                .titre(demandePhotoDTO.getTitre())
                .indice(demandePhotoDTO.getTitre())
                .imageDemande(photoDemande)
                .latitude(demandePhotoDTO.getLatitude())
                .longitude(demandePhotoDTO.getLongitude())
                .zone(optZone.get())
                .build();

        return demandePhotoRepository.save(demandePhoto);
    }

    public DemandesDTO mesDemandes() {
        List<DemandePhoto> mesDemandes = demandePhotoRepository.findAllByJoueur(utilisateur().getJoueur());
        List<DemandeDTO> mesDemandesDTO = mesDemandes.stream().map(DemandePhotoMapper.INSTANCE::demandePhotoToDto).collect(Collectors.toList());
        return DemandesDTO.builder()
                .mesDemandes(mesDemandesDTO)
                .build();
    }
}
