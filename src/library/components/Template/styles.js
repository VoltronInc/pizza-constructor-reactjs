import styled from 'styled-components';
import { vars as sVars } from '../../../globalStyles';

const { mainColors } = sVars;

export const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  height: 100%;
`;

export const InnerContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  flex-direction: column;
  align-self: center;
  margin: auto 0;
  background-color: ${props => props.bg !== 'none' && `rgba(255, 255, 255, 0.85)` };
  border-radius: 25px;
  button: {
    width: 70%
  }
  @media only screen and (min-device-width: ${sVars.tablet}) {
    padding: ${sVars.padding.tablet};
  }
`;

export const Header = styled.header`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: ${sVars.padding.desktop};
  position: relative;
  font-size: 1.3rem;
  background-color: rgba(255, 255, 255, 0.25);

  &:after {
    background: linear-gradient(
      to right,
      ${mainColors.red} 17%,
      ${mainColors.orange} 17%,
      ${mainColors.orange} 33%,
      ${mainColors.mint} 33%,
      ${mainColors.mint} 50%,
      ${mainColors.purple} 50%,
      ${mainColors.purple} 66%,
      ${mainColors.green} 66%,
      ${mainColors.green} 83%,
      ${mainColors.blue} 83%
    );
    content: '';
    width: 100%;
    height: 6px;
    border-radius: 6px;
  }
`;

export const HeaderTitle = styled.h1`
  text-align: center;
`;
