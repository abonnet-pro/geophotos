package com.geopictures.controllers;

import com.geopictures.models.dtos.administration.AdministrationDemandeUpdateRequest;
import com.geopictures.models.enums.TypeDemande;
import com.geopictures.services.AdministrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.security.RolesAllowed;

@RestController
@RequestMapping("administration")
public class AdministrationController {

    @Autowired
    private AdministrationService administrationService;

    @PostMapping("/demande/update")
    @RolesAllowed("ADMIN")
    public void demandePhoto(@RequestBody AdministrationDemandeUpdateRequest administrationDemandeUpdateRequest) throws Exception {
        if(administrationDemandeUpdateRequest.getTypeDemande() == TypeDemande.PHOTO) {
            administrationService.demandePhoto(administrationDemandeUpdateRequest);
        } else {
            administrationService.demandeZone(administrationDemandeUpdateRequest);
        }
    }
}
