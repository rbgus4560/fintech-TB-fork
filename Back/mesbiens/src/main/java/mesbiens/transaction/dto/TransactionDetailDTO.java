package mesbiens.transaction.dto;

import java.sql.Timestamp;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@EqualsAndHashCode
public class TransactionDetailDTO {
	
    private Timestamp transactionDate; // 거래날짜
    private int transactionId; // 거래id
    private int senderAccountNo; // 송신계좌
    private String senderName; // 송신자명
    private int receiverAccountNo; // 수신계좌
    private String receiverName; // 수신자명
    private Long transactionAmount; // 거래금액
    private String transactionStatus; // 거래상태
    private boolean transactionConfirmed; // 거래 확인
    private String memo; //거래 메모
    private String senderBankName; //송신 은행
    private String receiverBankName; //수신 은행
}