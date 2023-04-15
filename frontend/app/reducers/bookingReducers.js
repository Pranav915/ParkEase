import { bookingActions } from "../actions/bookingActions";

const initState = {
  userDetails: null,
};

const bookingReducers = (state = initState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default bookingReducers;
