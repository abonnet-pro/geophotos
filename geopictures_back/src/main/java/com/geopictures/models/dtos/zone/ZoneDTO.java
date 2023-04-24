package com.geopictures.models.dtos.zone;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ZoneDTO {
    private Long id;
    private String regionCode;
    private String libelle;
    private String image;
    private Long nombrePhotosDisponibles;
    private Long nombrePhotosJoues;
}
