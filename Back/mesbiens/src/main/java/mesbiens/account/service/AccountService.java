package mesbiens.account.service;

import java.util.List;

import mesbiens.account.vo.AccountVO;

public interface AccountService {

	// 모든 계좌 정보 가져오기
	List<AccountVO> getAllAcct();

	// 계좌 추가하기
	boolean addAcct(AccountVO acct);

	// 계좌 삭제하기
	boolean delAcct(int accountNo);

	boolean modiAcct(int accountNo);

}
