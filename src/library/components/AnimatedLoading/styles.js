import styled, { css } from 'styled-components';
import { vars as sVars } from '../../../globalStyles';
import optSlice from "../../../assets/img/slice_opt.png";

export const CardsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
`;

export const Cards = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 70px;

  @keyframes card_red {
    0% {
      transform: rotateZ(-11.25deg);
    }
    30% {
      transform: rotateZ(0deg);
    }
    60% {
      -webkit-transform: rotateZ(-11.25deg);
      transform: rotateZ(-11.25deg);
    }
  }

  @keyframes card_orange {
    0% {
      transform: rotateZ(11.25deg) translateY(16.6666238px)
        translateX(-16.6666238px);
    }
    30% {
      transform: rotateZ(0deg);
    }
    60% {
      transform: rotateZ(11.25deg) translateY(16.6666238px)
        translateX(-16.6666238px);
    }
  }
`;

const Card = css`
  content: '';
  width: 215px;
  height: 220px;
  transform-origin: center bottom;
`;

export const RedCard = styled.div`
  ${Card}

  background: url(${optSlice});

  transform: rotateZ(-11.25deg);
  animation: card_red 1.25s infinite;
`;

export const OrangeCard = styled.div`
  ${Card}

  background: url(${optSlice});
  position: relative;
  left: -100px;

  transform: rotateZ(11.25deg) translateY(16.6666238px)
    translateX(-16.6666238px);
  animation: card_orange 1.25s infinite;
`;

export const Text = styled.p`
  font-size: 1.7rem;
  text-shadow: rgba(0, 0, 0, 0.5) 0 2px 3px;
  color: ${sVars.mainColors.orange};
  margin: 10px 60px 0px 0;
`;
