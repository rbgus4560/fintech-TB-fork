import { useNavigate } from "react-router-dom";
import ModalFunc from "../../utils/ModalFunc";
import { loginSuccess } from "./style";
import { useEffect } from "react";

const LoginRequireModal: React.FC = () => {
  const { closeModal } = ModalFunc();
  const navigate = useNavigate();

  const handleButton = () => {
    closeModal();
    navigate("/login");
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
      <loginSuccess.H1>로그인 후 사용 가능합니다</loginSuccess.H1>
      <loginSuccess.Btn onClick={handleButton}>
        로그인 하러가기
      </loginSuccess.Btn>
    </loginSuccess.Maincontainer>
  );
};

export default LoginRequireModal;
