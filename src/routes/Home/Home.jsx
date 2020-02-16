import React from "react";
import { Trans } from "react-i18next";
import Template from "../../library/components/Template";
import InfoBlock from "../../library/components/InfoBlock";
import { Button } from "@material-ui/core";

const Home = () => {
  return (
    <Template>
      <InfoBlock>
        <p>
          <Trans>homePage</Trans>
        </p>
      </InfoBlock>
      <Button variant="contained" color="secondary" href="/constructor">
        Start
      </Button>
    </Template>
  );
};

export default Home;
