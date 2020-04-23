import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { OuterContainer, Header, HeaderTitle, InnerContainer } from "./styles";

const Template = ({ children, title, bg }) => {
  const { t } = useTranslation();

  const currentPageTitle = useMemo(
    () => (title && t(title)) || t("homepageTitle"),
    [title, t]
  );

  return (
    <OuterContainer data-testid="appRoutes">
      <Header>
        <HeaderTitle>{currentPageTitle}</HeaderTitle>
      </Header>
      <InnerContainer bg={bg}>{children}</InnerContainer>
    </OuterContainer>
  );
};

Template.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

Template.defaultProps = {
  title: "",
};

export default Template;
