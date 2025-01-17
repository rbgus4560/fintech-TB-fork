package mesbiens.vo.account;

import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import mesbiens.vo.bank.BankInfoVO;

// 계좌 Entity Bean 클래스

@Setter
@Getter
@ToString
@Entity
@Table(name = "account")
@SequenceGenerator(
	name = "account_no_seq_generator",
	sequenceName = "account_no_seq",
	initialValue = 1,
	allocationSize = 1
)
@EqualsAndHashCode(of = "accountNo")
public class AccountVO {
	@Id
	@GeneratedValue(
		strategy = GenerationType.SEQUENCE,
		generator = "account_no_seq_generator"
	)
	private int accountNo;
	
	/* Foriegn Key */
//	private List<UserVO> userNo; // 회원 No
	
	@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinColumn(referencedColumnName = "bankCode")
	private BankInfoVO bankCode; // 은행 코드
	
	@Column(nullable = false, unique = true)
	private String accountNumber; // 계좌 번호
	
	@Column(nullable = false)
	private Long accountBalance; // 계좌 잔액
	
	@PrePersist
	public void setDefaultBalanace() {
		if(this.accountBalance == null) {
			this.accountBalance = 0L;
		}
	}
	
	@CreationTimestamp
	private Timestamp accountOpeningDate; // 계좌 개설일
	
}







