import styled from "styled-components";

export const shop = {
  MainContainer: styled.div`
    display: flex;
    flex-direction: column;
    background-color: #fff;
    align-items: center;
    width: inherit;
    height: 100vh;
  `,
  HeaderContainer: styled.div`
    width: 100%;
    height: 4rem;
    border-bottom: 1px solid #ccc;
    padding: 30px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 1000;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: white;
  `,
  LogoContainer: styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
  `,
  LogoImg: styled.img`
    height: 100%;
    transform: scale(2);
  `,
  Nav: styled.nav`
    display: flex;
    width: inherit;
    justify-content: center;
    gap: 10rem;
    z-index: 1;
    position: relative;
  `,
  NavTab: styled.a`
    cursor: pointer;
    &:hover {
      color: var(--third-color);
    }
  `,
  RightContainer: styled.div`
    position: absolute;
    right: 2rem;
    display: flex;
    gap: 20px;
  `,
  CartIcon: styled.img`
    border: none;
    /* background-image: url(${`${process.env.PUBLIC_URL}/images/shoppingImg/bag.svg`}); */
    background-size: contain;
    background-repeat: no-repeat;
    background-color: transparent;
    width: 1.2rem;
    height: 1.2rem;
    cursor: pointer;
    &:hover {
      background-image: url(${`${process.env.PUBLIC_URL}/images/shoppingImg/bag-fill.svg`});
    }
  `,
  Home: styled.a`
    background-image: url(${`${process.env.PUBLIC_URL}/images/shoppingImg/house.svg`});
    background-size: contain;
    background-repeat: no-repeat;
    background-color: transparent;
    width: 1.2rem;
    height: 1.2rem;
    cursor: pointer;
    &:hover {
      background-image: url(${`${process.env.PUBLIC_URL}/images/shoppingImg/house-fill.svg`});
    }
  `,

  BodyContainer: styled.div`
    display: flex;
    padding-top: 2rem;
    width: 100%;
    gap: 10rem;
    justify-content: center;
    overflow-y: auto;
    /* 스크롤바 */
    &::-webkit-scrollbar {
      width: 7px;
    }

    &::-webkit-scrollbar-thumb {
      background: var(--scrollbar-color);
      border-radius: 12px;
    }

    &::-webkit-scrollbar-thumb:active {
      background-color: darkgray;
    }

    &::-webkit-scrollbar-track {
      border-radius: 12px;
    }
    @media screen and (max: 1000px) {
      width: 50rem;
    }
  `,
  DividerContainer: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
    padding: 20px 0;
  `,
  Divider: styled.div`
    height: 1px;
    width: 100%;
    border-bottom: 1px solid #ddd;
    margin-bottom: 20px;
  `,
  ItemContainer: styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    width: 70rem;
  `,
  Item: styled.a`
    width: 18rem;
    height: 22rem;
    transition: transform 0.3s ease-in-out;
    text-decoration: none;
    color: black;
    &:hover {
      cursor: pointer;
      transform: scale(1.1);
    }
  `,
  ItemImg: styled.img`
    width: 18rem;
    height: 18rem;
  `,
  ItemDescription: styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    & li {
      padding: 5px 0;
    }
    & > :nth-child(1) {
      font-size: 1.3rem;
      font-weight: bold;
    }
  `,

  ProductContainer: styled.div``,
};

export const p = {
  ContentContainer: styled.div`
    display: flex;
    width: 70rem;
    gap: 3rem;
  `,
  ProductImg: styled.img`
    width: 30rem;
  `,
  ProductInfo: styled.div`
    display: block;
    flex: 1;
  `,
  BtnContainer: styled.div`
    display: flex;
    flex: 1;
    justify-content: space-around;
    align-items: center;
    height: 2rem;
  `,
  Btn: styled.button`
    border: 1px solid black;
    background: transparent;
    flex: 1;
    cursor: pointer;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      background: var(--forth-color);
    }
  `,
  QtyInput: styled.input`
    display: block;
    width: 3rem;
    height: 100%;
    border: none;
  `,
};

export const cart = {
  ContentContainer: styled.div`
    width: 70%;
    height: 100vh;
  `,
  ContentUl: styled.ul`
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0;
    margin: 0;
  `,
  ContentLi: styled.li`
    display: flex;
    align-items: center;
    padding: 20px 0;
    border-bottom: 1px solid #ddd;
  `,
  Thumbnail: styled.img`
    width: 5rem;
    height: 5rem;
    margin-right: 10px;
  `,
  ClearCartContainer: styled.div`
    display: flex;
    justify-content: flex-end;
  `,
  ProductInfo: styled.div`
    text-align: left;
    padding-left: 20px;
    flex: 1;
  `,
  QtyContainer: styled.div``,
  AmountContainer: styled.div`
    padding: 0 2rem;
  `,
  Price: styled.div`
    padding: 3px 0;
  `,
  Input: styled.input`
    width: 2rem;
    border: none;
  `,
  Btn: styled.button`
    border: 1px solid black;
    background-color: transparent;
    cursor: pointer;
  `,
  PurchaseContainer: styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-top: 20px;
  `,
  TotalAmount: styled.div`
    padding-right: 20px;
  `,
};

export const ShoppingNavContainer = styled.nav`
  position: sticky;
  top: 0;
  width: 100%;
  background-color: white;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;
