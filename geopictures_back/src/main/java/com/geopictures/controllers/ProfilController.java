package com.geopictures.controllers;

import com.geopictures.models.dtos.photo.PhotoDTO;
import com.geopictures.models.dtos.profil.ProfilCarteVisiteDTO;
import com.geopictures.models.dtos.profil.ProfilDTO;
import com.geopictures.models.dtos.profil.SaveProfilDTO;
import com.geopictures.services.ProfilService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequestMapping("profil")
public class ProfilController {

    @Autowired
    private ProfilService profilService;

    @GetMapping()
    public ProfilDTO getProfil() {
        return profilService.getProfil();
    }

    @PostMapping()
    public ProfilDTO saveProfil(@RequestBody SaveProfilDTO saveProfilDTO) throws Exception {
        return profilService.saveProfil(saveProfilDTO);
    }
    @GetMapping("joueur/{joueurId}")
    public ProfilCarteVisiteDTO getCarteVisiteJoueur(@PathVariable("joueurId") Long joueurId) throws Exception {
        return profilService.getCarteVisiteJoueur(joueurId);
    }

}
