package com.geopictures.services;

import com.geopictures.models.entities.Region;
import com.geopictures.models.entities.Zone;
import com.geopictures.repositories.RegionRepository;
import com.geopictures.repositories.ZoneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ZoneService {

    @Autowired
    private RegionRepository regionRepository;

    @Autowired
    private ZoneRepository zoneRepository;

    public List<Zone> getAllZoneByRegionCode(String code) throws Exception {
        Region region = regionRepository.findByCode(code);
        if(region == null) {
            throw new Exception("Region invalide");
        }

        return zoneRepository.findAllByRegion(region);
    }
}
