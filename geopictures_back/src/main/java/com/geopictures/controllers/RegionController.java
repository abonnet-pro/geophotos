package com.geopictures.controllers;

import com.geopictures.models.dtos.region.RegionDTO;
import com.geopictures.services.RegionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("region")
public class RegionController  {

    @Autowired
    private RegionService regionService;

    @GetMapping()
    public List<RegionDTO> getAllRegion() throws Exception {
        return regionService.getAllRegion();
    }
}
