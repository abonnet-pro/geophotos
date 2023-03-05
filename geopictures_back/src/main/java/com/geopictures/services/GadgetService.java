package com.geopictures.services;

import com.geopictures.controllers.UtilisateurHolder;
import com.geopictures.models.dtos.gadget.GadgetByTypeDTO;
import com.geopictures.models.dtos.gadget.GadgetRequest;
import com.geopictures.models.dtos.gadget.GadgetRequestLocation;
import com.geopictures.models.dtos.photo.PhotoDTO;
import com.geopictures.models.entities.*;
import com.geopictures.models.enums.GadgetCode;
import com.geopictures.models.mappers.PhotoMapper;
import com.geopictures.models.pojos.Coordonnees;
import com.geopictures.repositories.GadgetRepository;
import com.geopictures.repositories.JoueurRepository;
import com.geopictures.repositories.PhotoJoueurRepository;
import com.geopictures.repositories.PhotoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class GadgetService extends UtilisateurHolder {

    @Autowired
    private PhotoRepository photoRepository;

    @Autowired
    private GadgetRepository gadgetRepository;

    @Autowired
    private JoueurRepository joueurRepository;

    @Autowired
    private PhotoJoueurRepository photoJoueurRepository;

    @Autowired
    private PhotoMapper photoMapper;

    public GadgetByTypeDTO gadgetByType(GadgetRequest gadgetRequest) throws Exception {
        Gadget gadget = gadgetRepository.findByCode(gadgetRequest.getCode());
        Optional<Photo> photoOpt = photoRepository.findById(gadgetRequest.getPhotoId());

        if(!photoOpt.isPresent()) {
            throw new Exception("Photo introuvable");
        }

        if (gadget == null) {
            throw new Exception("Gadget introuvable");
        }

        Joueur joueur = utilisateur().getJoueur();
        Set<GadgetJoueur> mesGadgets = joueur.getMesGadgets();
        GadgetJoueur gadgetJoueur = mesGadgets.stream().filter(gj -> gj.getGadget().getCode().equals(gadgetRequest.getCode())).findFirst().orElse(null);
        GadgetPhotoJoueur gadgetPhotoJoueur = joueur.getGadgetsUtilisesPhotos().stream().filter(gpj -> gpj.getGadget().getId().equals(gadget.getId()) && gpj.getPhoto().getId().equals(photoOpt.get().getId())).findFirst().orElse(null);

        GadgetByTypeDTO gadgetByTypeDTO = GadgetByTypeDTO.builder()
                .libelle(gadget.getLibelle())
                .code(gadget.getCode())
                .quantite(gadgetJoueur != null ? gadgetJoueur.getQuantite() : 0)
                .reponse(null)
                .build();

        if(gadgetPhotoJoueur != null) {
            return fillReponseGadget(gadget, photoOpt.get(), gadgetByTypeDTO);
        }

        return gadgetByTypeDTO;
    }

    public GadgetByTypeDTO gadgetByTypeLocation(GadgetRequestLocation gadgetRequest) throws Exception {
        Gadget gadget = gadgetRepository.findByCode(gadgetRequest.getCode());
        Optional<Photo> photoOpt = photoRepository.findById(gadgetRequest.getPhotoId());

        if(!photoOpt.isPresent()) {
            throw new Exception("Photo introuvable");
        }

        if (gadget == null) {
            throw new Exception("Gadget introuvable");
        }

        Joueur joueur = utilisateur().getJoueur();
        Set<GadgetJoueur> mesGadgets = joueur.getMesGadgets();
        GadgetJoueur gadgetJoueur = mesGadgets.stream().filter(gj -> gj.getGadget().getCode().equals(gadgetRequest.getCode())).findFirst().orElse(null);
        GadgetPhotoJoueur gadgetPhotoJoueur = joueur.getGadgetsUtilisesPhotos().stream().filter(gpj -> gpj.getGadget().getId().equals(gadget.getId()) && gpj.getPhoto().getId().equals(photoOpt.get().getId())).findFirst().orElse(null);

        GadgetByTypeDTO gadgetByTypeDTO = GadgetByTypeDTO.builder()
                .libelle(gadget.getLibelle())
                .code(gadget.getCode())
                .quantite(gadgetJoueur != null ? gadgetJoueur.getQuantite() : 0)
                .reponse(null)
                .build();

        if(gadgetPhotoJoueur != null) {
            return fillReponseGadgetLocation(gadget, photoOpt.get(), gadgetByTypeDTO, new Coordonnees(new BigDecimal(gadgetRequest.getLongitude()), new BigDecimal(gadgetRequest.getLatitude())));
        }

        return gadgetByTypeDTO;
    }


    public GadgetByTypeDTO utiliseGadgetLocation(GadgetRequestLocation gadgetRequest) throws Exception {
        Gadget gadget = gadgetRepository.findByCode(gadgetRequest.getCode());
        Optional<Photo> photoOpt = photoRepository.findById(gadgetRequest.getPhotoId());
        Joueur joueur = utilisateur().getJoueur();
        Set<GadgetJoueur> mesGadgets = joueur.getMesGadgets();
        GadgetJoueur gadgetJoueur = mesGadgets.stream().filter(gj -> gj.getGadget().getCode().equals(gadgetRequest.getCode())).findFirst().orElse(null);
        GadgetPhotoJoueur gadgetPhotoJoueur = joueur.getGadgetsUtilisesPhotos().stream().filter(gpj -> gpj.getGadget().getId().equals(gadget.getId()) && gpj.getPhoto().getId().equals(photoOpt.get().getId())).findFirst().orElse(null);

        checkUtilisationPossible(gadget, photoOpt, gadgetJoueur, gadgetPhotoJoueur);
        updateInventaire(gadget, photoOpt, joueur, gadgetJoueur);

        GadgetByTypeDTO gadgetByTypeDTO = GadgetByTypeDTO.builder()
                .libelle(gadgetJoueur.getGadget().getLibelle())
                .code(gadgetJoueur.getGadget().getCode())
                .quantite(gadgetJoueur.getQuantite())
                .build();

        fillReponseGadgetLocation(gadget, photoOpt.get(), gadgetByTypeDTO, new Coordonnees(new BigDecimal(gadgetRequest.getLongitude()), new BigDecimal(gadgetRequest.getLatitude())));

        return gadgetByTypeDTO;
    }

    public GadgetByTypeDTO utiliseGadget(GadgetRequest gadgetRequest) throws Exception {
        Gadget gadget = gadgetRepository.findByCode(gadgetRequest.getCode());
        Optional<Photo> photoOpt = photoRepository.findById(gadgetRequest.getPhotoId());
        Joueur joueur = utilisateur().getJoueur();
        Set<GadgetJoueur> mesGadgets = joueur.getMesGadgets();
        GadgetJoueur gadgetJoueur = mesGadgets.stream().filter(gj -> gj.getGadget().getCode().equals(gadgetRequest.getCode())).findFirst().orElse(null);
        GadgetPhotoJoueur gadgetPhotoJoueur = joueur.getGadgetsUtilisesPhotos().stream().filter(gpj -> gpj.getGadget().getId().equals(gadget.getId()) && gpj.getPhoto().getId().equals(photoOpt.get().getId())).findFirst().orElse(null);

        checkUtilisationPossible(gadget, photoOpt, gadgetJoueur, gadgetPhotoJoueur);
        updateInventaire(gadget, photoOpt, joueur, gadgetJoueur);

        GadgetByTypeDTO gadgetByTypeDTO = GadgetByTypeDTO.builder()
                .libelle(gadgetJoueur.getGadget().getLibelle())
                .code(gadgetJoueur.getGadget().getCode())
                .quantite(gadgetJoueur.getQuantite())
                .build();

        fillReponseGadget(gadget, photoOpt.get(), gadgetByTypeDTO);

        return gadgetByTypeDTO;
    }

    public PhotoDTO utiliseGadgetRecommencer(Long photoId) throws Exception {
        Optional<Photo> photoOpt = photoRepository.findById(photoId);

        if(!photoOpt.isPresent()) {
            throw new Exception("Photo invalide");
        }

        Joueur joueur = utilisateur().getJoueur();
        Set<GadgetJoueur> mesGadgets = joueur.getMesGadgets();
        GadgetJoueur gadgetJoueur = mesGadgets.stream().filter(gj -> gj.getGadget().getCode().equals(GadgetCode.RECOMMENCER)).findFirst().orElse(null);
        Photo photo = photoOpt.get();

        if(gadgetJoueur == null || gadgetJoueur.getQuantite() == 0) {
            throw new Exception("Action impossible, stock insuffisant");
        }

        PhotoJoueur photoJoue = joueur.getPhotosJoues().stream().filter(photoJoueur -> photoJoueur.getPhoto().getId().equals(photoOpt.get().getId())).findFirst().orElse(null);

        if(photoJoue == null) {
            throw new Exception("Action impossible, vous n'avez jamais jouée cette photo");
        }

        gadgetJoueur.setQuantite(gadgetJoueur.getQuantite() - 1);

        joueur.getPhotosJoues().remove(photoJoue);
        joueur = joueurRepository.save(joueur);
        joueurRepository.flush();

        return photoMapper.toDto(photo, joueur);
    }

    private void updateInventaire(Gadget gadget, Optional<Photo> photoOpt, Joueur joueur, GadgetJoueur gadgetJoueur) {
        gadgetJoueur.setQuantite(gadgetJoueur.getQuantite() - 1);
        GadgetPhotoJoueur gadgetUtilise = GadgetPhotoJoueur.builder()
                .gadget(gadget)
                .joueur(joueur)
                .photo(photoOpt.get())
                .build();

        joueur.getGadgetsUtilisesPhotos().add(gadgetUtilise);
        joueurRepository.save(joueur);
    }

    private void checkUtilisationPossible(Gadget gadget, Optional<Photo> photoOpt, GadgetJoueur gadgetJoueur, GadgetPhotoJoueur gadgetPhotoJoueur) throws Exception {
        if(!photoOpt.isPresent()) {
            throw new Exception("Photo introuvable");
        }

        if (gadget == null) {
            throw new Exception("Gadget introuvable");
        }

        if(gadgetJoueur == null || gadgetJoueur.getQuantite() == 0) {
            throw new Exception("Action impossible, stock insuffisant");
        }

        if(gadgetPhotoJoueur != null) {
            throw new Exception("Action impossible, gadget déjà utilisé sur la photo");
        }
    }

    private GadgetByTypeDTO fillReponseGadget(Gadget gadget, Photo photo, GadgetByTypeDTO gadgetByTypeDTO) {
        switch (gadget.getCode()) {
            case GPS:
                utiliseGadgetGps(photo, gadgetByTypeDTO);
                break;
            case TOP_1:
                utiliseGadgetTop1(photo, gadgetByTypeDTO);
                break;
            case INDICE:
                utiliseGadgetIndice(photo, gadgetByTypeDTO);
                break;
            case RECOMMENCER:
                break;
        }
        return gadgetByTypeDTO;
    }

    private GadgetByTypeDTO fillReponseGadgetLocation(Gadget gadget, Photo photo, GadgetByTypeDTO gadgetByTypeDTO, Coordonnees location) {
        switch (gadget.getCode()) {
            case DISTANCE:
                utiliseGadgetDistance(photo, gadgetByTypeDTO, location);
                break;
            case DIRECTION:
                utiliseGadgetDirection(photo, gadgetByTypeDTO, location);
                break;
            case SUCCESS_ZONE:
                utiliseGadgetSuccessGps(photo, gadgetByTypeDTO, location);
                break;
        }
        return gadgetByTypeDTO;
    }

    private void utiliseGadgetIndice(Photo photo, GadgetByTypeDTO gadgetByTypeDTO) {
        gadgetByTypeDTO.setReponse(photo.getIndice() != null ? photo.getIndice() : "");
    }

    private void utiliseGadgetTop1(Photo photo, GadgetByTypeDTO gadgetByTypeDTO) {
        List<PhotoJoueur> photosJouees = photoJoueurRepository.findAllByPhotoOrderByScoreDesc(photo);
        gadgetByTypeDTO.setReponse(photosJouees.isEmpty() ? "" : photosJouees.get(0).getImageJoue());
    }

    private void utiliseGadgetGps(Photo photo, GadgetByTypeDTO gadgetByTypeDTO) {
        gadgetByTypeDTO.setReponse(photo.getCoordonnes().toString());
    }

    private void utiliseGadgetDistance(Photo photo, GadgetByTypeDTO gadgetByTypeDTO, Coordonnees location) {
        Double distance = Coordonnees.getDistanceEnMetre(photo.getCoordonnes(), location);
        gadgetByTypeDTO.setReponse(String.valueOf(distance.intValue()));
    }

    private void utiliseGadgetDirection(Photo photo, GadgetByTypeDTO gadgetByTypeDTO, Coordonnees location) {
        Double angle = Coordonnees.getAngleParRapportNord(location, photo.getCoordonnes());
        gadgetByTypeDTO.setReponse(String.valueOf(angle.intValue()));
    }

    private void utiliseGadgetSuccessGps(Photo photo, GadgetByTypeDTO gadgetByTypeDTO, Coordonnees location) {
        Double distance = Coordonnees.getDistanceEnMetre(photo.getCoordonnes(), location);
        gadgetByTypeDTO.setReponse(distance > 50 ? "NON" : "OUI");
    }
}
