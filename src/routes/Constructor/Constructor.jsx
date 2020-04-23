import React, { useContext } from "react";
import { Trans, useTranslation } from "react-i18next";
import ConstructorContext from "../../engine/ConstructorContext";
import OrderContext from "../../engine/OrderContext";
import { ORDER_ACTIONS } from "../../engine/OrderReducer";
import Template from "../../library/components/Template";
import InfoBlock from "../../library/components/InfoBlock";
import RadioGroup from "../../library/components/RadioGroup";
import CheckboxGroupsSection from "../../library/components/CheckboxGroupsSection";
import { Button } from "@material-ui/core";

const getTotalAmount = (arr = []) => {
  return arr.map(({ portion }) => portion).reduce((sum, item) => sum + item, 0);
};

export default function Constructor(props) {
  const [constructor] = useContext(ConstructorContext);
  const [order, orderDispatch] = useContext(OrderContext);
  const { t } = useTranslation();

  const { pizzaData, base } = constructor;

  const { size, sizeCM, ingridientsAmount } = pizzaData;

  const sizeRadioChoices = size.map((item) => ({
    label: `${t(item)} (${sizeCM[item]} ${t("cm")})`,
    value: item,
  }));

  const baseRadioChoices = base.map(({ name, weight, price }) => {
    weight = weight[order.size];
    price = price[order.size];

    return {
      label: `${t(name)} (${weight}${t("g")}) ${price}${t("currency")}`,
      value: { name, weight, price },
    };
  });

  const allFillingsChose =
    getTotalAmount(order.fillings) === ingridientsAmount.fillings[order.size];
  const allSaucesChose =
    getTotalAmount(order.sauces) === ingridientsAmount.sauces;

  const disableSubmit = !(allFillingsChose && allSaucesChose);

  return (
    <Template title="constructorPage">
      <InfoBlock>
        <p>
          <Trans>constructorPageDesc</Trans>
        </p>
      </InfoBlock>
      <RadioGroup
        radioArray={sizeRadioChoices}
        dispatch={orderDispatch}
        type={ORDER_ACTIONS.UPDATE_PIZZA_SIZE}
        text="size"
      />
      <RadioGroup
        radioArray={baseRadioChoices}
        dispatch={orderDispatch}
        type={ORDER_ACTIONS.UPDATE_PIZZA_BASE}
        text="base"
      />
      <CheckboxGroupsSection
        group="fillings"
        inputNumericMax={ingridientsAmount.fillings[order.size]}
      />
      <CheckboxGroupsSection
        group="sauces"
        inputNumericMax={ingridientsAmount.sauces}
      />
      <CheckboxGroupsSection
        group="additional"
        inputNumericMax={ingridientsAmount.additional}
      />
      <Trans>totalWeight</Trans>
      {order.totalWeight}
      {t("g")}
      <br />
      <Trans>totalCoast</Trans>
      {order.totalCoast}
      {t("currency")}
      <br />
      {disableSubmit ? (
        <>
          <Trans>chooseToSubmit</Trans>
          <Button variant="contained" color="primary" disabled href="/checkout">
            <Trans>next</Trans>
          </Button>
        </>
      ) : (
        <Button variant="contained" color="primary" href="/checkout">
          <Trans>next</Trans>
        </Button>
      )}
    </Template>
  );
}
