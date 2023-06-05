package com.geopictures.models.dtos.titre;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TitreDTO {
    private Long id;
    private String libelle;
}
