package com.geopictures.controllers;

import com.geopictures.models.dtos.boutique.AchatBoutiqueRequest;
import com.geopictures.models.dtos.boutique.BoutiqueDTO;
import com.geopictures.services.BoutiqueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("boutique")
public class BoutiqueController {

    @Autowired
    private BoutiqueService boutiqueService;

    @GetMapping()
    public BoutiqueDTO getBoutique() {
        return boutiqueService.getBoutique();
    }

    @PostMapping("achat")
    public void achatBoutique(@RequestBody AchatBoutiqueRequest achatBoutiqueRequest) throws Exception {
        boutiqueService.achatBoutique(achatBoutiqueRequest);
    }
}
