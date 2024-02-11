package com.hesshes.boardback.filter;

import java.io.IOException;

import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.hesshes.boardback.provider.JwtProvider;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtProvider jwtProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

    }

    private String parseBearerToken(HttpServletRequest req) {
        String autorization = req.getHeader("Authorization");

        boolean hasAuthorization = StringUtils.hasText(autorization);

        if (!hasAuthorization)
            return null;

        boolean isBearer = autorization.startsWith("Bearer ");

        if (!isBearer)
            return null;

        String token = autorization.substring(7);

        return token;
    }
}
