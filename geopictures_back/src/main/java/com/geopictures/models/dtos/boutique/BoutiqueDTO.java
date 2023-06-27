package com.geopictures.models.dtos.boutique;

import lombok.*;

import java.util.List;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BoutiqueDTO {
    private List<BordureBoutiqueDTO> borduresBoutique;
    private List<TitreBoutiqueDTO> titresBoutique;
    private List<GadgetBoutiqueDTO> gadgtesBoutique;
    private List<AvatarBoutiqueDTO> avatarsBoutique;
}
