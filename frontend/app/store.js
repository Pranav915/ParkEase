import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import authReducers from "./reducers/authReducers";
import alertReducers from "./reducers/alertReducers";
import bookingReducers from "./reducers/bookingReducers";
import thunk from "redux-thunk";

const store = configureStore(
  {
    reducer: {
      auth: authReducers,
      alert: alertReducers,
      booking: bookingReducers,
    },
  },
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
