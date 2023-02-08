package com.geopictures.controllers;

import com.geopictures.models.dtos.accueil.AccueilDTO;
import com.geopictures.models.entities.Joueur;
import com.geopictures.models.entities.Utilisateur;
import com.geopictures.models.mappers.AvatarMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("accueil")
public class AccueilController {

    @GetMapping()
    public AccueilDTO getAccueil() {
        Utilisateur utilisateur = (Utilisateur) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Joueur joueur = utilisateur.getJoueur();

        return AccueilDTO.builder()
                .id(joueur.getId())
                .nom(utilisateur.getNom())
                .niveau(joueur.getNiveau())
                .experience(joueur.getExperience())
                .prochainNiveau(joueur.getProchainNiveau())
                .pointsBoutique(joueur.getPointsBoutique())
                .avatarActif(AvatarMapper.INSTANCE.avatarToDto(joueur.getAvatarActif()))
                .build();
    }
}
