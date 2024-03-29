import { createContext, useReducer } from "react";

export const GroceriesContext = createContext();

export const groceriesReducer = (state, action) => {
  switch (action.type)
  {
    case 'SET_GROCERIES':
      return {
        groceries: action.payload
      };

    case 'DELETE_GROCERY':
      return {
        groceries: state.groceries.filter((w) => w._id !== action.payload._id)
      };

    default:
      return state;
  }
};

export const GroceriesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(groceriesReducer, {
    groceries: null
  });

  return (
    <GroceriesContext.Provider value={{...state, dispatch}}>
      { children }
    </GroceriesContext.Provider>
  )
};
