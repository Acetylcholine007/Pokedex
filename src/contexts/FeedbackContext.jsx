import { createContext, useReducer } from "react";

export const FeedbackContext = createContext();

const FeedbackContextProvider = ({ children }) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case "SHOW_LOADING":
        return { ...state, showLoading: action.payload };
      case "SET_SNACKBAR":
        return { ...state, ...action.payload };
      case "CLOSE_SNACKBAR":
        return { ...state, showSnackbar: false };
      default:
        return state;
    }
  };

  const [feedbackState, feedbackDispatch] = useReducer(reducer, {
    showLoading: false,
    showSnackbar: false,
    severity: "success",
    duration: 6000,
    vertical: "bottom",
    horizontal: "center",
    message: "",
  });

  return (
    <FeedbackContext.Provider
      value={{
        feedbackState,
        feedbackDispatch,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContextProvider;
