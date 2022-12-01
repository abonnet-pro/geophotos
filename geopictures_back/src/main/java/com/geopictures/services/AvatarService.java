package com.geopictures.services;

import com.geopictures.models.entities.Avatar;
import com.geopictures.repositories.AvatarRepository;
import org.apache.catalina.core.ApplicationContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.rmi.server.ExportException;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AvatarService {

    @Autowired
    private ResourceLoader resourceLoader;

    @Autowired
    private AvatarRepository avatarRepository;

    public List<Avatar> getAllAvatarFree() {
        return avatarRepository.findAllByFree(true);
    }
}
