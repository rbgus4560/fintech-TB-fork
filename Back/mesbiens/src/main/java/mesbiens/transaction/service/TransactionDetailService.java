package mesbiens.transaction.service;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.stereotype.Service;

import mesbiens.transaction.dto.TransactionDetailDTO;
import mesbiens.transaction.vo.TransactionDetailVO;

@Service
public interface TransactionDetailService {


	List<TransactionDetailDTO> getAllTransactionList();

	List<TransactionDetailDTO> getTransactionDate(Timestamp startDate, Timestamp endDate);


	void withdrawal(TransactionDetailVO transactionDetailVO);

	void payment(TransactionDetailVO transactionDetailVO);

	void deleteTransaction(int id);

	void createLog(String logMessage);

	void deposit(TransactionDetailVO transactionDetailVO);
}
