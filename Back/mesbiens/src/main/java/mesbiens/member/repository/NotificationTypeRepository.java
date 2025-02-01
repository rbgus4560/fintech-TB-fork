package mesbiens.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import mesbiens.member.vo.NotificationType;

public interface NotificationTypeRepository extends JpaRepository<NotificationType, Integer> {
    NotificationType findByTypeName(String typeName); // 유형 이름으로 알림 유형 조회
}
