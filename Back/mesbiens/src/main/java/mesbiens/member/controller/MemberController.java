package mesbiens.member.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import mesbiens.member.dto.LoginRequest;
import mesbiens.member.dto.MemberDTO;
import mesbiens.member.dto.MemberResponseDTO;
import mesbiens.member.service.LoginRecordService;
import mesbiens.member.service.MemberService;

@RestController
@RequestMapping("/members")
public class MemberController {

	   @Autowired
	    private MemberService memberService;

	    @Autowired
	    private LoginRecordService loginRecordService; // LoginRecordService 추가

	    // 사용자 등록
	    @PostMapping("/register")
	    public ResponseEntity<MemberResponseDTO> registerMember(@RequestBody MemberDTO memberDTO) {
	        MemberResponseDTO registeredMember = memberService.registerMember(memberDTO);
	        return ResponseEntity.ok(registeredMember);
	    }

	    // 로그인
	    @PostMapping("/login")
	    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest, HttpServletRequest request) {
	        String requestIp = request.getRemoteAddr(); // 요청 IP 가져오기
	        String token = memberService.login(loginRequest.getUsername(), loginRequest.getPassword(), requestIp);
	        return ResponseEntity.ok(token);
	    }

	    // 로그아웃
	    @PostMapping("/logout/{recordNo}")
	    public ResponseEntity<String> logout(@PathVariable("recordNo") int recordNo) {
	        try {
	            // LoginRecordService를 통해 로그아웃 처리
	            loginRecordService.logout(recordNo); // 로그인 기록 ID를 이용해 로그아웃 처리
	            return ResponseEntity.ok("로그아웃 성공");
	        } catch (Exception e) {
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("로그아웃 실패: " + e.getMessage());
	        }
	    }

	    // 사용자 정보 조회
	    @GetMapping("/{id}")
	    public ResponseEntity<MemberResponseDTO> getMemberById(@PathVariable("id") String id) {
	        return ResponseEntity.ok(memberService.findById(id)); // String id를 그대로 사용
	    }
	}