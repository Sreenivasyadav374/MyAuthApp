// reducers.js
import { combineReducers } from "redux";
import { REGISTER_USER } from "../redux/actions";

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case REGISTER_USER:
      return [...state, action.payload];
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  users: usersReducer,
});

export default rootReducer;
