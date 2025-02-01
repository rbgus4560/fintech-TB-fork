import { useNavigate } from "react-router-dom";
import ModalFunc from "../../utils/ModalFunc";
import { loginSuccess } from "./style";
import { useEffect } from "react";

const LoginSuccessModal: React.FC = () => {
  const { closeModal } = ModalFunc();
  const navigate = useNavigate();

  const handleButton = () => {
    closeModal();
    navigate("/main");
    window.location.reload();
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        handleButton();
      }
    };

    window.addEventListener("keypress", handleKeyPress);
    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, []);

  return (
    <loginSuccess.Maincontainer>
      <loginSuccess.H1>로그인 성공</loginSuccess.H1>
      <loginSuccess.Btn onClick={handleButton}>확인</loginSuccess.Btn>
    </loginSuccess.Maincontainer>
  );
};

export default LoginSuccessModal;
