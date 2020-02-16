import React, { useContext } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Divider } from "@material-ui/core";
import ConstructorContext from "../../../engine/ConstructorContext";
import OrderContext from "../../../engine/OrderContext";
import CheckboxGroup from "../CheckboxGroup";
import { SectionWrapper } from "./styles";

export default function CheckboxGroupsSection({ group, inputNumericMax }) {
  const [generalConstructor] = useContext(ConstructorContext);
  const [order] = useContext(OrderContext);
  const { t } = useTranslation();

  const constructor = generalConstructor[group];
  const ingridientGroups = Object.keys(constructor);
  const orderGroupArray = order[group] || [];
  const amount = orderGroupArray
    .map(({ portion }) => portion)
    .reduce((sum, item) => sum + item, 0);

  const getPizzaIngridientChoices = (item, catigory) => {
    return item.map(({ ingridient, weight, price }) => ({
      label: `${t(ingridient)}`,
      value: { ingridient, weight, price, catigory },
    }));
  };

  const CheckboxGroups = ingridientGroups.map((key) => {
    return (
      <CheckboxGroup
        key={key}
        ingridientsArray={getPizzaIngridientChoices(constructor[key], key)}
        text={key}
        category={group}
        inputNumericMax={inputNumericMax - amount}
        orderGroupArray={orderGroupArray}
      />
    );
  });
  return (
    <>
      <Trans>{group}</Trans>
      <br />
      <Trans>chosenAmount</Trans>
      {inputNumericMax - amount}
      <br />
      <Trans>amountCapability</Trans>
      {amount}
      <SectionWrapper>{CheckboxGroups}</SectionWrapper>
      <Divider />
    </>
  );
}
