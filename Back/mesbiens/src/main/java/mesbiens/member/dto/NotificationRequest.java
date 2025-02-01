package mesbiens.member.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

//요청을 처리할 때 사용
public class NotificationRequest {
	 private int memberNo;
	 private String message;
	 private String type;
	   

}
