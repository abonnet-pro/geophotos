package com.geopictures.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.geopictures.models.dtos.collaboration.DemandeDTO;
import com.geopictures.models.dtos.collaboration.DemandePhotoDTO;
import com.geopictures.models.dtos.collaboration.DemandeZoneDTO;
import com.geopictures.models.dtos.collaboration.DemandesDTO;
import com.geopictures.models.entities.DemandePhoto;
import com.geopictures.models.entities.DemandeZone;
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

    @PostMapping("/demande/zone")
    public DemandeZone demandeZone(@RequestParam(value = "file", required = false) MultipartFile file, @RequestParam("demandeZone") String demandeZone) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        DemandeZoneDTO demandeZoneDTO = objectMapper.readValue(demandeZone, DemandeZoneDTO.class);
        return collaborationService.demandeZone(file, demandeZoneDTO);
    }

    @GetMapping("/demandes")
    public DemandesDTO mesDemandes() {
        return collaborationService.mesDemandes();
    }

    @PostMapping("demande/annulation/photo/{id}")
    public DemandeDTO annulationDemandePhoto(@PathVariable("id") Long demandeId) throws Exception {
        return collaborationService.annulationDemandePhoto(demandeId);
    }

    @PostMapping("demande/annulation/zone/{id}")
    public DemandeDTO annulationDemandeZone(@PathVariable("id") Long demandeId) throws Exception {
        return collaborationService.annulationDemandeZone(demandeId);
    }
}
