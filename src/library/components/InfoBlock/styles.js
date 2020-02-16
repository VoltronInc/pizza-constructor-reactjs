import styled from 'styled-components';
import { vars as sVars } from '../../../globalStyles';

const InfoBlock = styled.div`
  margin: 0 0 30px 0;
  padding: 0 2.5%;
  display: flex;
  flex-direction: column;
  & > p {
    color: ${sVars.color2};
    text-shadow: rgba(0, 0, 0, 0.5) 0 2px 3px;
    letter-spacing: 0.1em;
    font-size: 1.3rem;
  }
  & > a {
    margin-top: 50px;
    width: fit-content;
  }
`;

export default InfoBlock;
