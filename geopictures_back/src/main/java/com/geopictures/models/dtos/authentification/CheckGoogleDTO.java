package com.geopictures.models.dtos.authentification;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CheckGoogleDTO {
    private String email;
    private String id;
}
