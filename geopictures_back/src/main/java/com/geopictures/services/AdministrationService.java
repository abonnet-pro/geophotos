package com.geopictures.services;

import com.geopictures.models.dtos.administration.AdministrationDemandeUpdateRequest;
import com.geopictures.models.dtos.administration.AdministrationSuspensionRequest;
import com.geopictures.models.dtos.profil.ProfildminDTO;
import com.geopictures.models.entities.*;
import com.geopictures.models.dtos.enums.EtatDemande;
import com.geopictures.models.dtos.enums.Role;
import com.geopictures.models.mappers.ProfilAdminMapper;
import com.geopictures.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AdministrationService {

    @Autowired
    private DemandePhotoRepository demandePhotoRepository;

    @Autowired
    private DemandeZoneRepository demandeZoneRepository;

    @Autowired
    private ZoneRepository zoneRepository;

    @Autowired
    private PhotoRepository photoRepository;

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Autowired
    private ProfilAdminMapper profilAdminMapper;


    @Value("${spring.security.admin.name}")
    private String adminEmail;

    @Autowired
    private UploaderService uploaderService;

    public void demandePhoto(AdministrationDemandeUpdateRequest administrationDemandeUpdateRequest) throws Exception {
        Optional<DemandePhoto> optDemandePhoto = demandePhotoRepository.findById(administrationDemandeUpdateRequest.getDemandeId());

        if(!optDemandePhoto.isPresent()) {
            throw new Exception("Demande photo invalide");
        }

        DemandePhoto demandePhoto = optDemandePhoto.get();

        demandePhoto.setEtatDemande(administrationDemandeUpdateRequest.isAccept() ? EtatDemande.ACCEPTE : EtatDemande.REFUSE);
        demandePhoto.setCommentaire(administrationDemandeUpdateRequest.getCommentaire());

        demandePhoto = demandePhotoRepository.save(demandePhoto);

        if(demandePhoto.getEtatDemande() != EtatDemande.ACCEPTE) {
            return;
        }

        Photo nouvellePhoto = Photo.builder()
                .zone(demandePhoto.getZone())
                .titre(demandePhoto.getLibelle())
                .titulaire(demandePhoto.getJoueur())
                .difficulte(demandePhoto.getDifficulte())
                .latitude(demandePhoto.getLatitude())
                .longitude(demandePhoto.getLongitude())
                .indice(demandePhoto.getIndice())
                .datePublication(LocalDateTime.now())
                .image(demandePhoto.getImage())
                .build();

        photoRepository.save(nouvellePhoto);
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

        if(demandeZone.getEtatDemande() != EtatDemande.ACCEPTE) {
            return;
        }

        Zone nouvelleZone = Zone.builder()
                .image(demandeZone.getImage())
                .region(demandeZone.getRegion())
                .libelle(demandeZone.getLibelle())
                .build();

        zoneRepository.save(nouvelleZone);
    }

    public List<ProfildminDTO> getListJoueurs() {
        List<Utilisateur> utilisateurs = utilisateurRepository.findAllByRole(Role.JOUEUR);
        return utilisateurs.stream().map(utilisateur -> profilAdminMapper.toDto(utilisateur)).collect(Collectors.toList());
    }

    public ProfildminDTO suspensionUtilisateur(AdministrationSuspensionRequest administrationSuspensionRequest) throws Exception {
        Optional<Utilisateur> optUtilisateur = utilisateurRepository.findById(administrationSuspensionRequest.getUtilisateurId());

        if(!optUtilisateur.isPresent()) {
            throw new Exception("Utilisateur invalide");
        }

        Utilisateur utilisateur = optUtilisateur.get();

        utilisateur.setActif(administrationSuspensionRequest.isActif());
        utilisateur.setRaisonSuspension(administrationSuspensionRequest.isActif() ? null : administrationSuspensionRequest.getRaisonSuspension());
        utilisateur.setDateSuspension(administrationSuspensionRequest.isActif() ? null : LocalDateTime.now());

        utilisateur = utilisateurRepository.save(utilisateur);
        return profilAdminMapper.toDto(utilisateur);
    }

    public void suppressionUtilisateur(Long utilisateurId) throws Exception {
        Optional<Utilisateur> optUtilisateur = utilisateurRepository.findById(utilisateurId);

        if(!optUtilisateur.isPresent()) {
            throw new Exception("Utilisateur invalide");
        }

        Utilisateur utilisateur = optUtilisateur.get();

        if(!utilisateur.getJoueur().getPhotoCollaboration().isEmpty()) {
            Utilisateur admin = utilisateurRepository.findByEmail(adminEmail);
            for(Photo photo : utilisateur.getJoueur().getPhotoCollaboration()) {
                photo.setTitulaire(admin.getJoueur());
                photoRepository.save(photo);
            }
        }

        utilisateurRepository.delete(utilisateur);
    }

    public void suppressionPhoto(Long photoId) throws Exception {
        Optional<Photo> optPhoto = photoRepository.findById(photoId);

        if(!optPhoto.isPresent()) {
            throw new Exception("Photo invalide");
        }

        Photo photo = optPhoto.get();

        if(!photo.getPhotosJoues().isEmpty()) {
            for(PhotoJoueur photoJoueur : photo.getPhotosJoues()) {
                uploaderService.deleteFile(photoJoueur.getImageJoue());
            }
        }

        photoRepository.delete(photo);
    }

    public void suppressionZone(Long zoneId) throws Exception {
        Optional<Zone> optZone = zoneRepository.findById(zoneId);

        if(!optZone.isPresent()) {
            throw new Exception("Zone invalide");
        }

        Zone zone = optZone.get();

        if(!zone.getPhotos().isEmpty()) {
            for(Photo photo : zone.getPhotos()) {
                suppressionPhoto(photo.getId());
            }
        }

        zoneRepository.delete(zone);
    }
}
