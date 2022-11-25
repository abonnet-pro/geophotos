package com.geopictures.services;

import com.geopictures.models.entities.Utilisateur;
import org.springframework.stereotype.Service;

@Service
public interface IUtilisateurService {
    Utilisateur getByEmail(String email);
}
