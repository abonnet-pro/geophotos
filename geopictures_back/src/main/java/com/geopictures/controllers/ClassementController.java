package com.geopictures.controllers;

import com.geopictures.models.dtos.avatar.AvatarDTO;
import com.geopictures.models.dtos.classement.ClassementDTO;
import com.geopictures.models.mappers.AvatarMapper;
import com.geopictures.services.ClassementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("classement")
public class ClassementController {

    @Autowired
    private ClassementService classementService;

    @GetMapping()
    public ClassementDTO getClassementGeneral(@RequestParam(required = false, name = "zoneId") Long zoneId, @RequestParam(required = false, name = "codeRegion") String codeRegion) throws Exception {
        return classementService.getClassementGeneral(zoneId, codeRegion);
    }
}
