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
public class TransactionDetailLogDTO {
		private int logId;
		private String logMessage;
		private Timestamp logTimestamp;
}

