package com.geopictures.models.dtos.classement;

import java.util.List;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClassementDTO {
    List<ClassementLigneDTO> classement;
}
