package mesbiens.member.exception;

import java.io.Serializable;

public class NotificationTypeNotFoundException extends RuntimeException implements Serializable {

    // serialVersionUID 추가
    private static final long serialVersionUID = 1L;

    // 생성자
    public NotificationTypeNotFoundException(String message) {
        super(message);  // 부모 클래스인 RuntimeException의 생성자 호출
    }
}