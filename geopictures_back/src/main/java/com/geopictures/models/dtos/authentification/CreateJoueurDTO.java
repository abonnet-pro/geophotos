package com.geopictures.models.dtos.authentification;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateJoueurDTO {
    private String nom;
    private Long avatarId;
}
