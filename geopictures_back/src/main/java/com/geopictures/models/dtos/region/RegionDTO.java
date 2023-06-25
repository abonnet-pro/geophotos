package com.geopictures.models.dtos.region;

import com.geopictures.models.dtos.avatar.AvatarDTO;
import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RegionDTO {
    private String libelle;
    private String code;
}
