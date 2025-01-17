package mesbiens.vo.post;

import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import mesbiens.vo.member.MemberVo;

@Setter
@Getter
@ToString
@Entity
@SequenceGenerator(
			name="postLog_no_seq_postLog", // 시퀀스 제너레이터 이름
			sequenceName = "postLog_no_seq", // 시퀀스 이름
			initialValue = 1, // 시작값
			allocationSize = 1 // 증감값
		)
@Table(name="postLog")
@EqualsAndHashCode(of="postLogNo")

public class PostLogVO {

	
	@Id
	@GeneratedValue(
			strategy = GenerationType.SEQUENCE, // 사용할 전략을 시퀀스로 선택
			generator = "postLog_no_seq_postLog" // 시퀀스 생성기에 설정해 놓은 제너레이터 이름
		)
	private Number postLogNo;
	
	@ManyToOne // 다대일 관계 설정
	@JoinColumn(name = "memberId", nullable = false) // 외래키 매핑
	// name = "memberId": Post 테이블에서 외래키 컬럼 이름.
	// nullable = false: 이 컬럼이 반드시 값이 있어야 함을 지정.
	private MemberVo memberVO; // 회원 ID(글쓴이)
	
	private String postLogType; // 로그 유형
	
	// Post 테이블 종속 엔티티들
//	private String postLogTitle; // 게시글 제목
//	private String postLogContent; // 게시글 내용
//	@CreationTimestamp
//	private Timestamp postLogDate; // 게시글 작성일
	
	@ManyToOne
    @JoinColumn(name = "postNo")
    private PostVO PostVO;
	
	
	// PostComment 테이블 종속 엔티티
//	private String postLogComment; // 댓글 내용
	
	@ManyToOne
	@JoinColumn(name = "postCommentNo")
	private PostCommentVO PostCommentVO;
	
	
	
	@CreationTimestamp
	private Timestamp postLogCommentDate; // 게시글 작성일
		
	@CreationTimestamp // 이 애노테이션은 글 등록시점의 날짜와 시간값을 기록한다.
	@Column(nullable = false)
	private Timestamp postLogTime; // 로그 생성 시각
	
	private String postDeletedData; // 게시판 삭제 여부
	private String postDeletedCommentData; // 댓글 삭제 여부
	
}
