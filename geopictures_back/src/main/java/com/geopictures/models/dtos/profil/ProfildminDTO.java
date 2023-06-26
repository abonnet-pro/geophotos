package com.geopictures.models.dtos.profil;

import com.geopictures.models.dtos.avatar.AvatarDTO;
import com.geopictures.models.dtos.bordure.BordureDTO;
import com.geopictures.models.dtos.titre.TitreDTO;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProfildminDTO {
    private Long utilisateurId;
    private String nom;
    private int niveau;
    private AvatarDTO avatarActif;
    private BordureDTO bordureActive;
    private TitreDTO titreActif;
    private LocalDateTime dateCreation;
    private LocalDateTime dateDerniereConnexion;
    private LocalDateTime dateSuspension;
    private boolean actif;
    private String raisonSuspension;
    private boolean synchroGoogle;
}
