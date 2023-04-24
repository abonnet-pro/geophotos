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
        double longitude1 = Math.toRadians(c1.getLongitude().doubleValue());
        double longitude2 = Math.toRadians(c2.getLongitude().doubleValue());
        double latitude1 = Math.toRadians(c1.getLatitude().doubleValue());
        double latitude2 = Math.toRadians(c2.getLatitude().doubleValue());

        return Math.abs(RAYON_TERRE * (
                Math.acos(
                        (
                                Math.sin(latitude1) * Math.sin(latitude2)
                        )
                        +
                        (
                                Math.cos(latitude1) * Math.cos(latitude2) * Math.cos(longitude2 - longitude1)
                        )
                )
        ));
    }

    public static Double getAngleParRapportNord(Coordonnees c1, Coordonnees c2) {
        double longitude1 = Math.toRadians(c1.getLongitude().doubleValue());
        double longitude2 = Math.toRadians(c2.getLongitude().doubleValue());
        double latitude1 = Math.toRadians(c1.getLatitude().doubleValue());
        double latitude2 = Math.toRadians(c2.getLatitude().doubleValue());

        double deltaAlpha = Math.log(Math.tan((latitude2 / 2) + (Math.PI / 4)) / Math.tan((latitude1 / 2) + (Math.PI / 4)));
        double deltaLon = Math.abs(longitude1 - longitude2);
        if(deltaLon > 180) {
            deltaLon = deltaLon % 180;
        }
        return Math.toDegrees(Math.atan2(deltaLon, deltaAlpha));
    }

    @Override
    public String toString() {
        return latitude + ", " + longitude;
    }
}
