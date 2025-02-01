package mesbiens.transaction.service;

import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import mesbiens.account.repository.AccountJpaRepository;
import mesbiens.account.vo.AccountVO;
import mesbiens.transaction.dao.TransactionDetailDAO;
import mesbiens.transaction.dto.TransactionDetailDTO;
import mesbiens.transaction.vo.TransactionDetailVO;
import mesbiens.transaction.vo.TransactionType;

@Service
public class TransactionDetailServiceImpl implements TransactionDetailService {

    @Autowired
    private TransactionDetailDAO trsdDAO; // 거래내역 DAO
    
    @Autowired
    private AccountJpaRepository acctJpaRepo; // 계좌 정보 관리 Repository
//
//    @Override // 전체 거래 내역 조회
//    public List<TransactionDetailVO> getAllTransactionList() {
//        return trsdDAO.findAllTransactions();
//    }
//
//    @Override // 특정 날짜 범위 거래 내역 조회
//    public List<TransactionDetailVO> getTransactionDate(Timestamp startDate, Timestamp endDate) {
//        return trsdDAO.findTransactionsDate(startDate, endDate);
//    }
	
    @Override
    public List<TransactionDetailDTO> getAllTransactionList() {
        List<TransactionDetailVO> transactions = trsdDAO.findAllTransactions();
        return transactions.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @Override
    public List<TransactionDetailDTO> getTransactionDate(Timestamp startDate, Timestamp endDate) {
        List<TransactionDetailVO> transactions = trsdDAO.findTransactionsDate(startDate, endDate);
        return transactions.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    private TransactionDetailDTO convertToDTO(TransactionDetailVO transactionDetailVO) {
        TransactionDetailDTO dto = new TransactionDetailDTO();
        dto.setTransactionDate(transactionDetailVO.getTransactionCreateAt());
        dto.setTransactionId(transactionDetailVO.getTransactionNo());

        if (transactionDetailVO.getTransactionSenderAccountNo() != null) {
            dto.setSenderAccountNo(transactionDetailVO.getTransactionSenderAccountNo().getAccountNo());
            dto.setSenderName(transactionDetailVO.getTransactionSenderAccountNo().getMemberNo().getMemberName()); // 회원 이름 설정
            dto.setSenderBankName(transactionDetailVO.getTransactionSenderAccountNo().getBankCode().getBankName());
        }

        if (transactionDetailVO.getTransactionReceiverAccountNo() != null) {
            dto.setReceiverAccountNo(transactionDetailVO.getTransactionReceiverAccountNo().getAccountNo());
            dto.setReceiverName(transactionDetailVO.getTransactionReceiverAccountNo().getMemberNo().getMemberName()); // 회원 이름 설정
            dto.setReceiverBankName(transactionDetailVO.getTransactionReceiverAccountNo().getBankCode().getBankName());
        }

        dto.setTransactionAmount(transactionDetailVO.getTransactionBalance());
        dto.setTransactionStatus("성공"); // 거래 상태를 설정
        dto.setTransactionConfirmed(true); // 거래 확인 여부를 설정
        dto.setMemo(transactionDetailVO.getTransactionMemo());

        return dto;
    }
    
    

    @Override // 입금
    @Transactional
    public void deposit(TransactionDetailVO transactionDetailVO) {
        if (transactionDetailVO.getTransactionBalance() == null || transactionDetailVO.getTransactionBalance() <= 0) {
            throw new IllegalArgumentException("거래 금액은 0보다 커야 합니다.");
        }

        try {
            transactionDetailVO.setTransactionTypeName(TransactionType.DEPOSIT);
            transactionDetailVO.setTransactionCreateAt(new Timestamp(System.currentTimeMillis()));

            // 비관적 잠금으로 계좌 조회
            AccountVO account = acctJpaRepo.findById(
                transactionDetailVO.getTransactionReceiverAccountNo().getAccountNo()
            ).orElseThrow(() -> new IllegalArgumentException("계좌를 찾을 수 없습니다."));

            // 계좌 잔액 업데이트
            account.setAccountBalance(account.getAccountBalance() + transactionDetailVO.getTransactionBalance());
            acctJpaRepo.save(account);

            // 거래 내역 저장
            trsdDAO.saveTransaction(transactionDetailVO);
        } catch (Exception e) {
            System.err.println("입금 처리 중 오류 발생: " + e.getMessage());
            throw new RuntimeException("입금 처리에 실패했습니다.", e);
        }
    }

    @Override
    @Transactional
    public void withdrawal(TransactionDetailVO transactionDetailVO) {
        if (transactionDetailVO.getTransactionBalance() == null || transactionDetailVO.getTransactionBalance() <= 0) {
            throw new IllegalArgumentException("거래 금액은 0보다 커야 합니다.");
        }

        try {
            transactionDetailVO.setTransactionTypeName(TransactionType.WITHDRAWAL);
            transactionDetailVO.setTransactionCreateAt(new Timestamp(System.currentTimeMillis()));

            // 비관적 잠금으로 계좌 조회
            AccountVO account = acctJpaRepo.findById(
                transactionDetailVO.getTransactionSenderAccountNo().getAccountNo()
            ).orElseThrow(() -> new IllegalArgumentException("계좌를 찾을 수 없습니다."));

            if (account.getAccountBalance() == null) {
                throw new IllegalArgumentException("계좌 잔액이 null입니다.");
            }

            // 계좌 잔액이 출금 금액보다 적으면 예외 처리
            if (account.getAccountBalance() < transactionDetailVO.getTransactionBalance()) {
                throw new IllegalArgumentException("잔액이 부족합니다.");
            }

            // 계좌의 잔액을 업데이트 (출금)
            account.setAccountBalance(account.getAccountBalance() - transactionDetailVO.getTransactionBalance());
            acctJpaRepo.save(account);

            // 거래 내역 저장
            trsdDAO.saveTransaction(transactionDetailVO);
        } catch (Exception e) {
            System.err.println("출금 처리 중 오류 발생: " + e.getMessage());
            throw new RuntimeException("출금 처리에 실패했습니다.", e);
        }
    }
    @Override // 결제
    public void payment(TransactionDetailVO transactionDetailVO) {
        if (transactionDetailVO == null || transactionDetailVO.getTransactionBalance() <= 0) {
            throw new IllegalArgumentException("유효하지 않은 거래 세부 정보입니다.");
        }

        try {
            // 거래 타입 설정: 결제
            transactionDetailVO.setTransactionTypeName(TransactionType.PAYMENT);

            // 거래 날짜 설정: 현재 날짜
            transactionDetailVO.setTransactionCreateAt(new Timestamp(System.currentTimeMillis()));

            // 계좌 잔액 업데이트 (결제하는 계좌)
            AccountVO account = transactionDetailVO.getTransactionSenderAccountNo();  // 결제하는 계좌 가져오기
            if (account == null) {
                throw new IllegalArgumentException("계좌 정보가 없습니다.");
            }
            
            // 계좌 잔액이 결제 금액보다 적으면 예외 처리
            if (account.getAccountBalance() < transactionDetailVO.getTransactionBalance()) {
                throw new IllegalArgumentException("잔액이 부족합니다.");
            }

            // 계좌의 잔액을 업데이트 (결제)
            account.setAccountBalance(account.getAccountBalance() - transactionDetailVO.getTransactionBalance());
            // 계좌 정보 저장
            acctJpaRepo.save(account);
            // DAO를 통해 거래 내역 저장
            trsdDAO.saveTransaction(transactionDetailVO);
            
        } catch (Exception e) {
            // 예외 발생 시 로깅 및 재처리
            System.err.println("결제 처리 중 오류 발생: " + e.getMessage());
            throw new RuntimeException("결제 처리에 실패했습니다.", e);
        }
    }

    @Override
    @Transactional
    public void deleteTransaction(int id) {
        trsdDAO.deleteTransaction(id);
    }

    @Override // 거래 로그 생성
    @Transactional
    public void createLog(String logMessage) {
        trsdDAO.saveLog(logMessage);
    }
}