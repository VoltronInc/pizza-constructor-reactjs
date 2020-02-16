import styled from "styled-components";
import { vars as sVars } from '../../../globalStyles';

export const SectionWrapper= styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
flex-flow: wrap;
align-items: flex-start;
// @media only screen and (min-device-width: ${sVars.mobile}) {
//     flex-direction: column;
//   } doesn't work
`;