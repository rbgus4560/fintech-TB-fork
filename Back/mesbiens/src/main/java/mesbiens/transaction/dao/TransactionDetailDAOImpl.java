package mesbiens.transaction.dao;

import java.sql.Timestamp;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import mesbiens.transaction.repository.TransactionDetailRepository;
import mesbiens.transaction.vo.TransactionDetailVO;

@Repository
public class TransactionDetailDAOImpl implements TransactionDetailDAO {

    @Autowired
    private TransactionDetailRepository transactionDetailRepository;

    @Override
    public List<TransactionDetailVO> findAllTransactions() {
        return transactionDetailRepository.findAll();
    }

    @Override
    public List<TransactionDetailVO> findTransactionsDate(Timestamp startDate, Timestamp endDate) {
        return transactionDetailRepository.findByTransactionCreateAtBetween(startDate, endDate);
    }

    @Override
    public void saveTransaction(TransactionDetailVO transactionDetailVO) {
        transactionDetailRepository.save(transactionDetailVO);
    }

    @Override
    public void deleteTransaction(int id) {
        transactionDetailRepository.deleteById(id);
    }

    @Override
    public void saveLog(String logMessage) {
        // 로그 저장 로직
    }
}