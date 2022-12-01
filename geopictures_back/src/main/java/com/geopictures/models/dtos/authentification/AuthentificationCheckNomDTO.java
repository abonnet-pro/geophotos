package com.geopictures.models.dtos.authentification;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AuthentificationCheckNomDTO {
    private String nom;
    private boolean available;
}
