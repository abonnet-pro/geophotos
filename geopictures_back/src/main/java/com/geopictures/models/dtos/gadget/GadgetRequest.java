package com.geopictures.models.dtos.gadget;

import com.geopictures.models.enums.GadgetCode;
import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GadgetRequest {
    private GadgetCode code;
    private Long photoId;
}
