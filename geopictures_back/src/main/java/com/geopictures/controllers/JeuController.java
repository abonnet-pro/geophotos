package com.geopictures.controllers;

import com.geopictures.models.dtos.photo.PhotoDTO;
import com.geopictures.services.JeuService;
import com.geopictures.services.UploaderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("jeu")
public class JeuController {

    @Autowired
    private JeuService jeuService;

    @Autowired
    private UploaderService uploaderService;

    @PostMapping("/ressemblance/{id}")
    public PhotoDTO getRessemblance(@RequestParam("file") MultipartFile file, @PathVariable("id") Long photoId) throws Exception {
        return jeuService.getRessemblance(file, photoId);
    }

}
