import { Link } from "react-router-dom";
import ModalFunc from "../../utils/ModalFunc";
import CartModal from "./style";

const ShoppingCartModal: React.FC = () => {
  const { closeModal } = ModalFunc();

  return (
    <CartModal.CartModalContainer>
      <h2>장바구니에 담겼습니다!</h2>
      <p>장바구니로 이동하시겠습니까?</p>
      <CartModal.BtnContainer>
        <Link to="/Cart" style={{ textDecoration: "none" }}>
          <CartModal.Btn onClick={() => closeModal()}>
            장바구니로 이동
          </CartModal.Btn>
        </Link>
        <CartModal.Btn onClick={() => closeModal()}>
          쇼핑 계속하기
        </CartModal.Btn>
      </CartModal.BtnContainer>
    </CartModal.CartModalContainer>
  );
};

export default ShoppingCartModal;
