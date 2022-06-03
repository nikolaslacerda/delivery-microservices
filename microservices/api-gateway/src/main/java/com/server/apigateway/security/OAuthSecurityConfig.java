package com.server.apigateway.security;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.expression.OAuth2WebSecurityExpressionHandler;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;
import org.springframework.security.oauth2.provider.token.store.JwtTokenStore;

@Configuration
@EnableResourceServer
@EnableGlobalMethodSecurity(prePostEnabled = true)
class OAuthSecurityConfig extends ResourceServerConfigurerAdapter {

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Autowired
    private OAuth2WebSecurityExpressionHandler expressionHandler;

    private static final String[] PUBLIC = {"/socket/**", "/oauth/**", "/restaurants/**", "/cuisine-types/**", "/payment-methods/**"};
    private static final String[] CUSTOMER = {"/orders/**"};
    private static final String[] PARTNER = {"/partners/**"};

    @Override
    public void configure(ResourceServerSecurityConfigurer resources) throws Exception {
        resources.tokenStore(tokenStore());
        resources.expressionHandler(expressionHandler);
    }

    @Override
    public void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .antMatchers("/actuator/**").permitAll()
                .antMatchers(PUBLIC).permitAll()
                .antMatchers(CUSTOMER).hasRole("CUSTOMER")
                .antMatchers(PARTNER).hasRole("PARTNER")
                .antMatchers("/partners/restaurants/{restaurantId}/**")
                .access("@authorizationService.validateRestaurantId(authentication,#restaurantId)")
                .anyRequest().authenticated()
                .and()
                .exceptionHandling()
                .accessDeniedHandler(accessDeniedHandler())
                .authenticationEntryPoint(authenticationEntryPoint())
                .and().cors()
                .and().csrf().disable()
                .formLogin().disable()
                .httpBasic().disable();
    }

    @Bean
    public OAuth2WebSecurityExpressionHandler oAuth2WebSecurityExpressionHandler(ApplicationContext applicationContext) {
        OAuth2WebSecurityExpressionHandler expressionHandler = new OAuth2WebSecurityExpressionHandler();
        expressionHandler.setApplicationContext(applicationContext);
        return expressionHandler;
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

    @Bean
    OAuthAccessDeniedHandler accessDeniedHandler() {
        return new OAuthAccessDeniedHandler();
    }

    @Bean
    OAuthAuthenticationEntryPoint authenticationEntryPoint() {
        return new OAuthAuthenticationEntryPoint();
    }


}
