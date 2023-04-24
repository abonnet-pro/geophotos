package com.geopictures.controllers;

import com.geopictures.models.entities.Utilisateur;
import org.springframework.security.core.context.SecurityContextHolder;

public class UtilisateurHolder {

    Utilisateur utilisateur() {
        return (Utilisateur) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
}
