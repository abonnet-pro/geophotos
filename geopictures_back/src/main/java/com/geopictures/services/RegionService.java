package com.geopictures.services;

import com.geopictures.models.dtos.region.RegionDTO;
import com.geopictures.models.entities.Region;
import com.geopictures.models.mappers.RegionMapper;
import com.geopictures.repositories.RegionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class RegionService {

    @Autowired
    private RegionRepository regionRepo;

    public List<RegionDTO> getAllRegion() throws Exception {
        List<RegionDTO> regionAll = regionRepo.findAll().stream().map(RegionMapper.INSTANCE::regionToDto).collect(Collectors.toList());
        return regionAll;
    }
}
