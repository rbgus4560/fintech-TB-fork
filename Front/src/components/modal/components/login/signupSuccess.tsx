import { useNavigate } from "react-router-dom";
import ModalFunc from "../../utils/ModalFunc";
import { loginSuccess } from "./style";

const SignupSuccessModal: React.FC = () => {
  const { closeModal } = ModalFunc();
  const navigate = useNavigate();

  const handleButton = () => {
    closeModal();
    navigate("/login");
    window.location.reload();
  };

  return (
    <loginSuccess.Maincontainer>
      <loginSuccess.H1>회원가입 완료</loginSuccess.H1>
      <loginSuccess.Btn onClick={handleButton}>
        로그인 하러가기
      </loginSuccess.Btn>
    </loginSuccess.Maincontainer>
  );
};

export default SignupSuccessModal;
