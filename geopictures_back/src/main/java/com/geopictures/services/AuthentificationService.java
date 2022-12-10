package com.geopictures.services;

import com.geopictures.models.dtos.authentification.CreateJoueurDTO;
import com.geopictures.models.entities.Avatar;
import com.geopictures.models.entities.Joueur;
import com.geopictures.models.entities.Utilisateur;
import com.geopictures.repositories.AvatarRepository;
import com.geopictures.repositories.JoueurRepository;
import com.geopictures.repositories.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthentificationService {

    @Autowired
    private UtilisateurService utilisateurService;

    @Autowired
    private JoueurService joueurService;

    @Autowired
    private JoueurRepository joueurRepository;

    @Autowired
    private AvatarRepository avatarRepository;

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    public Joueur createJoueur(CreateJoueurDTO createJoueur) throws Exception {
        Optional<Avatar> optAvatar = avatarRepository.findById(createJoueur.getAvatarId());

        if(!optAvatar.isPresent()) {
            throw new Exception("Avatar introuvable");
        }

        Utilisateur utilisateur = utilisateurService.initUtilisateur(createJoueur.getNom());
        Joueur joueur = joueurService.initJoueur(utilisateur, optAvatar.get());
        return joueurRepository.save(joueur);
    }

    public boolean checkNomAvailable(String nom) {
        Utilisateur utilisateur = utilisateurRepository.findByNom(nom);
        return utilisateur == null;
    }
}
