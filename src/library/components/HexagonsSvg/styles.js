import styled, { css } from 'styled-components';

const basePath = css`
  @keyframes float {
    100% {
      transform: translateY(20px);
    }
  }

  animation: float 1s infinite ease-in-out alternate;
`;

export const FirstPath = styled.path`
  ${basePath}
`;
export const SecondPath = styled.path`
  ${basePath}
  animation-delay: 0.2s;
`;
export const ThirdPath = styled.path`
  ${basePath}
  animation-delay: 0.4s;
`;
export const ForthPath = styled.path`
  ${basePath}
  animation-delay: 0.6s;
`;
export const FifthPath = styled.path`
  ${basePath}
  animation-delay: 0.8s;
`;
