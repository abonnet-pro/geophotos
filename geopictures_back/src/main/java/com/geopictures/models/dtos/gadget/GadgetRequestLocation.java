package com.geopictures.models.dtos.gadget;

import com.geopictures.models.enums.GadgetCode;
import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GadgetRequestLocation {
    private GadgetCode code;
    private Long photoId;
    private String latitude;
    private String longitude;
}
