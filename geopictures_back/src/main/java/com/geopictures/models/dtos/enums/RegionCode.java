package com.geopictures.models.dtos.enums;

public enum RegionCode {
    HAUT_DE_FRANCE("HDF"),
    GRAND_EST("GE"),
    ILE_DE_FRANCE("IDF"),
    NORMANDIE ("NOR"),
    BRETAGNE("BRE"),
    PAYS_DE_LA_LOIRE("PDL"),
    CENTRE_VAL_DE_LOIRE("CVL"),
    BOURGOGNE_FRANCHE_COMTE("BFC"),
    AUVERGNE_RHONE_ALPES("ARA"),
    NOUVELLE_AQUITAINE("NAQ"),
    OCCITANIE("OCC"),
    PROVENCE_ALPE_COTE_AZUR("PACA"),
    CORSE("COR");

    private String code;

    RegionCode(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }
}
