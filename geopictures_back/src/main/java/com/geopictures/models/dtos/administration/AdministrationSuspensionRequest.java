package com.geopictures.models.dtos.administration;

import com.geopictures.models.enums.TypeDemande;
import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AdministrationSuspensionRequest {
    private Long utilisateurId;
    private boolean actif;
    private String raisonSuspension;
}
