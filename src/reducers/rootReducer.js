import { combineReducers } from "redux";
import personReducer from "./personReducer";;

const rootReducer = combineReducers({
    persons : personReducer
})

export default rootReducer;