package com.geopictures.services;

import com.geopictures.models.entities.Avatar;
import com.geopictures.models.entities.Joueur;
import com.geopictures.models.entities.Utilisateur;
import com.geopictures.repositories.JoueurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class JoueurService {

    @Autowired
    private JoueurRepository joueurRepository;

    public Joueur initJoueur(Utilisateur utilisateur, Avatar avatar) {
        return Joueur.builder()
                .utilisateur(utilisateur)
                .niveau(1)
                .experience(0)
                .prochainNiveau(100)
                .pointsBoutique(0)
                .avatarActif(avatar)
                .build();
    }

    public Joueur getJoueur(Long id) throws Exception {
        Optional<Joueur> optJoueur = joueurRepository.findById(id);

        if(!optJoueur.isPresent()) {
            throw new Exception("Joueur invalide");
        }

        return optJoueur.get();
    }
}
