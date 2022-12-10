package com.geopictures.models.dtos.avatar;

import lombok.*;


@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AvatarDTO {
    private Long id;
    private String image;
}
