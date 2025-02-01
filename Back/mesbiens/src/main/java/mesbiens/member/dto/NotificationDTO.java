package mesbiens.member.dto;
import java.util.Date;

//응답을 처리할 때 사용
import lombok.Data;



@Data
public class NotificationDTO {
    private int notificationNo;
    private int memberNo;
    
    
    private String notificationTitle; // 알림 제목
    private String notificationType; // 유형 이름
    private String notificationMessage;
    private String notificationReadStatus;
    private Date notificationCreateDate;
    // 기본 생성자 추가 (자동으로 생성되는 경우도 있지만 명시적으로 추가하는게 좋다길래 추가)
    public NotificationDTO() {}
}