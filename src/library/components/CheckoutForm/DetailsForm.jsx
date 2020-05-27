import React, { useState, useContext } from "react";
import { Trans, useTranslation } from "react-i18next";
import {
  Grid,
  Typography,
  TextField,
  FormControl,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Radio,
} from "@material-ui/core";
import OrderContext from "../../../engine/OrderContext";
import { ORDER_ACTIONS } from "../../../engine/OrderReducer";

export default function DetailsForm({ disableNext, setDisableNext }) {
  const [order, dispatch] = useContext(OrderContext);
  const { user } = order;
  const { t } = useTranslation();

  const [firstName, setFirstName] = useState(user.firstName);
  const [firstNameErr, setFirstNameErr] = useState(false);
  const [lastName, setlastName] = useState(user.lastName);
  const [lastNameErr, setLastNameErr] = useState(false);
  const [address, setAddress] = useState(user.address);
  const [addressErr, setAddressErr] = useState(false);
  const [telephone, setTelephone] = useState(user.telephone);
  const [telephoneErr, setTelephoneErr] = useState(false);
  const [city, setCity] = useState(user.city);
  const [cityErr, setCityErr] = useState(false);

  if(firstName && lastName && address && telephone && city) setDisableNext(false);
  else setDisableNext(true);

  const updateCheckout = (e, key) => {
    const payload = { ...user, [key]: e.target.value };
    dispatch({ type: ORDER_ACTIONS.UPDATE_CHECKOUT, payload });
  };
  return (
    <>
      <Typography variant="h6" gutterBottom>
        <Trans>shippingAddress</Trans>
      </Typography>
        <form className='checkout-form'  id='checkout-form' autoComplete="off">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            error={firstNameErr}
            name="firstName"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.currentTarget.value)
              updateCheckout(e, "firstName");
            }}
            onBlur={() => {
              if(!firstName) setFirstNameErr(true)
              else setFirstNameErr(false)
            }}
            label={t("firstName")}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            error={lastNameErr}
            required
            name="lastName"
            value={lastName}
            onChange={(e) => {
              setlastName(e.currentTarget.value)
              updateCheckout(e, "lastName");
            }}
            onBlur={() => {
              if(!lastName) setLastNameErr(true)
              else setLastNameErr(false)
            }}
            label={t("lastName")}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            error={addressErr}
            required
            name="address"
            value={address}
            onChange={(e) => {
              setAddress(e.currentTarget.value)
              updateCheckout(e, "address");
            }}
            onBlur={() => {
              if(!address) setAddressErr(true)
              else setAddressErr(false)
            }}
            label={t("address")}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            error={telephoneErr}
            required
            name="telephone"
            value={telephone}
            onChange={(e) => {
              setTelephone(e.currentTarget.value)
              updateCheckout(e, "telephone");
            }}
            onBlur={() => {
              if(!telephone) setTelephoneErr(true)
              else setTelephoneErr(false)
            }}
            label={t("telephone")}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="comment"
            form="checkout-form"
            defaultValue={user.comment}
            onChange={(e) => updateCheckout(e, "comment")}
            label={t("comment")}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            error={cityErr}
            required
            name="city"
            value={city}
            onChange={(e) => {
              setCity(e.currentTarget.value)
              updateCheckout(e, "city");
            }}
            onBlur={() => {
              if(!city) setCityErr(true)
              else setCityErr(false)
            }}
            label={t("city")}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="region"
            defaultValue={user.region}
            onChange={(e) => updateCheckout(e, "region")}
            form="checkout-form"
            label={t("region")}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl component="fieldset">
            <FormLabel component="legend">
              <Typography variant="h6" gutterBottom>
                <Trans>choosePaymentMethod</Trans>
              </Typography>
            </FormLabel>
            <RadioGroup
              value={user.payment || "cash"}
              onChange={(e) => updateCheckout(e, "payment")}
            >
              <FormControlLabel
                value={"cash"}
                control={<Radio />}
                label={t("cashToCarrier")}
              />
              <FormControlLabel
                value={"card"}
                control={<Radio />}
                label={t("cardToCarrier")}
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
        </form>
    </>
  );
}
