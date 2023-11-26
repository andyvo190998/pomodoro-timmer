import { createContext, useReducer } from 'react';
export const Store = createContext();

const initialState = {
  typeid: 'pomodoro',
  duration: 1500,
  tasks: [],
  isLogin: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'TYPE_CHANGE':
      return {
        ...state,
        typeid: action.payload.typeid,
        duration: action.payload.duration,
      };
    case 'ADD_TASK':
      return {
        ...state,
        tasks: action.payload,
      };
    case 'GET_TASK':
      return {
        ...state,
        isLogin: true,
        tasks: action.payload,
      };
    case 'REQUIRE_LOGIN':
      return {
        ...state,
        isLogin: action.payload,
      };
    default:
      return state;
  }
};

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{children}</Store.Provider>;
}
