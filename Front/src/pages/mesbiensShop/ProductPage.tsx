import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // useNavigate 훅 임포트
import { useDispatch } from "react-redux";
import { addToCart } from "../../modules/cart/cartSlice"; // addToCart 액션 임포트
import { shop, p } from "./style";
import ShoppingNav from "./ShoppingNav";
import { ProductData } from "./ProductData";
import ModalFunc from "../../components/modal/utils/ModalFunc";
import { ModalKeys } from "../../components/modal/keys/ModalKeys";
import ModalRendererComponent from "../../components/modal/ModalRendererComponent";

const ProductPage: React.FC = () => {
  const { productNo } = useParams<{ productNo: string }>();
  const [product, setProduct] = useState<ProductData | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const dispatch = useDispatch(); // useDispatch 훅을 사용하여 액션 디스패치
  const { handleModal } = ModalFunc();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(
          `${process.env.PUBLIC_URL}/dummyDatas/shoppingData.json`
        );
        const data: ProductData[] = await response.json();
        const selectedProduct = data.find(
          (item) => item.productNo === Number(productNo)
        );
        setProduct(selectedProduct || null);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, [productNo]);

  const handleAddToCart = () => {
    if (product) {
      const cartItem = {
        productNo: product.productNo,
        productName: product.productName,
        productPrice: product.productPrice,
        productImg: product.productImg,
        quantity,
      };
      dispatch(addToCart(cartItem)); // cartItem 객체를 addToCart 액션에 전달
      console.log(`장바구니에 ${quantity}개 ${product.productName} 추가`);
      console.log(product.productPrice);
      handleModal(ModalKeys.SHOPPING_CART_MODAL);
    }
  };

  const handleBuyNow = () => {
    console.log(`바로 구매: ${product?.productName}`);
    if (product) {
      const selectedProduct = {
        productNo: product.productNo,
        productName: product.productName,
        productPrice: product.productPrice,
        productImg: product.productImg,
        quantity,
      };
      navigate("/Purchase", { state: { selectedProducts: [selectedProduct] } });
    }
  };

  if (!product) {
    return <div>제품을 찾을 수 없습니다.</div>;
  }

  return (
    <shop.MainContainer>
      <ShoppingNav />

      <shop.BodyContainer>
        <p.ContentContainer>
          <p.ProductImg src={product.productImg} alt={product.productName} />
          <p.ProductInfo>
            <h1>{product.productName}</h1>
            <h3>{product.productPrice.toLocaleString()}원</h3>
            <p.BtnContainer>
              <label>수량: </label>
              <p.QtyInput
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                min="1"
                placeholder="수량"
              ></p.QtyInput>
              <p.Btn onClick={handleAddToCart}>장바구니 담기</p.Btn>
              <p.Btn onClick={handleBuyNow}>바로구매</p.Btn>
            </p.BtnContainer>
          </p.ProductInfo>
        </p.ContentContainer>
      </shop.BodyContainer>

      <ModalRendererComponent />
    </shop.MainContainer>
  );
};

export default ProductPage;
