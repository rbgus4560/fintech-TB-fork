package mesbiens.member.service;

import org.springframework.stereotype.Service;

import mesbiens.member.repository.LoginRecordRepository;
import mesbiens.member.vo.LoginRecordVo;
import mesbiens.member.vo.MemberVO;

@Service
public class LoginRecordService {

    private final LoginRecordRepository loginRecordRepository;

    public LoginRecordService(LoginRecordRepository loginRecordRepository) {
        this.loginRecordRepository = loginRecordRepository;
    }

    // 로그인 기록 저장
    public void saveLoginRecord(MemberVO member, String requestIp, String status, String failureReason) {
        LoginRecordVo loginRecord = new LoginRecordVo();
        loginRecord.setMemberNo(member); // 회원 정보 연결 (null 가능: 실패 시 사용)
        loginRecord.setMemberLoginTime(new java.util.Date()); // 현재 시간
        loginRecord.setMemberLoginRequestIp(requestIp); // 요청 IP 주소 저장
        loginRecord.setMemberLoginStatus(status); // 상태: S(성공), F(실패)
        loginRecord.setMemberFailureReason(failureReason); // 실패 사유 저장

        loginRecordRepository.save(loginRecord); // 기록 DB에 저장
    }

    // 로그아웃 처리
    public void logout(int recordNo) {
        LoginRecordVo loginRecord = loginRecordRepository.findById(recordNo)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 로그인 기록입니다."));
        
        loginRecord.setMemberLogoutTime(new java.util.Date()); // 현재 시간으로 로그아웃 시간 설정
        loginRecord.setMemberLoginStatus("L"); // 로그인 상태를 'L' (로그아웃)으로 변경
        loginRecordRepository.save(loginRecord); // 로그인 기록 업데이트
    }
}
