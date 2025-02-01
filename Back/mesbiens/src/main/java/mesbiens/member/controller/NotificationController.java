package mesbiens.member.controller;

import mesbiens.member.dto.NotificationDTO;
import mesbiens.member.service.NotificationService;
import mesbiens.member.vo.MemberVO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/notifications")
public class NotificationController {
	  private final NotificationService notificationService;

	    // Constructor
	    public NotificationController(NotificationService notificationService) {
	        this.notificationService = notificationService;
	    }

	    // 특정 회원의 알림 조회
	    @GetMapping("/member/{memberNo}")
	    public ResponseEntity<List<NotificationDTO>> getNotificationsByMember(@PathVariable(name = "memberNo") int memberNo) {
	        try {
	            MemberVO member = new MemberVO();
	            member.setMemberNo(memberNo); // 멤버 객체를 생성하여 전달
	            List<NotificationDTO> notifications = notificationService.getNotificationsByMember(member);
	            return new ResponseEntity<>(notifications, HttpStatus.OK);
	        } catch (Exception e) {
	            // 에러 처리 및 로깅 추가
	            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	        }
	    }

	    // 알림 생성
	    @PostMapping
	    public ResponseEntity<String> createNotification(@RequestBody NotificationDTO notificationDTO) {
	        // notificationMessage가 null이거나 빈 문자열일 경우 기본값 설정
	        if (notificationDTO.getNotificationMessage() == null || notificationDTO.getNotificationMessage().isEmpty()) {
	            notificationDTO.setNotificationMessage("");  // 기본값을 빈 문자열로 설정
	        }

	        // notificationType이 유효한지 체크
	        if (notificationDTO.getNotificationType() == null || !notificationService.isValidNotificationType(notificationDTO.getNotificationType())) {
	            return ResponseEntity.badRequest().body("Invalid notification type: " + notificationDTO.getNotificationType());
	        }

	        // 정상적으로 처리할 수 있는 notificationType일 경우 알림 생성
	        notificationService.createNotification(notificationDTO);
	        return ResponseEntity.ok("Notification created successfully");
	    }

	    // 알림 읽음 처리
	    @PutMapping("/{notificationNo}/read")
	    public ResponseEntity<String> markNotificationAsRead(@PathVariable(name = "notificationNo") int notificationNo) {
	        try {
	            notificationService.markNotificationAsRead(notificationNo);
	            return new ResponseEntity<>("Notification marked as read", HttpStatus.OK);
	        } catch (Exception e) {
	            // 에러 처리 및 로깅 추가
	            return new ResponseEntity<>("Failed to mark notification as read", HttpStatus.BAD_REQUEST);
	        }
	    }
	}