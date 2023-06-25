package com.geopictures.controllers;

import com.geopictures.models.dtos.administration.AdministrationDemandeUpdateRequest;
import com.geopictures.models.dtos.administration.AdministrationSuspensionRequest;
import com.geopictures.models.dtos.profil.ProfildminDTO;
import com.geopictures.models.enums.TypeDemande;
import com.geopictures.services.AdministrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import java.util.List;

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

    @GetMapping("/joueurs")
    @RolesAllowed("ADMIN")
    public List<ProfildminDTO> getJoueurs() {
        return administrationService.getListJoueurs();
    }

    @PostMapping("/utilisateur/suspension")
    @RolesAllowed("ADMIN")
    public ProfildminDTO suspensionUtilisateur(@RequestBody AdministrationSuspensionRequest administrationSuspensionRequest) throws Exception {
        return administrationService.suspensionUtilisateur(administrationSuspensionRequest);
    }

    @DeleteMapping("/utilisateur/{id}")
    @RolesAllowed("ADMIN")
    public void suppressionUtilisateur(@PathVariable("id") Long utilisateurId) throws Exception {
        administrationService.suppressionUtilisateur(utilisateurId);
    }

    @DeleteMapping("/photo/{id}")
    @RolesAllowed("ADMIN")
    public void suppressionPhoto(@PathVariable("id") Long photoId) throws Exception {
        administrationService.suppressionPhoto(photoId);
    }

    @DeleteMapping("/zone/{id}")
    @RolesAllowed("ADMIN")
    public void suppressionZone(@PathVariable("id") Long zoneId) throws Exception {
        administrationService.suppressionZone(zoneId);
    }
}
