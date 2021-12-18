package com.server.deliveryrestaurantservice.security;

import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    //private JwtAuthenticationFilter jwtAuthenticationFilter;
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .cors()
                .and().csrf().disable().antMatcher("restaurants/**")
                .formLogin().disable()
                .httpBasic().disable()
                .authorizeRequests()
                .antMatchers("/restaurants/**", "/orders/**", "/payments/**", "/restaurants-with-distance/**").permitAll()
                .antMatchers("/socket/**").permitAll()
                .antMatchers("/auth/**").permitAll()
                .antMatchers("/actuator/**").permitAll()
                .antMatchers(HttpMethod.POST, "/partners/restaurants").permitAll()
                .antMatchers("/partners/restaurants/user/{username}").access("@restaurantAuthorizationService.checaUserId(authentication,#username)")
                .antMatchers("/partners/restaurants/{restaurantId}/**").access("@restaurantAuthorizationService.checaId(authentication,#restauranteId)")
                .antMatchers("/partners/**").hasRole(Role.ROLES.PARTNER.name())
                .anyRequest().authenticated()
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                //.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint);
    }
}

