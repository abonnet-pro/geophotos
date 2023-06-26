package com.geopictures.models.dtos.collaboration;

import lombok.*;

import java.util.List;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DemandesDTO {
    private List<DemandeDTO> mesDemandes;
}
