package mesbiens.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;

    public JwtAuthenticationFilter(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String token = jwtTokenProvider.getTokenFromRequest(request);

        if (token != null && jwtTokenProvider.validateToken(token)) {
            String memberId = jwtTokenProvider.getMemberId(token);
            // SecurityContext에 사용자 정보 설정
            SecurityContextHolder.getContext().setAuthentication(
                    jwtTokenProvider.getAuthentication(memberId)
            );
        }

        filterChain.doFilter(request, response);
    }
    
}
