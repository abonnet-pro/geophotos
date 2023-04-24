package com.geopictures.models.dtos.photo;

import com.geopictures.models.enums.Difficulte;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PhotoDTO {
    private Long id;
    private Long zoneId;
    private String regionCode;
    private String image;
    private String imageJouee;
    private Difficulte difficulte;
    private LocalDateTime datePublication;
    private String titulaire;
    private String titre;
    private BigDecimal score;
    private Boolean succesGps;
    private Boolean succesGlobale;
}
