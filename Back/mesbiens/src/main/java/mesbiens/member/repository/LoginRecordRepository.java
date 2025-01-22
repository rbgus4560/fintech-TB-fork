package mesbiens.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import mesbiens.member.vo.LoginRecordVo;

public interface LoginRecordRepository extends JpaRepository<LoginRecordVo, Integer> {

}
