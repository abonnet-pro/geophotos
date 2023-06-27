package com.geopictures.models.dtos.boutique;

import lombok.*;


@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TitreBoutiqueDTO {
    private Long boutiqueId;
    private Long titreId;
    private String libelle;
    private Integer prix;
    private boolean possede;
}
