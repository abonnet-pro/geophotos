package com.geopictures.models.pojo;

import lombok.*;

import java.math.BigDecimal;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Coordonnees {
    private BigDecimal latitude;
    private BigDecimal longitude;
}
