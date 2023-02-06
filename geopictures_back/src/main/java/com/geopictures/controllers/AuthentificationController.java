package com.geopictures.controllers;

import com.geopictures.models.dtos.authentification.AuthentificationCheckNomDTO;
import com.geopictures.models.dtos.authentification.CreateJoueurDTO;
import com.geopictures.models.dtos.utilisateur.UtilisateurDTO;
import com.geopictures.models.entities.Joueur;
import com.geopictures.services.AuthentificationService;
import com.geopictures.services.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("authentification")
public class AuthentificationController {

    @Autowired
    private AuthentificationService authentificationService;

    @Autowired
    private JwtService jwtService;

    @PostMapping("check/nom/{nom}")
    public AuthentificationCheckNomDTO checkNom(@PathVariable("nom") String nom) {
        return AuthentificationCheckNomDTO.builder()
                .nom(nom)
                .available(authentificationService.checkNomAvailable(nom))
                .build();
    }

    @PostMapping("create")
    public UtilisateurDTO createJoueur(@RequestBody CreateJoueurDTO createJoueur) throws Exception {
        Joueur joueur = authentificationService.createJoueur(createJoueur);
        return UtilisateurDTO.builder()
                .id(joueur.getUtilisateur().getId())
                .nom(joueur.getUtilisateur().getNom())
                .token(jwtService.generateToken(joueur.getUtilisateur().getNom()))
                .build();
    }
}
