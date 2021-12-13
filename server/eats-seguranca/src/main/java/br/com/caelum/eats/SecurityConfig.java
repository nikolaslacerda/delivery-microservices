package br.com.caelum.eats;

import br.com.caelum.eats.seguranca.JwtAuthenticationEntryPoint;
import br.com.caelum.eats.seguranca.JwtAuthenticationFilter;
import br.com.caelum.eats.seguranca.Role;
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
class SecurityConfig extends WebSecurityConfigurerAdapter {

    private JwtAuthenticationFilter jwtAuthenticationFilter;
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .antMatchers("/restaurants/**", "/orders/**", "/pedidos/**", "/payments/**", "/restaurants-with-distance/**").permitAll()
                .antMatchers("/socket/**").permitAll()
                .antMatchers("/auth/**").permitAll()
                .antMatchers("/actuator/**").permitAll()
                .antMatchers(HttpMethod.POST, "/parceiros/restaurantes").permitAll()
                .antMatchers("/parceiros/restaurantes/do-usuario/{username}").access("@restauranteAuthorizationService.checaUsername(authentication,#username)")
                .antMatchers("/parceiros/restaurantes/{restauranteId}/**").access("@restauranteAuthorizationService.checaId(authentication,#restauranteId)")
                .antMatchers("/parceiros/**").hasRole(Role.ROLES.PARCEIRO.name())
                .anyRequest().authenticated()
                .and().cors()
                .and().csrf().disable()
                .formLogin().disable()
                .httpBasic().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint);
    }
}
