import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import L from "./LoginStyle";
import DefaultButton from "../../components/button/DefaultButton";
import DefaultInputField from "../../components/inputfield/InputField";
import VerticalDivider from "../../components/divider/VerticalDivider";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { RootState } from "../../modules/store/store";

const LoginPage: React.FC = () => {
  const [loginForm, setLoginForm] = useState({
    userID: "",
    userPassword: "",
  });

  const [cookies, setCookie] = useCookies<string>(["userID"]);
  const navigate = useNavigate();
  const [errors, setErrors] = useState<string>("");

  const user = useSelector((state: RootState) => state.user);

  const HandleLogin = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const { userID, userPassword } = loginForm;

    // 유효성 검사
    if (userID === "" || userPassword === "") {
      setErrors("ID 또는 비밀번호를 입력해 주세요!");
    } else if (userID !== user.username) {
      setErrors("ID가 일치하지 않습니다.");
    } else if (userPassword !== user.password) {
      setErrors("비밀번호가 일치하지 않습니다.");
    } else {
      // 유효성 통과 시
      console.log("아이디 : " + userID);
      console.log("비밀번호 : " + userPassword);
      alert("로그인 성공");

      // 로그인 성공 시 쿠키에 userID 저장, 유효기간 2000초
      setCookie("userID", userID, { path: "/" });

      navigate("/main");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  return (
    <L.Body>
      <L.MainContainer>
        <L.Container_top>
          <h1 style={{ fontSize: "3em" }}>로그인</h1>
        </L.Container_top>
        <L.Container_bottom>
          <L.P_tag>회원 ID와 비밀번호를 입력하세요.</L.P_tag>
          <form onSubmit={HandleLogin}>
            <DefaultInputField
              type="text"
              id="userID"
              name="userID"
              placeholder="회원 ID"
              value={loginForm.userID}
              onChange={handleChange}
              required
            />
            <br />
            <DefaultInputField
              type="password"
              id="userPassword"
              name="userPassword"
              placeholder="비밀번호"
              value={loginForm.userPassword}
              onChange={handleChange}
              required
            />
            <L.RememberMe type="checkbox" />
            <label htmlFor="remember">ID 기억하기</label>
            {errors && <div style={{ color: "red" }}>{errors}</div>}
            <DefaultButton width="100%">Login</DefaultButton>
          </form>
          <L.Divider>
            <span>또는</span>
          </L.Divider>
          <L.SNSLogin>
            <L.SNSButton id={"NaverLogin"} />
            <L.SNSButton id={"KakaoLogin"} />
            <L.SNSButton id={"GoogleLogin"} />
          </L.SNSLogin>
        </L.Container_bottom>
        <L.SignUp>
          <L.P_tag>
            <a href="/signup">회원가입</a>
          </L.P_tag>
          <VerticalDivider height={"20px"} margin={"20px"} />
          <L.P_tag>
            <a href="/findID">아이디/비밀번호 찾기</a>
          </L.P_tag>
          <VerticalDivider height={"20px"} style={{ marginLeft: "20px" }} />
          <L.P_tag style={{ margin: "20px" }}>
            <a href="/intro">홈으로</a> 나가기
          </L.P_tag>
        </L.SignUp>
      </L.MainContainer>
    </L.Body>
  );
};

export default LoginPage;
