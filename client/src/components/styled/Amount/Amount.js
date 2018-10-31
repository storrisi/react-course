import styled from "styled-components";

const Amount = styled.div`
  background: ${props => (props.children >= 200 ? "green" : "red")};
`;

export default Amount;
