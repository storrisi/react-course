import styled from "styled-components";
const colors = {
  black: "#00ff00"
};

export const Date = styled.div`
  background: yellow;
  color: ${colors.black};
`;

export const Amount = styled.div`
  background: ${props => (props.children >= 200 ? "green" : "red")};
`;
