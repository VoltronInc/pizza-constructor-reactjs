import { createGlobalStyle } from 'styled-components';
import pizzaImg from "./assets/img/pizza.jpg";

export const rem = pixelValue => `${pixelValue / 16}rem`;

export const vars = {
  padding: {
    mobile: '0',
    tablet: '1rem 1.2rem',
    desktop: '1rem 1.5rem'
  },
  mobile: '320px',
  mobileLg: '480px',
  tablet: '768px',
  tabletLg: '1024px',
  desktop: '1220px',
  desktopLg: '1920px',
  shadow:
    'rgba(0, 0, 0, 0.66) 0 30px 60px 0, inset #333 0 0 0 5px, inset rgba(255, 255, 255, 0.5) 0 0 0 6px',
  blockShadow: 'rgba(0, 0, 0, 0.66) 0 30px 60px 0',
  mainColors: {
    red: '#db1831',
    orange: '#f29400',
    mint: '#00938e',
    purple: '#7d0d6b',
    green: '#78a02e',
    blue: '#508fcc'
  }
};

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  html {
    height: 100%;
  }
  #root {
    flex: 1 0 auto
  }
  body {
    font-size: 1.1rem;
    font-family: Roboto, Helvetica;
  }
  html, body {
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    flex: 1 0 auto;
    background: url(${pizzaImg}) center;
  }
  .swal2-container {
    &.swal2-backdrop-show {
      z-index: 2100000000;
    }
  }

`;

export default GlobalStyles;
