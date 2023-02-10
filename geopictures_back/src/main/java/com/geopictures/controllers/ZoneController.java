package com.geopictures.controllers;

import com.geopictures.models.dtos.avatar.AvatarDTO;
import com.geopictures.models.dtos.zone.ZoneDTO;
import com.geopictures.models.mappers.ZoneMapper;
import com.geopictures.services.ZoneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("zone")
public class ZoneController extends UtilisateurHolder {

    @Autowired
    private ZoneService zoneService;

    @Autowired
    private ZoneMapper zoneMapper;

    @GetMapping("region/{code}")
    public List<ZoneDTO> getAllZoneByRegion(@PathVariable("code") String code) throws Exception {
        return zoneService.getAllZoneByRegionCode(code).stream().map(zone -> zoneMapper.zoneToDto(zone, utilisateur().getJoueur())).collect(Collectors.toList());
    }
}
