package mesbiens.account.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import mesbiens.account.dao.AccountDAO;
import mesbiens.account.vo.AccountVO;

@Service
@Transactional
public class AccountServiceImpl implements AccountService {
	@Autowired
	private AccountDAO acctDao;

	// 모든 계좌 정보 가져오기
	@Override
	public List<AccountVO> getAllAcct() {
		return acctDao.getAllAcct();
	}

	// 계좌 추가하기
	@Override
	public boolean addAcct(AccountVO acct) {
		AccountVO isSaved = acctDao.addAcct(acct);
		if(isSaved == null) {
			return false;
		}
		
		return true;
	}

	// 계좌 삭제하기
	@Override
	public boolean delAcct(int accountNo) {
		// 제거할 계좌가 존재하는지 검색(Primary key 기준)
		if(!acctDao.existsByIdAcct(accountNo)) {
			return false;
		}
		
		int result = acctDao.delAcct(accountNo);
		
		return result > 0;
	}

	// 계좌 수정하기
	@Override
	public boolean modiAcct(int accountNo) {
		// TODO Auto-generated method stub
		return false;
	}



	
	
	
}
