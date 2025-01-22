package mesbiens.security;

import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import jakarta.servlet.http.HttpServletRequest;
import java.util.Base64;
import java.util.Date;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

@Component
public class JwtTokenProvider {

    private SecretKey key;  // 'key' 필드로 이름을 통일
    private final long validityInMilliseconds = 3600000; // 1시간 (밀리초)
    private final UserDetailsService userDetailsService;

    // UserDetailsService 주입을 위한 생성자
    public JwtTokenProvider(@Value("${jwt.secretKey}") String secretKeyBase64, UserDetailsService userDetailsService) {
        // Base64 URL-safe 디코더로 변경
        byte[] decodedKey = Base64.getUrlDecoder().decode(secretKeyBase64);  // URL-safe Base64 디코딩 사용
        
        // 키 길이가 256비트(32바이트)가 아닌 경우 예외 처리
        if (decodedKey.length != 32) {
            throw new IllegalArgumentException("The secret key must be 256 bits (32 bytes).");
        }
        
        this.key = new SecretKeySpec(decodedKey, 0, decodedKey.length, "HmacSHA256");
        this.userDetailsService = userDetailsService;
    }

    // 토큰 생성
    public String createToken(String memberId, String role) {
        Claims claims = Jwts.claims().setSubject(memberId);
        claims.put("role", role);

        Date now = new Date();
        Date validity = new Date(now.getTime() + validityInMilliseconds);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(key, SignatureAlgorithm.HS256)  // 'key'를 사용하도록 수정
                .compact();
    }

    // 토큰에서 사용자 ID 추출
    public String getMemberId(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)  // 'key'를 사용하도록 수정
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    // 토큰 유효성 검증
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                .setSigningKey(key)  // 'key'를 사용하도록 수정
                .build()
                .parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            System.err.println("Token validation failed: " + e.getMessage());
            return false;
        }
    }

    // HTTP 요청에서 Authorization 헤더에서 토큰 추출
    public String getTokenFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7); // "Bearer " 이후의 토큰 반환
        }
        return null;
    }

    // Authentication 객체 생성
    public Authentication getAuthentication(String token) {
        String memberId = getMemberId(token); // 토큰에서 사용자 ID 추출
        UserDetails userDetails = userDetailsService.loadUserByUsername(memberId); // UserDetailsService를 통해 사용자 정보 로드
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }
    
}