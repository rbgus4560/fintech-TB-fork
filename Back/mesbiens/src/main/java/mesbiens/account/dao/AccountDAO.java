package mesbiens.account.dao;

import java.util.List;

import mesbiens.account.vo.AccountVO;

public interface AccountDAO {

	// 모든 계좌 정보 가져오기
	List<AccountVO> getAllAcct();

	// 계좌 추가하기
	AccountVO addAcct(AccountVO acct);

	// 제거할 계좌가 존재하는지 검색(Primary key 기준)
	boolean existsByIdAcct(int accountNo);

	// 계좌 삭제하기
	int delAcct(int accountNo);


}
