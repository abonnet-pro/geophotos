package com.geopictures.models.dtos.boutique;

import lombok.*;


@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AvatarBoutiqueDTO {
    private Long boutiqueId;
    private Long avatarId;
    private String image;
    private Integer prix;
    private boolean possede;
}
