package com.geopictures.seeder;

import com.geopictures.models.entities.Region;
import com.geopictures.models.entities.Zone;
import com.geopictures.models.enums.RegionCode;
import com.geopictures.repositories.RegionRepository;
import com.geopictures.repositories.ZoneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class ZoneDataLoader implements CommandLineRunner {

    @Autowired
    private RegionRepository regionRepository;

    @Autowired
    private ZoneRepository zoneRepository;

    @Override
    public void run(String... args) {
        if(zoneRepository.count() == 0) {
            initZones();
        }
    }

    private void initZones() {
        Region region = regionRepository.findByCode(RegionCode.PROVENCE_ALPE_COTE_AZUR.getCode());

        Zone zone1 = Zone.builder()
                .libelle("Marseille")
                .image("zone/marseille.jpg")
                .region(region)
                .build();

        zoneRepository.save(zone1);

        Zone zone2 = Zone.builder()
                .libelle("Esimed")
                .image("zone/esimed.png")
                .region(region)
                .build();

        zoneRepository.save(zone2);

        Zone zone3 = Zone.builder()
                .libelle("Nice")
                .region(region)
                .build();

        zoneRepository.save(zone3);
    }
}
