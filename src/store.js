import { createContext, useReducer } from 'react';
export const Store = createContext();

const initialState = {
  typeid: 'work',
  duration: 1500,
  tasks: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'TYPE_CHANGE':
      console.log('action.payload');
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

    default:
      return state;
  }
};

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{children}</Store.Provider>;
}
