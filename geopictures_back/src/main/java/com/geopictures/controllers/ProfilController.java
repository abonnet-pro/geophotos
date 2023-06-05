package com.geopictures.controllers;

import com.geopictures.models.dtos.profil.ProfilDTO;
import com.geopictures.models.dtos.profil.SaveProfilDTO;
import com.geopictures.services.ProfilService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


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
}
