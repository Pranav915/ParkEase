import alertActions from "../actions/alertActions";

const initState = {
  showAlertMessage: false,
  alertMessageContent: null,
  tp: null,
};

const alertReducers = (state = initState, action) => {
  switch (action.type) {
    case alertActions.OPEN_ALERT_MESSAGE:
      return {
        ...state,
        showAlertMessage: true,
        alertMessageContent: action.content,
        tp: action.tp,
      };
    case alertActions.CLOSE_ALERT_MESSAGE:
      return {
        ...state,
        showAlertMessage: false,
        alertMessageContent: null,
        tp: null,
      };

    default:
      return state;
  }
};

export default alertReducers;
