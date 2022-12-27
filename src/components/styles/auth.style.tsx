import styled from "styled-components";
import { IconBtnStyle } from "./button.style";

export const DialogHeaderStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

export const CloseBtnStyle = styled(IconBtnStyle)`
  width: 1.1rem;
  height: 1.1rem;
  padding: 4px;
  box-sizing: content-box;
`;

export const DialogTitleStyle = styled.h2`
  margin: 0;
`;

export const DialogFormStyle = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  width: 20rem;
`;

export const HideLabelStyle = styled.label`
  position: absolute;
  left: -999rem;
`;
