package mesbiens.member.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import mesbiens.member.vo.MemberVO;
import mesbiens.member.vo.NotificationVo;

public interface NotificationRepository extends JpaRepository<NotificationVo, Integer> {
    List<NotificationVo> findByMemberVo(MemberVO memberVo); // 특정 회원의 알림 조회
}