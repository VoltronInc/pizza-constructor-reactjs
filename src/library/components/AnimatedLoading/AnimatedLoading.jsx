import React from 'react';
import { Text, Cards, CardsWrapper, RedCard, OrangeCard } from './styles';

const AnimatedLoading = () => (
  <CardsWrapper data-testid='loadingSvg'>
    <Cards>
      <RedCard />
      <OrangeCard />
    </Cards>
    <Text>Loading...</Text>
  </CardsWrapper>
);

export default AnimatedLoading;
