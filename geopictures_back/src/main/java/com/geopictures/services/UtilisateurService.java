package com.geopictures.services;

import com.geopictures.models.entities.Utilisateur;
import com.geopictures.repositories.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UtilisateurService implements IUtilisateurService {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Autowired
    private HashPasswordService hashPasswordService;

    @Override
    public Utilisateur getByNom(String nom) {
        return utilisateurRepository.findByNom(nom);
    }
}
