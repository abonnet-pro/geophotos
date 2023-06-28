package com.geopictures.models.dtos.boutique;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BordureBoutiqueDTO {
    private Long boutiqueId;
    private Long bordureId;
    private String image;
    private Integer prix;
    private boolean possede;
}
