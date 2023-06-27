package com.geopictures.models.enums;

public enum GadgetCode {
    GPS("GPS"),
    DISTANCE("DISTANCE"),
    DIRECTION("DIRECTION"),
    TOP_1("TOP_1"),
    SUCCESS_ZONE("SUCCESS_ZONE"),
    INDICE("INDICE"),
    RECOMMENCER("RECOMMENCER");

    private String code;

    GadgetCode(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }
}
