package com.geopictures.controllers;

import com.geopictures.models.dtos.joueur.JoueurDTO;
import com.geopictures.models.dtos.utilisateur.UtilisateurDTO;
import com.geopictures.models.entities.Joueur;
import com.geopictures.models.mappers.AvatarMapper;
import com.geopictures.services.JoueurService;
import com.geopictures.services.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("joueur")
public class JoueurController {

    @Autowired
    private JoueurService joueurService;

    @Autowired
    private JwtService jwtService;

    @GetMapping("{id}")
    public JoueurDTO getJoueur(@PathVariable("id") Long id) throws Exception {

        

        Joueur joueur = joueurService.getJoueur(id);

        return JoueurDTO.builder()
                .id(joueur.getId())
                .nom(joueur.getUtilisateur().getNom())
                .niveau(joueur.getNiveau())
                .experience(joueur.getExperience())
                .prochainNiveau(joueur.getProchainNiveau())
                .pointsBoutique(joueur.getPointsBoutique())
                .avatarActif(AvatarMapper.INSTANCE.avatarToDto(joueur.getAvatarActif()))
                .build();
    }
}
