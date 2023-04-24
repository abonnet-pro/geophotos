package com.geopictures.services;

import com.geopictures.models.entities.Avatar;
import com.geopictures.repositories.AvatarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AvatarService {

    @Autowired
    private AvatarRepository avatarRepository;

    public List<Avatar> getAllAvatarFree() {
        return avatarRepository.findAllByFree(true);
    }
}
