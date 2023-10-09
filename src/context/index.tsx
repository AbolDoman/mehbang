import React, { createContext, useContext, useReducer, useMemo } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Material Dashboard 2 React main context
interface defaultTypes {
  transactionsData?: any;
}
const MaterialUI = createContext<any>({});

// Setting custom name for the context which is visible on react dev tools
MaterialUI.displayName = "MaterialUIContext";

// Material Dashboard 2 React reducer
function reducer(state: any, action: any) {
  switch (action.type) {
    case "SET_ALL_EMPLOYEES": {
      return { ...state, allEmployees: action.value };
    }
    case "SET_OPEN_DRAWER": {
      return { ...state, openDrawer: action.value };
    }
    case "SET_OPEN_DRAWER_REASON": {
      return { ...state, openDrawerReason: action.value };
    }
    case "SET_EDITED_EMPLOYEE": {
      return { ...state, editedEmployee: action.value };
    }
    case "SET_IS_LOADING": {
      return { ...state, isLoading: action.value };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

// Material Dashboard 2 React context provider
function MaterialUIControllerProvider({ children } : {children : React.ReactNode}) {
  const initialState = {
    isLoading: false,
    openDrawer: false,
    openDrawerReason: "",
    allEmployees: [],
    editedEmployee: {}
  };

  const [controller, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => [controller, dispatch], [controller, dispatch]);

  return <MaterialUI.Provider value={value}>{children}</MaterialUI.Provider>;
}

// Material Dashboard 2 React custom hook for using context
function useMaterialUIController() {
  const context = useContext(MaterialUI);

  if (!context) {
    throw new Error(
      "useMaterialUIController should be used inside the MaterialUIControllerProvider."
    );
  }

  return context;
}

// Typechecking props for the MaterialUIControllerProvider
MaterialUIControllerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Context module functions
const setAllEmployees = (dispatch: any, value: any) => dispatch({ type: "SET_ALL_EMPLOYEES", value });
const setOpenDrawer = (dispatch: any, value: any) => dispatch({ type: "SET_OPEN_DRAWER", value });
const setOpenDrawerReason = (dispatch: any, value: any) => dispatch({ type: "SET_OPEN_DRAWER_REASON", value });
const setEditedEmployee = (dispatch: any, value: any) => dispatch({ type: "SET_EDITED_EMPLOYEE", value });
const setIsLoading = (dispatch: any, value: any) => dispatch({ type: "SET_IS_LOADING", value });
export {
  MaterialUIControllerProvider,
  useMaterialUIController,
  setAllEmployees,
  setOpenDrawer,
  setOpenDrawerReason,
  setEditedEmployee,
  setIsLoading,
}
