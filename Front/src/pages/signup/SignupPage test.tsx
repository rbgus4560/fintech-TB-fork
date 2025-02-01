import React, { useEffect, useRef, useState } from "react";
import L from "../login/LoginStyle";
import DefaultInputField from "../../components/inputfield/InputField";
import DefaultButton from "../../components/button/DefaultButton";
import VerticalDivider from "../../components/divider/VerticalDivider";
import { useDispatch } from "react-redux";
import { signup } from "../../modules/user/userSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../modules/store/store";
import ModalFunc from "../../components/modal/utils/ModalFunc";
import { ModalKeys } from "../../components/modal/keys/ModalKeys";

const SignupPage: React.FC = () => {
  const { handleModal } = ModalFunc();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [passwordCheck, setPasswordCheck] = useState<boolean>(false);
  // const [confirmPasswordCheck, setConfirmPasswordCheck] = useState<boolean>(false);
  // const [passwordMessage, setPasswordMessage] = useState<string>("대문자/소문자/숫자/특수문자를 조합하여 10~16자로 입력해주세요.");
  // const [confirmPasswordMessage, setConfirmPasswordMessage] = useState<string>("");
  const [errors, setErrors] = useState<string>("");

  // const passwordRef = useRef<HTMLInputElement>(null);
  // const confirmPasswordRef = useRef<HTMLInputElement>(null);

  // 정규표현식 검사
  const hasLowercase = /[a-z]/;
  const hasUppercase = new RegExp("[A-Z]");
  const hasSpecialChar = /[!$&-]+/;
  const hasDigit = new RegExp("[0-9]");
  const isValidPassword = (pwd: string): boolean => {
    let matchCount = 0;

    if (hasLowercase.test(pwd)) matchCount++;
    if (hasUppercase.test(pwd)) matchCount++;
    if (hasSpecialChar.test(pwd)) matchCount++;
    if (hasDigit.test(pwd)) matchCount++;

    return matchCount >= 2;
  };

  // const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  // const changeConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value);

  // // 유효성 검증 함수
  // const validatePassword = () => {
  //   if(password === "") {
  //     setPasswordCheck(false);
  //     setPasswordMessage("대문자/소문자/숫자/특수문자를 조합하여 10~16자로 입력해주세요.");
  //   }else if(!isValidPassword(password)) {
  //     setPasswordCheck(true);
  //     setPasswordMessage("대문자/소문자/숫자/특수 문자 중 2가지 이상 조합하셔야 합니다.");
  //   }else {
  //     setPasswordCheck(false);
  //     setPasswordMessage("");
  //   }
  // };
  // const validateConfirmPassword = () => {
  //   if(confirmPassword !== "" && password !== confirmPassword) {
  //     setConfirmPasswordCheck(true);
  //     setConfirmPasswordMessage("패스워드가 서로 일치하지 않습니다.");
  //   }else {
  //     setConfirmPasswordCheck(false);
  //     setConfirmPasswordMessage("");
  //   }
  // };

  // useEffect(() => {
  //   validatePassword();
  //   validateConfirmPassword();
  // }, [password, confirmPassword]);

  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === "") {
      setErrors(
        "대문자/소문자/숫자/특수문자를 조합하여 10~16자로 입력해주세요."
      );
    } else if (!isValidPassword(password)) {
      setErrors(
        "대문자/소문자/숫자/특수 문자 중 2가지 이상 조합하셔야 합니다."
      );
    } else if (password !== confirmPassword) {
      setErrors("비밀번호가 일치하지 않습니다!");
    } else {
      setErrors("");
      dispatch(signup({ name, email, username, password }));
      console.log("Signup Data:", {
        name,
        email,
        username,
        password,
        confirmPassword,
      });
      console.log("Redux State:", user);
      handleModal(ModalKeys.SIGNUP_SUCCESS);
    }
  };

  return (
    <L.Body>
      <L.MainContainer>
        <L.Container_top>
          <h1 style={{ fontSize: "3em" }}>회원가입</h1>
        </L.Container_top>
        <L.Container_bottom>
          <L.P_tag>회원정보를 모두 입력하세요.</L.P_tag>
          <form onSubmit={handleSubmit}>
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
              placeholder="회원 이메일 (fintech@gmail.com)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <DefaultInputField
              type="text"
              id="username"
              placeholder="회원 ID (fintech123)"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <DefaultInputField
              type="password"
              id="password"
              placeholder="비밀번호 (123456)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <DefaultInputField
              type="password"
              id="confirm-password"
              placeholder="비밀번호 확인 (123456)"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {errors && <div style={{ color: "red" }}>{errors}</div>}
            <DefaultButton width="100%">Sign Up</DefaultButton>
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
            <a href="/login">로그인 </a>
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

export default SignupPage;
