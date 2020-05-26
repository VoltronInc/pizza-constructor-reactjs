import React, { useState, useContext } from "react";
import { Redirect } from '@reach/router';
import { Trans } from "react-i18next";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import DetailsForm from "./DetailsForm";
import ReviewPizza from "./ReviewPizza";
import OrderContext from "../../../engine/OrderContext";
import ConstructorContext from "../../../engine/ConstructorContext"
import { formatOrder } from "./helpers";
import { useCheckoutStyles } from "./styles";

const steps = ["reviewYourOrder", "details"];

function getStepContent(step, disableNext, setDisableNext) {
  switch (step) {
    case 0:
      return <ReviewPizza />;
    case 1:
      return <DetailsForm disableNext={disableNext} setDisableNext={setDisableNext} />;
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
      <br />
      <Button variant="contained" color="primary" href="/">
        <Trans>homePageButton</Trans>
      </Button>
    </Typography>
  </>
);

function randomInt(min, max) {
	return min + Math.floor((max - min) * Math.random());
}

export default function Checkout() {
  const [order] = useContext(OrderContext);
  const [constructor] = useContext(ConstructorContext);
  const classes = useCheckoutStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [orderNumber, setOrderNumber] = useState(0);
  const [disableNext, setDisableNext] = useState(true);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handlePlaceOrder = async () => {
    const orderData = formatOrder(order);



    try {
      // const response = await fetch("http://35.214.69.92:8080/checkout/", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(orderData),
      // });
      // const data = await response.json();

      // if (!data?.orderNumber) throw new Error("Place order fails");

      const data = {
        orderNumber: randomInt(100000, 999999),
      }

      setOrderNumber(data.orderNumber);
      setActiveStep(activeStep + 1);
      localStorage.clear();
    } catch (e) {
      throw new Error("Error during placing order");
    }
  };

  const isValidOrder =
  constructor.pizzaData.ingridientsAmount.fillings[order.size] === order.fillings.map(({ portion }) => portion).reduce((sum, item) => sum + item, 0)
  && constructor.pizzaData.ingridientsAmount.sauces ===  order.sauces.map(({ portion }) => portion).reduce((sum, item) => sum + item, 0);

  if(!isValidOrder) return <Redirect noThrow={true} to='/constructor' />

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
                {getStepContent(activeStep, disableNext, setDisableNext )}
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
                  {activeStep === steps.length - 1 ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handlePlaceOrder}
                      className={classes.button}
                      disabled={disableNext}
                    >
                      <Trans>placeOrder</Trans>
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      <Trans>next</Trans>
                    </Button>

                  )}
                </div>
              </>
            )}
          </>
        </Paper>
      </main>
    </>
  );
}
