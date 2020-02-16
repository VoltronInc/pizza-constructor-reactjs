export const appInitialState = {
  recievedDataStatus: false,
};

export const APP_ACTIONS = {
  UPDATE_RECIEVED_DATA: "UPDATE_RECIEVED_DATA",
};

const ConstructorReducer = (prevState, action) => {
  switch (action.type) {
    case APP_ACTIONS.UPDATE_RECIEVED_DATA:
      return {
        ...prevState,
        ...action.payload,
        recievedDataStatus: true,
      };
    default:
      return prevState;
  }
};

export default ConstructorReducer;
