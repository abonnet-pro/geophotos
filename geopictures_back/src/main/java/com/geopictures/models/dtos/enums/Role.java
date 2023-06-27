package com.geopictures.models.enums;

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
