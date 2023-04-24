package com.geopictures.models.dtos.gadget;

import com.geopictures.models.enums.GadgetCode;
import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GadgetByTypeDTO {
    private GadgetCode code;
    private String libelle;
    private Integer quantite;
    private String reponse;
}
