const reducer = (state, action) => {
  switch (action.type) {
    case "gameTypeChange":
      return {
        gameType: action.payload
      };
    default:
      return state;
  }
};

export default reducer;