package com.ucr.repuestos_api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.List;

@Configuration
public class CorsConfig {
    @Bean
    public CorsFilter corsFilter() {

        CorsConfiguration config = new CorsConfiguration();

        // allowedOriginPatterns permite comodines (*) y es compatible con
        // allowCredentials(true), a diferencia de allowedOrigins("*").
        // Cubre los puertos de desarrollo local y cualquier despliegue en Vercel
        // (producción y previews: https://<lo-que-sea>.vercel.app).
        config.setAllowedOriginPatterns(
                List.of(
                        "http://localhost:5173",
                        "http://localhost:3000",
                        "https://*.vercel.app"
                )
        );

        config.setAllowedMethods(
                List.of(
                        "GET",
                        "POST",
                        "PUT",
                        "DELETE",
                        "PATCH",
                        "OPTIONS"
                )
        );

        config.setAllowedHeaders(List.of("*"));

        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", config);

        return new CorsFilter(source);
    }
}
