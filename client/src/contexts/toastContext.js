import React, { createContext, useReducer } from "react";

export const ToastContext = createContext();

export const ACTIONS = {
  ADD: "ADD_NOTIFICATION",
  DELETE: "DELETE_NOTIFICATION",
};

export const TYPES = {
  SUCCESS: "SUCCESS",
  INFO: "INFO",
  WARNING: "WARNING",
  DANGER: "DANGER",
};

export const ToastContextProvider = (props) => {
  const notifications = [];

  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case ACTIONS.ADD:
        return [...state, action.payload];
      case ACTIONS.DELETE:
        return state.filter(
          (notification) => notification.id !== action.payload.id
        );
      default:
        return state;
    }
  }, notifications);

  return (
    <ToastContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ToastContext.Provider>
  );
};
