import React from "react";
import { Trans, useTranslation } from "react-i18next";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import DetailsForm from "./DetailsForm";
import ReviewPizza from "./ReviewPizza";
import { useCheckoutStyles } from "./styles";

const steps = [
  "reviewYourOrder",
  "details",
];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <ReviewPizza />;
    case 1:
      return <DetailsForm />;
    default:
      throw new Error("Unknown step");
  }
}

const OrderSubmited = ({ orderNumber }) => (
  <>
    <Typography variant="h5" gutterBottom>
      <Trans>thankYouForOrder</Trans>
    </Typography>
    <Typography variant="subtitle1">
      <Trans>yourOrderNumber</Trans>
      {orderNumber}
      <br />
      <Trans>confirmationDetails</Trans>
    </Typography>
  </>
);

export default function Checkout() {
  const { t } = useTranslation();
  const classes = useCheckoutStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const orderNumber = 1353656;

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            <Trans>сheckout</Trans>
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>
                  <Trans>{label}</Trans>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
          <>
            {activeStep === steps.length ? (
              <OrderSubmited orderNumber={orderNumber} />
            ) : (
              <>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 ? (
                    <Button onClick={handleBack} className={classes.button}>
                      <Trans>back</Trans>
                    </Button>
                  ) : (
                    <Button href="/constructor" className={classes.button}>
                      <Trans>backToConstr</Trans>
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1
                      ? t("placeOrder")
                      : t("next")}
                  </Button>
                </div>
              </>
            )}
          </>
        </Paper>
      </main>
    </>
  );
}
