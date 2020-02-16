import React from "react";
import { Trans } from "react-i18next";
import { Button } from "@material-ui/core";
import ErrorPage from "../../library/components/ErrorPage";

const NotFound = () => (
  <ErrorPage>
    <p>
      <Trans>notFound</Trans>
    </p>
    <Button href="/">
      <Trans>homePageButton</Trans>
    </Button>
  </ErrorPage>
);

export default NotFound;
