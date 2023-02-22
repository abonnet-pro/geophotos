package com.geopictures.configurations;

import com.geopictures.securities.JWTAuthorizationFilter;
import com.geopictures.services.IUtilisateurService;
import com.geopictures.services.JwtService;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(
        securedEnabled = true,
        jsr250Enabled = true,
        prePostEnabled = true
)
class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    private final IUtilisateurService utilisateurService;

    private final JwtService jwtService;

    public SecurityConfiguration(IUtilisateurService utilisateurService, JwtService jwtService)
    {
        this.utilisateurService = utilisateurService;
        this.jwtService = jwtService;
    }

    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .csrf().disable()
                .cors().disable()
                .authorizeRequests()
                .antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                .antMatchers("/authentification/**").permitAll()
                .antMatchers("/avatar/free").permitAll()
                .antMatchers("/images/**").permitAll()
                .antMatchers("/photos/**").permitAll()
                .anyRequest().authenticated()
                .and()
                .addFilter(new JWTAuthorizationFilter(authenticationManager(), utilisateurService, jwtService))
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    }
}