package com.geopictures.models.dtos.boutique;

import com.geopictures.models.dtos.enums.TypeAchatBoutique;
import lombok.*;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AchatBoutiqueRequest {
    @Enumerated(EnumType.STRING)
    private TypeAchatBoutique typeAchatBoutique;
    private Long boutiqueId;
}
