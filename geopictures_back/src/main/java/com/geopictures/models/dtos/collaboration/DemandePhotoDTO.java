package com.geopictures.models.dtos.collaboration;

import com.geopictures.models.enums.Difficulte;
import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DemandePhotoDTO {
    private Long zoneId;
    private Difficulte difficulte;
    private String titre;
    private String indice;
    private String latitude;
    private String longitude;
}
