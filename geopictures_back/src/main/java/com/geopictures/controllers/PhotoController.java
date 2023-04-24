package com.geopictures.controllers;

import com.geopictures.models.dtos.photo.PhotoDTO;
import com.geopictures.models.mappers.PhotoMapper;
import com.geopictures.services.PhotoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("photo")
public class PhotoController extends UtilisateurHolder {

    @Autowired
    private PhotoService photoService;

    @Autowired
    private PhotoMapper photoMapper;

    @GetMapping("zone/{id}")
    public List<PhotoDTO> getAllPhotosByZone(@PathVariable("id") Long id) throws Exception {
        return photoService.getAllPhotosByZone(id).stream().map(photo -> photoMapper.toDto(photo, utilisateur().getJoueur())).collect(Collectors.toList());
    }
}
