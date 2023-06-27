package com.geopictures.services;

import com.geopictures.controllers.UtilisateurHolder;
import com.geopictures.models.dtos.collaboration.DemandeDTO;
import com.geopictures.models.dtos.collaboration.DemandePhotoDTO;
import com.geopictures.models.dtos.collaboration.DemandeZoneDTO;
import com.geopictures.models.dtos.collaboration.DemandesDTO;
import com.geopictures.models.entities.*;
import com.geopictures.models.dtos.enums.EtatDemande;
import com.geopictures.models.mappers.DemandePhotoMapper;
import com.geopictures.models.mappers.DemandeZoneMapper;
import com.geopictures.repositories.DemandePhotoRepository;
import com.geopictures.repositories.DemandeZoneRepository;
import com.geopictures.repositories.RegionRepository;
import com.geopictures.repositories.ZoneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CollaborationService extends UtilisateurHolder {

    @Autowired
    private DemandePhotoRepository demandePhotoRepository;

    @Autowired
    private DemandeZoneRepository demandeZoneRepository;

    @Autowired
    private ZoneRepository zoneRepository;

    @Autowired
    private RegionRepository regionRepository;

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
                .libelle(demandePhotoDTO.getLibelle())
                .indice(demandePhotoDTO.getLibelle())
                .image(photoDemande)
                .latitude(demandePhotoDTO.getLatitude())
                .longitude(demandePhotoDTO.getLongitude())
                .zone(optZone.get())
                .build();

        return demandePhotoRepository.save(demandePhoto);
    }

    public DemandeZone demandeZone(MultipartFile file, DemandeZoneDTO demandeZoneDTO) throws Exception {
        Region region = regionRepository.findByCode(demandeZoneDTO.getCodeRegion());

        if(region == null) {
            throw new Exception("Région invalide");
        }

        String imageZone = null;
        if(file != null) {
            imageZone = uploaderService.uploadFile(file);

            if(imageZone.isEmpty()) {
                throw new Exception("Image de la zone invalide");
            }
        }

        DemandeZone demandeZone = DemandeZone.builder()
                .etatDemande(EtatDemande.EN_ATTENTE)
                .joueur(utilisateur().getJoueur())
                .libelle(demandeZoneDTO.getLibelle())
                .region(region)
                .image(imageZone)
                .build();

        return demandeZoneRepository.save(demandeZone);
    }

    public DemandesDTO mesDemandes() {
        List<DemandePhoto> mesDemandesPhotos = demandePhotoRepository.findAllByJoueurOrderByCreatedDesc(utilisateur().getJoueur());
        List<DemandeZone> mesDemandesZones = demandeZoneRepository.findAllByJoueurOrderByCreatedDesc(utilisateur().getJoueur());

        List<DemandeDTO> mesDemandesPhotosDTO = mesDemandesPhotos.stream().map(DemandePhotoMapper.INSTANCE::demandePhotoToDto).collect(Collectors.toList());
        List<DemandeDTO> mesDemandesZonesDTO = mesDemandesZones.stream().map(DemandeZoneMapper.INSTANCE::demandeZoneToDto).collect(Collectors.toList());

        mesDemandesPhotosDTO.addAll(mesDemandesZonesDTO);

        return DemandesDTO.builder()
                .mesDemandes(mesDemandesPhotosDTO)
                .build();
    }

    public List<DemandeDTO> demandesEnAttente() {
        List<DemandePhoto> demandesPhotos = demandePhotoRepository.findAllByEtatDemandeOrderByCreatedDesc(EtatDemande.EN_ATTENTE);
        List<DemandeZone> demandesZones = demandeZoneRepository.findAllByEtatDemandeOrderByCreatedDesc(EtatDemande.EN_ATTENTE);

        List<DemandeDTO> demandesPhotosDTO = demandesPhotos.stream().map(DemandePhotoMapper.INSTANCE::demandePhotoToDto).collect(Collectors.toList());
        List<DemandeDTO> demandesZonesDTO = demandesZones.stream().map(DemandeZoneMapper.INSTANCE::demandeZoneToDto).collect(Collectors.toList());

        demandesPhotosDTO.addAll(demandesZonesDTO);

        return demandesPhotosDTO;
    }

    public DemandeDTO annulationDemandeZone(Long demandeId) throws Exception {
        Optional<DemandeZone> optDemandeZone = demandeZoneRepository.findById(demandeId);

        if(!optDemandeZone.isPresent()) {
            throw new Exception("Demande introuvable");
        }

        DemandeZone demandeZone = optDemandeZone.get();
        Joueur joueur = utilisateur().getJoueur();

        if(!Objects.equals(demandeZone.getJoueur().getId(), joueur.getId())) {
            throw new Exception("Interdiction d'annuler cette demande");
        }

        demandeZone.setEtatDemande(EtatDemande.ANNULE);
        demandeZone = demandeZoneRepository.save(demandeZone);
        return DemandeZoneMapper.INSTANCE.demandeZoneToDto(demandeZone);
    }

    public DemandeDTO annulationDemandePhoto(Long demandeId) throws Exception {
        Optional<DemandePhoto> optDemandePhoto = demandePhotoRepository.findById(demandeId);

        if(!optDemandePhoto.isPresent()) {
            throw new Exception("Demande photo introuvable");
        }

        DemandePhoto demandePhoto = optDemandePhoto.get();
        Joueur joueur = utilisateur().getJoueur();

        if(!Objects.equals(demandePhoto.getJoueur().getId(), joueur.getId())) {
            throw new Exception("Interdiction d'annuler cette demande");
        }

        demandePhoto.setEtatDemande(EtatDemande.ANNULE);
        demandePhoto = demandePhotoRepository.save(demandePhoto);
        return DemandePhotoMapper.INSTANCE.demandePhotoToDto(demandePhoto);
    }
}
