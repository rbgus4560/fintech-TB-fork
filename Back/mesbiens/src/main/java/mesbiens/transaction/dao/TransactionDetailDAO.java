package mesbiens.transaction.dao;

import java.sql.Timestamp;
import java.util.List;

import mesbiens.transaction.vo.TransactionDetailVO;

public interface TransactionDetailDAO {
	    List<TransactionDetailVO> findAllTransactions();
	    List<TransactionDetailVO> findTransactionsDate(Timestamp startDate, Timestamp endDate);
	    void saveTransaction(TransactionDetailVO transactionDetailVO);
	    void deleteTransaction(int id);
	    void saveLog(String logMessage);
	}