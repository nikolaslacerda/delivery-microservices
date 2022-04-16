package com.server.apigateway.config;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;
import org.springframework.security.oauth2.provider.token.store.JwtTokenStore;

@Configuration
@EnableResourceServer
class OAuthSecurityConfig extends ResourceServerConfigurerAdapter {

    @Value("${jwt.secret}")
    private String jwtSecret;

    private static final String[] PUBLIC = {"/oauth", "/restaurants/**", "/cuisine-types/**", "/payment-methods/**"};
    private static final String[] CUSTOMER = {"/oauth", "/orders/**"};
    private static final String[] PARTNER = {"/partner/**"};

    @Override
    public void configure(ResourceServerSecurityConfigurer resources) throws Exception {
        resources.tokenStore(tokenStore());
    }

    @Override
    public void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .antMatchers("/actuator/**").permitAll()
                .antMatchers(PUBLIC).permitAll()
                .antMatchers(CUSTOMER).hasRole("CUSTOMER")
                .antMatchers(PARTNER).hasRole("PARTNER")
                .anyRequest().authenticated()
                .and().cors()
                .and().csrf().disable()
                .formLogin().disable()
                .httpBasic().disable();
    }

    @Bean
    public TokenStore tokenStore() {
        return new JwtTokenStore(accessTokenConverter());
    }

    @Bean
    public JwtAccessTokenConverter accessTokenConverter() {
        final JwtAccessTokenConverter converter = new JwtAccessTokenConverter();
        converter.setSigningKey(jwtSecret);
        return converter;
    }
}
