import { createContext, useReducer } from "react";

export const UserContext = createContext();

const initialState = {
  profileImage: 'profile-image.jpg'
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_IMAGE":
      return {
        profileImage: payload,
      };
    case "RESET":
      return {
        profileImage: 'profile-image.jpg'
      }
    default:
      throw new Error();
  }
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  );
};
