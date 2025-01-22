import React from "react";
import { useLocation } from "react-router-dom";
import { ProductData } from "./ProductData";
import { shop, cart } from "./style";
import ShoppingNav from "./ShoppingNav";

const PurchasePage: React.FC = () => {
  const location = useLocation();
  const { selectedProducts } = location.state || { selectedProducts: [] };

  const calculateTotalAmount = () => {
    return selectedProducts.reduce(
      (total: number, item: ProductData) =>
        total + item.quantity * item.productPrice,
      0
    );
  };

  return (
    <shop.MainContainer>
      <ShoppingNav />
      <shop.BodyContainer>
        <cart.ContentContainer>
          <h1>결제</h1>
          <shop.Divider />
          {/* <p>결제 정보를 입력해주세요.</p> */}
          <cart.ContentUl>
            {selectedProducts.map((item: ProductData) => (
              <cart.ContentLi key={item.productNo}>
                <cart.Thumbnail src={item.productImg} alt={item.productName} />
                <cart.ProductInfo>{item.productName}</cart.ProductInfo>
                <cart.QtyContainer>수량: {item.quantity}</cart.QtyContainer>
                <cart.AmountContainer>
                  <cart.Price>
                    가격: {item.productPrice.toLocaleString()}원
                  </cart.Price>
                  <cart.Price>
                    총액: {(item.quantity * item.productPrice).toLocaleString()}
                    원
                  </cart.Price>
                </cart.AmountContainer>
              </cart.ContentLi>
            ))}
            <cart.PurchaseContainer>
              <cart.TotalAmount>
                총액 : {calculateTotalAmount().toLocaleString()}원
              </cart.TotalAmount>
              <cart.Btn>구매하기</cart.Btn>
            </cart.PurchaseContainer>
          </cart.ContentUl>
          {/* 결제 폼을 여기에 추가 */}
        </cart.ContentContainer>
      </shop.BodyContainer>
    </shop.MainContainer>
  );
};

export default PurchasePage;
