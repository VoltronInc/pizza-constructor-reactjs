import styled from 'styled-components';
import { vars as sVars } from '../../../globalStyles';

const ErrorPageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 10%;
  flex-direction: column-reverse;
  @media only screen and (min-device-width: ${sVars.tablet}) {
    flex-direction: row;
  }
`;

export default ErrorPageWrapper;
