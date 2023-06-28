package com.geopictures.models.dtos.classement;

import com.geopictures.models.dtos.avatar.AvatarDTO;
import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClassementLigneDTO {
    private Long utilisateurId;
    private String joueurNom;
    private Double score;
    private AvatarDTO avatar;
}
