import { createContext, useContext, useReducer } from "react";

export const initialState = {
  currentUser: null,
  error: null,
  isLoggedIn: false,
};

const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, error: null };
    case "LOGIN_SUCCESS":
      return { ...state, currentUser: action.payload, isLoggedIn: true };
    case "LOGIN_FAILED":
      return { ...state, error: action.payload, currentUser: null };
    case "LOGOUT":
      return { ...state, currentUser: null, isLoggedIn: false };
    default:
      return state;
  }
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(userReducer, initialState);

  return (
    <AuthContext.Provider value={{ authState, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default userReducer;