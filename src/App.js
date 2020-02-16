import React, { useMemo, useReducer } from "react";

import ConstructorReducer, {
  appInitialState,
  APP_ACTIONS,
} from "./engine/ConstructorReducer";
import orderReducer, { orderInitialState } from "./engine/OrderReducer";
import ConstructorContext from "./engine/ConstructorContext";
import OrderContext from "./engine/OrderContext";
import ErrorBoundary from "./library/components/ErrorBoundary";
import Loading from "./library/components/Loading";
import Routes from "./routes/Routes";
import GlobalStyles from "./globalStyles";

const App = () => {
  const [appState, appDispatch] = useReducer(
    ConstructorReducer,
    appInitialState
  );
  const [orderState, orderDispatch] = useReducer(
    orderReducer,
    orderInitialState
  );

  useMemo(async () => {
    const response = await fetch(process.env.REACT_APP_API_GET_INGRIDIENTS);
    const payload = await response.json();
    appDispatch({
      type: APP_ACTIONS.UPDATE_RECIEVED_DATA,
      payload,
    });
  }, []);

  if (!appState.recievedDataStatus) {
    return <Loading />;
  }

  return (
    <>
      <GlobalStyles />
      <ConstructorContext.Provider value={[appState, appDispatch]}>
        <OrderContext.Provider value={[orderState, orderDispatch]}>
          <ErrorBoundary>
            <Routes />
          </ErrorBoundary>
        </OrderContext.Provider>
      </ConstructorContext.Provider>
    </>
  );
};

export default App;
