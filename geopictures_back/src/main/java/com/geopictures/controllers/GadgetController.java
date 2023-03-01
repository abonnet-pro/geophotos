package com.geopictures.controllers;

import com.geopictures.models.dtos.gadget.GadgetByTypeDTO;
import com.geopictures.models.dtos.gadget.GadgetRequest;
import com.geopictures.models.dtos.gadget.GadgetRequestLocation;
import com.geopictures.services.GadgetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("gadgets")
public class GadgetController {

    @Autowired
    private GadgetService gadgetService;

    @PostMapping ("/nombre")
    public GadgetByTypeDTO getGadgetByType(@RequestBody GadgetRequest gadgetRequest) throws Exception {
        return gadgetService.gadgetByType(gadgetRequest);
    }

    @PostMapping ("/nombre/location")
    public GadgetByTypeDTO getGadgetByType(@RequestBody GadgetRequestLocation gadgetRequest) throws Exception {
        return gadgetService.gadgetByTypeLocation(gadgetRequest);
    }

    @PostMapping("/utilisation")
    public GadgetByTypeDTO utiliseGadget(@RequestBody GadgetRequest gadgetRequest) throws Exception {
        return gadgetService.utiliseGadget(gadgetRequest);
    }

    @PostMapping("/utilisation/location")
    public GadgetByTypeDTO utiliseGadget(@RequestBody GadgetRequestLocation gadgetRequest) throws Exception {
        return gadgetService.utiliseGadgetLocation(gadgetRequest);
    }
}
