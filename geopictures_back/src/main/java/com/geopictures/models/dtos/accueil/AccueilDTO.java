package com.geopictures.models.dtos.accueil;

import com.geopictures.models.dtos.avatar.AvatarDTO;
import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AccueilDTO {
    private Long id;
    private String nom;
    private int niveau;
    private int experience;
    private int prochainNiveau;
    private int pointsBoutique;
    private AvatarDTO avatarActif;
}
