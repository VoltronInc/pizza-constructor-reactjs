import React from 'react';
import PropTypes from 'prop-types';
import Template from '../Template';
import InfoBlock from '../InfoBlock';
import NotFoundWrapper from './styles';
import HexagonsSvg from '../HexagonsSvg';

const ErrorPage = ({ children }) => (
  <Template alignTop>
    <NotFoundWrapper>
      <HexagonsSvg />
      <InfoBlock>{children}</InfoBlock>
    </NotFoundWrapper>
  </Template>
);

ErrorPage.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default ErrorPage;
