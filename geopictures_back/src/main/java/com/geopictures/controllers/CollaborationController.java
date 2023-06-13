package com.geopictures.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.geopictures.models.dtos.collaboration.DemandePhotoDTO;
import com.geopictures.models.dtos.collaboration.DemandesDTO;
import com.geopictures.models.entities.DemandePhoto;
import com.geopictures.services.CollaborationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("collaboration")
public class CollaborationController {

    @Autowired
    private CollaborationService collaborationService;

    @PostMapping("/demande/photo")
    public DemandePhoto demandePhoto(@RequestParam("file") MultipartFile file, @RequestParam("demandePhoto") String demandePhoto) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        DemandePhotoDTO demandePhotoDTO = objectMapper.readValue(demandePhoto, DemandePhotoDTO.class);
        return collaborationService.demandePhoto(file, demandePhotoDTO);
    }

    @GetMapping("/demandes")
    public DemandesDTO mesDemandes() {
        return collaborationService.mesDemandes();
    }
}
