package com.geopictures.securities;

import com.geopictures.models.entities.Utilisateur;
import com.geopictures.services.IUtilisateurService;
import com.geopictures.services.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class JWTAuthorizationFilter extends BasicAuthenticationFilter {

    public static final String HEADER_STRING = "Authorization";
    public static final String TOKEN_PREFIX = "Bearer ";

    private final IUtilisateurService utilisateurService;

    private final JwtService jwtService;

    public JWTAuthorizationFilter(AuthenticationManager authManager, IUtilisateurService utilisateurService, JwtService jwtService) {
        super(authManager);
        this.utilisateurService = utilisateurService;
        this.jwtService = jwtService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest req,
                                    HttpServletResponse res,
                                    FilterChain chain) throws IOException, ServletException {
        String header = req.getHeader(HEADER_STRING);

        if (header == null || !header.startsWith(TOKEN_PREFIX)) {
            chain.doFilter(req, res);
            return;
        }

        UsernamePasswordAuthenticationToken authentication = getAuthentication(req);

        SecurityContextHolder.getContext().setAuthentication(authentication);
        chain.doFilter(req, res);
    }

    private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request) {
        String token = request.getHeader(HEADER_STRING);

        if (token != null) {
            String nom = jwtService.getNomByToken(token);

            if (nom != null) {
                Utilisateur utilisateur = utilisateurService.getByNom(nom);

                if(!utilisateur.isActif()) {
                    return null;
                }

                List<GrantedAuthority> grantedAuths = new ArrayList<>();
                grantedAuths.add(new SimpleGrantedAuthority("ROLE_" + utilisateur.getRole().getRole()));
                return new UsernamePasswordAuthenticationToken(utilisateur, null, grantedAuths);
            }

            return null;
        }

        return null;
    }
}
