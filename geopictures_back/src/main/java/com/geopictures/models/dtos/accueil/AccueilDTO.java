package com.geopictures.models.dtos.joueur;

import com.geopictures.models.dtos.avatar.AvatarDTO;
import com.geopictures.models.dtos.utilisateur.UtilisateurDTO;
import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class JoueurDTO {
    private Long id;
    private String nom;
    private int niveau;
    private int experience;
    private int prochainNiveau;
    private int pointsBoutique;
    private AvatarDTO avatarActif;
}
