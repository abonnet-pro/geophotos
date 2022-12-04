package com.geopictures.models.dtos.utilisateur;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UtilisateurDTO {
    private Long id;
    private String nom;
    private String token;
}
