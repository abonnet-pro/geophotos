package com.geopictures.controllers;

import com.geopictures.models.dtos.avatar.AvatarDTO;
import com.geopictures.models.mappers.AvatarMapper;
import com.geopictures.services.AvatarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("avatar")
public class AvatarController {

    @Autowired
    private AvatarService avatarService;

    @GetMapping("free")
    public List<AvatarDTO> getAllAvatarFree() {
        return avatarService.getAllAvatarFree().stream().map(AvatarMapper.INSTANCE::avatarToDto).collect(Collectors.toList());
    }
}
