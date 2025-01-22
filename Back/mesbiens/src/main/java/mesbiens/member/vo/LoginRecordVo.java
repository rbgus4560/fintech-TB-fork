package mesbiens.member.vo;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "member_login_records")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter

public class LoginRecordVo {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "login_record_seq")
    @SequenceGenerator(name = "login_record_seq", sequenceName = "member_login_records_seq", allocationSize = 1)
    @Column(name = "record_no") // 로그인 기록 ID (Primary Key)
    private int recordNo;

    @ManyToOne // 회원 ID (외래 키)
    @JoinColumn(name = "member_no", referencedColumnName = "member_no", nullable = false) // 외래 키 컬럼 설정
    private MemberVO memberNo; // MemberVo 엔티티와 연관됨 (회원 테이블과 연결)

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "mem_login_time", nullable = false) // 로그인 시각 (필수)
    private java.util.Date memberLoginTime;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "mem_logout_time") // 로그아웃 시각 (옵션)
    private java.util.Date memberLogoutTime;

    @Column(name = "mem_login_request_ip", nullable = false, length = 45) // 로그인 요청 IP 주소 (필수)
    private String memberLoginRequestIp;

    @Column(name = "mem_login_status", length = 1) // 로그인 상태 (옵션)
    private String memberLoginStatus;

    @Column(name = "member_failure_reason", length = 255) // 실패 사유 (옵션)
    private String memberFailureReason;
}