package com.geopictures.models.dtos.profil;

import com.geopictures.models.dtos.avatar.AvatarDTO;
import com.geopictures.models.dtos.bordure.BordureDTO;
import com.geopictures.models.dtos.gadget.GadgetByTypeDTO;
import com.geopictures.models.dtos.gadget.MesGadgetsDTO;
import com.geopictures.models.dtos.titre.TitreDTO;
import lombok.*;

import java.util.List;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProfilDTO {
    private String nom;
    private int niveau;
    private AvatarDTO avatarActif;
    private BordureDTO bordureActive;
    private TitreDTO titreActif;
    private List<AvatarDTO> mesAvatars;
    private List<BordureDTO> mesBordures;
    private List<TitreDTO> mesTitres;
    private List<MesGadgetsDTO> mesGadgets;
}
