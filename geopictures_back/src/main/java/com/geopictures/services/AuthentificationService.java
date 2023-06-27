package com.geopictures.services;

import com.geopictures.controllers.UtilisateurHolder;
import com.geopictures.models.dtos.authentification.CheckGoogleDTO;
import com.geopictures.models.dtos.authentification.CreateJoueurDTO;
import com.geopictures.models.dtos.utilisateur.UtilisateurDTO;
import com.geopictures.models.entities.Avatar;
import com.geopictures.models.entities.Joueur;
import com.geopictures.models.entities.Utilisateur;
import com.geopictures.models.dtos.enums.Role;
import com.geopictures.repositories.AvatarRepository;
import com.geopictures.repositories.JoueurRepository;
import com.geopictures.repositories.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthentificationService extends UtilisateurHolder {

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

    @Autowired
    private JwtService jwtService;

    public Joueur createJoueur(CreateJoueurDTO createJoueur) throws Exception {
        Optional<Avatar> optAvatar = avatarRepository.findById(createJoueur.getAvatarId());

        if(!optAvatar.isPresent()) {
            throw new Exception("Avatar introuvable");
        }

        Utilisateur utilisateur = utilisateurService.initUtilisateur(createJoueur.getNom(), createJoueur.getEmail(), createJoueur.getGoogleId());
        Joueur joueur = joueurService.initJoueur(utilisateur, optAvatar.get());
        return joueurRepository.save(joueur);
    }

    public boolean checkNomAvailable(String nom) {
        Utilisateur utilisateur = utilisateurRepository.findByNom(nom);
        return utilisateur == null;
    }

    public UtilisateurDTO getUtilisateurGoogle(CheckGoogleDTO checkGoogleDTO) throws Exception {
        Utilisateur utilisateur = utilisateurRepository.findByEmail(checkGoogleDTO.getEmail());

        if(utilisateur == null) {
            return null;
        }

        if(!checkGoogleDTO.getId().equals(utilisateur.getGoogleId())) {
            throw new Exception("Authentication invalide !");
        }

        return UtilisateurDTO.builder()
                .id(utilisateur.getJoueur().getUtilisateur().getId())
                .nom(utilisateur.getJoueur().getUtilisateur().getNom())
                .token(jwtService.generateToken(utilisateur.getJoueur().getUtilisateur().getNom()))
                .admin(utilisateur.getRole() == Role.ADMIN)
                .build();
    }

    public void synchroniseUtilisateurGoogle(CheckGoogleDTO checkGoogleDTO) {
        Utilisateur utilisateur = utilisateur();
        utilisateur.setGoogleId(checkGoogleDTO.getId());
        utilisateur.setEmail(checkGoogleDTO.getEmail());
        utilisateurRepository.save(utilisateur);
    }
}
