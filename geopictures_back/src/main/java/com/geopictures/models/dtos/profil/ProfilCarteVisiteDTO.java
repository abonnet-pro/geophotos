package com.geopictures.models.dtos.profil;

import com.geopictures.models.dtos.avatar.AvatarDTO;
import com.geopictures.models.dtos.bordure.BordureDTO;
import com.geopictures.models.dtos.titre.TitreDTO;
import lombok.*;

import java.util.List;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProfilCarteVisiteDTO {
    private String nom;
    private int niveau;
    private AvatarDTO avatarActif;
    private BordureDTO bordureActive;
    private TitreDTO titreActif;
}
