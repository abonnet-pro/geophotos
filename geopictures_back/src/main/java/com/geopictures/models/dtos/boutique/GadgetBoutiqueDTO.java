package com.geopictures.models.dtos.boutique;

import com.geopictures.models.dtos.enums.GadgetCode;
import lombok.*;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GadgetBoutiqueDTO {
    private Long boutiqueId;
    private Long gadgetId;
    @Enumerated(EnumType.STRING)
    private GadgetCode code;
    private String libelle;
    private Integer prix;
}
