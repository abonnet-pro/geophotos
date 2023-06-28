package com.geopictures.models.dtos.gadget;

import com.geopictures.models.dtos.enums.GadgetCode;
import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MesGadgetsDTO {
    private GadgetCode code;
    private String libelle;
    private Integer quantite;
}
