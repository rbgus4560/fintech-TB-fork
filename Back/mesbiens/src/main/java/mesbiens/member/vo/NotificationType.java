package mesbiens.member.vo;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "notification_type")
@Getter
@Setter
public class NotificationType {

	    @Id
	    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "notification_type_seq")
	    @SequenceGenerator(name = "notification_type_seq", sequenceName = "notification_type_seq", allocationSize = 1)
	    @Column(name = "notificationType_No")
	    private int notificationTypeNo; // 유형 ID

	    @Column(name = "NTFC_type_name", nullable = false, length = 50, unique = true)
	    private String typeName; // 유형 이름 (예: SYSTEM, PROMOTION)

	    @Column(name = "NTFC_description", length = 255)
	    private String description; // 유형 설명
}