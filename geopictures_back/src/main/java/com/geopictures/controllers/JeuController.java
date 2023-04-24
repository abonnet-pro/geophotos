package com.geopictures.controllers;

import com.geopictures.models.dtos.photo.PhotoDTO;
import com.geopictures.models.pojos.Coordonnees;
import com.geopictures.services.JeuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;

@RestController
@RequestMapping("jeu")
public class JeuController {

    @Autowired
    private JeuService jeuService;

    @PostMapping("/ressemblance/{id}")
    public PhotoDTO getRessemblance(@RequestParam("file") MultipartFile file, @RequestParam("latitude") String latitude, @RequestParam("longitude") String longitude, @PathVariable("id") Long photoId) throws Exception {
        Coordonnees coordonnees =  new Coordonnees(new BigDecimal(longitude), new BigDecimal(latitude));
        return jeuService.getRessemblance(file, photoId, coordonnees);
    }
}
