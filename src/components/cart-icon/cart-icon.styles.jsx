import styled from "styled-components";

import shoppingBagSvgUrl from "../../assets/shopping-bag.svg";

export const ShoppingIcon = styled.div`
  width: 24px;
  height: 24px;
  background-image: url(${shoppingBagSvgUrl});

`;

export const CartIconContainer = styled.div`
  width: 45px;
  height: 45px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const ItemCount = styled.span`
  position: absolute;
  font-size: 10px;
  font-weight: bold;
  bottom: 12px;
`;
