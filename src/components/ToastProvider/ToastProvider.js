import React from "react";
import useEscapeKey from "../hooks/useEscapeKey";

export const ToastStateContext = React.createContext([]);
ToastStateContext.displayName = "ToastState";
export const ToastDispatchContex = React.createContext();
ToastDispatchContex.displayName = "ToastDispatch";

export const TOAST_ACTION = {
  ADD: "ADD",
  REMOVE: "REMOVE",
  RESET: "RESET"
};

const toastBuilder = ({ text, variant, duration = 3000 }) => {
  return {
    id: crypto.randomUUID(),
    text,
    variant,
    duration
  };
};

const toastReducer = (state = [], action) => {
  switch (action.type) {
    case TOAST_ACTION.ADD: {
      const { text, variant, duration } = action.payload;

      return [...state, toastBuilder({ text, variant, duration })];
    }
    case TOAST_ACTION.REMOVE: {
      const { id } = action.payload;
      return state.filter((toast) => toast.id !== id);
    }
    case TOAST_ACTION.RESET: {
      return [];
    }
    default: {
      throw new Error(
        `Invalid toast action type: ${action.type}, must be one of the following ${TOAST_ACTION}`
      );
    }
  }
};

function ToastProvider({ children }) {
  const [toastState, toastDispatch] = React.useReducer(toastReducer, []);

  useEscapeKey(() => {
    toastDispatch({ type: TOAST_ACTION.RESET });
  });

  return (
    <ToastDispatchContex.Provider value={toastDispatch}>
      <ToastStateContext.Provider value={toastState}>{children}</ToastStateContext.Provider>
    </ToastDispatchContex.Provider>
  );
}

export const useToastStateContext = () => {
  const context = React.useContext(ToastStateContext);
  if (context === undefined) {
    throw new Error("useToastStateContext must be used within a ToastStateProvider");
  }
  return context;
};
export const useToastDispatchContext = () => {
  const context = React.useContext(ToastDispatchContex);
  if (context === undefined) {
    throw new Error("useToastDispatchContext must be used within a ToastDispatchProvider");
  }
  return context;
};

export default ToastProvider;
