package com.geopictures.models.dtos.collaboration;

import com.geopictures.models.dtos.enums.EtatDemande;
import com.geopictures.models.dtos.enums.TypeDemande;
import lombok.*;

import java.util.Date;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DemandeDTO {
    private Long id;
    private Date dateDemande;
    private EtatDemande etatDemande;
    private String libelle;
    private TypeDemande typeDemande;
    private String image;
    private String commentaire;
    private String indice;
    private String nomJoueur;
    private String zone;
    private String region;
}
