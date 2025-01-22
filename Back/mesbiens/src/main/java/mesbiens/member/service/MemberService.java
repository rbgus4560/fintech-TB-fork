package mesbiens.member.service;

import mesbiens.member.dto.MemberDTO;
import mesbiens.member.dto.MemberResponseDTO;
import mesbiens.member.repository.MemberRepository;
import mesbiens.member.vo.MemberVO;
import mesbiens.security.JwtTokenProvider;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MemberService {

    private final MemberRepository memberRepository;
    private final LoginRecordService loginRecordService; // 로그인 기록 처리 서비스
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    public MemberService(
        MemberRepository memberRepository,
        LoginRecordService loginRecordService, // 로그인 기록 서비스 주입
        PasswordEncoder passwordEncoder,
        JwtTokenProvider jwtTokenProvider
    ) {
        this.memberRepository = memberRepository;
        this.loginRecordService = loginRecordService;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    // 사용자 등록
    public MemberResponseDTO registerMember(MemberDTO memberDTO) {
        // 이메일 또는 ID 중복 확인
        if (memberRepository.findByMemberEmail(memberDTO.getMemberEmail()).isPresent() ||
            memberRepository.findByMemberId(memberDTO.getMemberId()).isPresent()) {
            throw new IllegalArgumentException("이미 존재하는 이메일 또는 ID입니다.");
        }

        // DTO -> 엔티티 변환
        MemberVO member = new MemberVO();
        member.setMemberName(memberDTO.getMemberName());
        member.setMemberEmail(memberDTO.getMemberEmail());
        member.setMemberId(memberDTO.getMemberId());
        member.setMemberPassword(passwordEncoder.encode(memberDTO.getMemberPassword()));
        member.setMemberPhone(memberDTO.getMemberPhone());
        member.setMemberAddress(memberDTO.getMemberAddress());
        member.setMemberBirth(memberDTO.getMemberBirth());
        member.setMemberSnsSignUpYN("N"); // 기본값

        MemberVO savedMember = memberRepository.save(member);

        // 엔티티 -> 응답 DTO 변환
        return toResponseDTO(savedMember);
    }

    // 로그인 처리 (로그인 기록 추가)
    public String login(String memberId, String password, String requestIp) {
        Optional<MemberVO> optionalMember = memberRepository.findByMemberId(memberId);

        // 사용자 ID 확인
        if (optionalMember.isEmpty()) {
            // 로그인 실패 기록 저장
            loginRecordService.saveLoginRecord(null, requestIp, "F", "존재하지 않는 사용자 ID");
            throw new IllegalArgumentException("존재하지 않는 사용자 ID입니다.");
        }

        MemberVO member = optionalMember.get();

        // 비밀번호 확인
        if (!passwordEncoder.matches(password, member.getMemberPassword())) {
            // 로그인 실패 기록 저장
            loginRecordService.saveLoginRecord(member, requestIp, "F", "비밀번호가 일치하지 않습니다.");
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        // 로그인 성공 기록 저장
        loginRecordService.saveLoginRecord(member, requestIp, "S", null);

        // JWT 토큰 생성 및 반환
        return jwtTokenProvider.createToken(member.getMemberId(), "USER");
    }

    // 로그아웃 처리 (로그아웃 시간 업데이트)
    public void logout(int recordNo) {
        loginRecordService.logout(recordNo); // 로그인 기록 서비스로 로그아웃 처리
    }

    // 사용자 정보 조회 (id를 String으로 처리)
    public MemberResponseDTO findById(String memberId) {
        // memberId를 기준으로 조회
        MemberVO member = memberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));

        return toResponseDTO(member);
    }

    // DTO 변환 메소드
    private MemberResponseDTO toResponseDTO(MemberVO member) {
        MemberResponseDTO responseDTO = new MemberResponseDTO();
        responseDTO.setMemberNo(member.getMemberNo());
        responseDTO.setMemberName(member.getMemberName());
        responseDTO.setMemberEmail(member.getMemberEmail());
        responseDTO.setMemberId(member.getMemberId());
        responseDTO.setMemberPhone(member.getMemberPhone());
        responseDTO.setMemberAddress(member.getMemberAddress());
        responseDTO.setMemberBirth(member.getMemberBirth());
        responseDTO.setMemberProfile(member.getMemberProfile());
        responseDTO.setMemberSnsSignUpYN(member.getMemberSnsSignUpYN());
        return responseDTO;
    }
}
