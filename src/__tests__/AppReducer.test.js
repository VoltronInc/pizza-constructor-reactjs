import ConstructorReducer, { APP_ACTIONS } from "../ConstructorReducer";

const initialData = {
  response: {
    categories: [{ key: 0, value: 0 }],
    data: {},
  },
  scores: {},
  backgrounds: {},
  completedCategories: {},
};

describe("ConstructorReducer", () => {
  it("should return the response given when the user dispatches a INITIAL_STATE action", () => {
    const reducerCall = {
      type: APP_ACTIONS.INITIAL_STATE,
      response: initialData,
    };

    expect(ConstructorReducer(null, reducerCall)).toStrictEqual(initialData);
  });

  it("should update the category information when the user dispatches a UPDATE_CATEGORY action", () => {
    const reducerCall = {
      type: APP_ACTIONS.UPDATE_CATEGORY,
      newScores: {
        absence: 10,
        "trigger-point-sick-pay": 0,
      },
      newcompletedCategories: {
        absence: true,
        "trigger-point-sick-pay": false,
      },
    };

    expect(ConstructorReducer(initialData, reducerCall)).toStrictEqual({
      ...initialData,
      scores: reducerCall.newScores,
      completedCategories: reducerCall.newcompletedCategories,
    });
  });

  it("should return old state when no type is given", () => {
    expect(ConstructorReducer(null, {})).toBe(null);
  });
});
