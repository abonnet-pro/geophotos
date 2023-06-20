package com.geopictures.models.dtos.administration;

import com.geopictures.models.enums.TypeDemande;
import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AdministrationDemandeUpdateRequest {
    private String commentaire;
    private boolean accept;
    private TypeDemande typeDemande;
    private Long demandeId;
}
