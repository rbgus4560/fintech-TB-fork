import React, { useState } from "react";
import L from "../login/LoginStyle";
import DefaultInputField from "../../components/inputfield/InputField";
import DefaultButton from "../../components/button/DefaultButton";
import VerticalDivider from "../../components/divider/VerticalDivider";
// import "./FindIDPage.css";

const FindIDPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("findID");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [confirmID, setConfirmID] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordReset, setPasswordReset] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  const handleFindIDSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle Find ID logic
    console.log({ name, email });
  };

  const handleFindPasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Handle Find Password logic
    console.log({ name, username, email, password });
  };

  return (
    <L.Body>
      <L.MainContainer>
        <L.Container_top>
          <h1>ID / 비밀번호 찾기</h1>
        </L.Container_top>
        <L.Container_tab>
          <button
            className={`tablinks ${activeTab === "findID" ? "active" : ""}`}
            onClick={() => handleTabClick("findID")}
            style={{ flex: 0.5, padding: "15px 0", transition: "0.5s" }}
          >
            아이디 찾기
          </button>
          <button
            className={`tablinks ${
              activeTab === "findPassword" ? "active" : ""
            }`}
            onClick={() => handleTabClick("findPassword")}
            style={{ flex: 0.5, padding: "15px 0", transition: "0.5s" }}
          >
            비밀번호 찾기
          </button>
        </L.Container_tab>
        <L.Container_bottom>
          {activeTab === "findID" && (
            <div className="tab-content active" id="findID">
              <L.P_tag>
                <strong>등록된 이메일로 ID 찾기</strong>
                <br />
                <br />
                회원님의 <strong>이름</strong>과 <strong>이메일 주소</strong>를
                입력해주세요.
              </L.P_tag>
              <form onSubmit={handleFindIDSubmit}>
                <DefaultInputField
                  type="text"
                  id="name"
                  placeholder="회원 이름 (홍길동)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <DefaultInputField
                  type="email"
                  id="email"
                  placeholder="회원 이메일 (fintech123@gmail.com)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <DefaultButton type="submit" width="100%" height="2.5em">
                  인증번호 받기
                </DefaultButton>
                <L.Divider />
                <DefaultInputField
                  type="text"
                  id="confirm-id"
                  placeholder="인증번호 입력"
                  value={confirmID}
                  onChange={(e) => setConfirmID(e.target.value)}
                  required
                />
                <DefaultButton type="submit" width="100%" height="2.5em">
                  확인
                </DefaultButton>
              </form>
              <L.Divider />
              <L.P_tag style={{ textAlign: "center", margin: "0" }}>
                회원님의 ID는 000입니다.
              </L.P_tag>{" "}
              {/* 값이 들어 올 수 있도록 수정 필요 */}
            </div>
          )}
          {activeTab === "findPassword" && (
            <div className="tab-content active" id="findPassword">
              <L.P_tag>
                <strong>등록된 이메일로 비밀번호 찾기</strong>
                <br />
                <br />
                회원님의 <strong>이메일 주소</strong>를 입력해주세요.
              </L.P_tag>
              <form onSubmit={handleFindPasswordSubmit}>
                <DefaultInputField
                  type="email"
                  id="emailforpassword"
                  placeholder="회원 이메일 (fintech123@gmail.com)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <DefaultButton type="submit" width="100%" height="2.5em">
                  비밀번호 찾기
                </DefaultButton>
                <L.Divider />
                <DefaultInputField
                  type="password"
                  id="passwordreset"
                  placeholder="비밀번호 입력"
                  value={passwordReset}
                  onChange={(e) => setPasswordReset(e.target.value)}
                  required
                />
                <DefaultInputField
                  type="password"
                  id="passwordcheck"
                  placeholder="비밀번호 확인"
                  value={passwordCheck}
                  onChange={(e) => setPasswordCheck(e.target.value)}
                  required
                />
                <DefaultButton type="submit" width="100%" height="2.5em">
                  비밀번호 재설정
                </DefaultButton>
              </form>
            </div>
          )}
        </L.Container_bottom>
        <L.SignUp>
          <L.P_tag>
            <a href="/login">로그인</a>
          </L.P_tag>
          <VerticalDivider height={"20px"} style={{ marginLeft: "20px" }} />
          <L.P_tag style={{ margin: "20px" }}>
            <a href="/">홈으로</a> 나가기
          </L.P_tag>
        </L.SignUp>
      </L.MainContainer>
    </L.Body>
  );
};

export default FindIDPage;
