package com.geopictures.services;

import com.geopictures.models.dtos.avatar.AvatarDTO;
import com.geopictures.models.dtos.classement.ClassementDTO;
import com.geopictures.models.dtos.classement.ClassementLigneDTO;
import com.geopictures.models.entities.Joueur;
import com.geopictures.models.entities.PhotoJoueur;
import com.geopictures.models.mappers.AvatarMapper;
import com.geopictures.repositories.JoueurRepository;
import com.geopictures.repositories.PhotoJoueurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ClassementService {

    @Autowired
    private PhotoJoueurRepository photoJoueurRepo;

    @Autowired
    private JoueurRepository joueurRepo;

    public ClassementDTO getClassementGeneral(Long zoneId, String codeRegion, Long photoId) throws Exception {
        List<PhotoJoueur> photoJoueurAll = getPhotoJoueur(zoneId, codeRegion, photoId);
        Map<Joueur, Double> groupScorePhotoJoueurByJoueur = photoJoueurAll.stream().collect(Collectors.groupingBy(PhotoJoueur::getJoueur, Collectors.summingDouble(photoJoueur->photoJoueur.getScore().doubleValue())));

        List<ClassementLigneDTO> classement = new ArrayList<>();
        for(Map.Entry<Joueur, Double> scorePhotoJoueurByJoueur: groupScorePhotoJoueurByJoueur.entrySet()) {
            Joueur joueur = scorePhotoJoueurByJoueur.getKey();

            ClassementLigneDTO ligneClassement = ClassementLigneDTO.builder()
                    .avatar(AvatarMapper.INSTANCE.avatarToDto(joueur.getAvatarActif()))
                    .joueurId(joueur.getId())
                    .joueurNom(joueur.getUtilisateur().getNom())
                    .score(scorePhotoJoueurByJoueur.getValue())
                    .build();

            classement.add(ligneClassement);
        }
        return ClassementDTO.builder().classement(classement.stream().sorted(Comparator.comparingDouble(ClassementLigneDTO::getScore).reversed()).collect(Collectors.toList())).build();
    }

    private List<PhotoJoueur> getPhotoJoueur(Long zoneId, String codeRegion, Long photoId) {
        if(zoneId != null) {
            return photoJoueurRepo.findAll().stream().filter(photoJoueur -> Objects.equals(photoJoueur.getPhoto().getZone().getId(), zoneId)).collect(Collectors.toList());
        }
        if(codeRegion != null) {
            return photoJoueurRepo.findAll().stream().filter(photoJoueur -> Objects.equals(photoJoueur.getPhoto().getZone().getRegion().getCode(), codeRegion)).collect(Collectors.toList());
        }
        if(photoId != null) {
            return photoJoueurRepo.findAll().stream().filter(photoJoueur -> Objects.equals(photoJoueur.getPhoto().getId(), photoId)).collect(Collectors.toList());
        }
        return photoJoueurRepo.findAll();
    }
}
