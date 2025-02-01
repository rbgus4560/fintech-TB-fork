package mesbiens.member.service;

import mesbiens.member.dto.NotificationDTO;
import mesbiens.member.repository.MemberRepository;
import mesbiens.member.repository.NotificationRepository;
import mesbiens.member.repository.NotificationTypeRepository;
import mesbiens.member.vo.MemberVO;
import mesbiens.member.vo.NotificationVo;
import mesbiens.member.vo.NotificationType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class NotificationService {

	 @Autowired
	    private NotificationRepository notificationRepository;

	    @Autowired
	    private NotificationTypeRepository notificationTypeRepository;

	    @Autowired
	    private MemberRepository memberRepository;

	    public void createNotification(NotificationDTO notificationDTO) {
	        // 1. NotificationType 객체 가져오기
	        NotificationType notificationType = notificationTypeRepository.findByTypeName(notificationDTO.getNotificationType());

	        // 2. NotificationType이 null이면 기본값 설정
	        if (notificationType == null) {
	            // 기본값 설정 예시: "INFO"
	            notificationType = notificationTypeRepository.findByTypeName("INFO");
	            if (notificationType == null) {
	                // 만약 기본값도 존재하지 않는 경우 예외 처리
	                throw new IllegalArgumentException("Default notification type INFO not found");
	            }
	           
	        }

	        // 3. Member 객체 가져오기
	        MemberVO memberVo = memberRepository.findById(notificationDTO.getMemberNo())
	                .orElseThrow(() -> new RuntimeException("Member not found"));

	        // 4. NotificationVo 객체 생성
	        NotificationVo notificationVo = new NotificationVo();
	        notificationVo.setMemberVo(memberVo);
	        notificationVo.setNotificationType(notificationType);  // NotificationType 설정
	        notificationVo.setNotificationMessage(notificationDTO.getNotificationMessage());
	        notificationVo.setNotificationCreateDate(new Date());  // 알림 생성일을 현재로 설정
	        notificationVo.setNotificationReadStatus("N");  // 읽지 않음 상태로 설정

	        // 5. NTFC_TITLE 필드에 값 설정 (DTO에서 전달된 값을 사용)
	        notificationVo.setNotificationTitle(notificationDTO.getNotificationTitle());  // 제목 필드 추가

	        // 6. NotificationVo 저장
	        notificationRepository.save(notificationVo);  // `notificationNo`는 자동으로 증가되므로 따로 설정할 필요 없음
	    }

	    // 회원별 알림 조회
	    public List<NotificationDTO> getNotificationsByMember(MemberVO member) {
	        List<NotificationVo> notifications = notificationRepository.findByMemberVo(member);
	        return notifications.stream().map(this::convertToDto).collect(Collectors.toList());
	    }

	    // 알림 읽음 처리
	    public void markNotificationAsRead(int notificationNo) {
	        NotificationVo notification = notificationRepository.findById(notificationNo)
	                .orElseThrow(() -> new IllegalArgumentException("Notification not found"));
	        notification.setNotificationReadStatus("Y");  // 또는 Enum을 사용하여 개선 가능
	        notificationRepository.save(notification);
	    }

	    // VO -> DTO 변환
	    private NotificationDTO convertToDto(NotificationVo notification) {
	        NotificationDTO dto = new NotificationDTO();
	        dto.setNotificationNo(notification.getNotificationNo());
	        dto.setMemberNo(notification.getMemberVo().getMemberNo());
	        dto.setNotificationType(notification.getNotificationType().getTypeName());
	        dto.setNotificationMessage(notification.getNotificationMessage());
	        dto.setNotificationReadStatus(notification.getNotificationReadStatus());
	        dto.setNotificationCreateDate(notification.getNotificationCreateDate());
	        return dto;
	    }

	    // 알림 타입 검증 메소드
	    public boolean isValidNotificationType(String notificationType) {
	        List<String> validTypes = Arrays.asList("INFO", "SYSTEM", "PROMOTION");
	        return validTypes.contains(notificationType);
	    }
	}