package com.geopictures.models.pojos;

import lombok.*;

import java.math.BigDecimal;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Coordonnees {

    public final static int RAYON_TERRE = 6378137;

    private BigDecimal longitude;
    private BigDecimal latitude;

    public static Double getDistanceEnMetre(Coordonnees c1, Coordonnees c2) {
        BigDecimal longitude1 = c1.getLongitude();
        BigDecimal longitude2 = c2.getLongitude();
        BigDecimal latitude1 = c1.getLatitude();
        BigDecimal latitude2 = c2.getLatitude();

        return Math.abs(RAYON_TERRE * (
                Math.acos(
                        (
                                Math.sin(latitude1.doubleValue()) * Math.sin(latitude2.doubleValue())
                        )
                        +
                        (
                                Math.cos(latitude1.doubleValue()) * Math.cos(latitude2.doubleValue()) * Math.cos(longitude2.doubleValue() - longitude1.doubleValue())
                        )
                )
        ));
    }
}
