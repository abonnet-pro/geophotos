package com.geopictures.services;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import static com.geopictures.securities.JWTAuthorizationFilter.TOKEN_PREFIX;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secret;

    public String generateToken(String email) {
        return JWT.create()
                .withSubject(email)
                .sign(Algorithm.HMAC512(secret));
    }

    public String getEmailByToken(String token) {
        return JWT.require(Algorithm.HMAC512(secret))
                .build()
                .verify(token.replace(TOKEN_PREFIX, ""))
                .getSubject();
    }
}
