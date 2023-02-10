package com.geopictures.services;

import com.geopictures.models.entities.Photo;
import com.geopictures.models.entities.Region;
import com.geopictures.models.entities.Zone;
import com.geopictures.repositories.PhotoRepository;
import com.geopictures.repositories.ZoneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PhotoService {

    @Autowired
    private ZoneRepository zoneRepository;

    @Autowired
    private PhotoRepository photoRepository;

    public List<Photo> getAllPhotosByZone(Long id) throws Exception {
        Optional<Zone> zoneOpt = zoneRepository.findById(id);
        if(!zoneOpt.isPresent()) {
            throw new Exception("Zone invalide");
        }

        return photoRepository.findAllByZone(zoneOpt.get());
    }
}
