package com.geopictures.models.dtos.enums;

public enum Role {
    ADMIN("ADMIN"),
    JOUEUR("JOUEUR");

    private String role;
    Role(String role) {
        this.role = role;
    }

    public String getRole() {
        return role;
    }
}
