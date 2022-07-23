import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {todos} from './reducer'

const initialState = {};
const middleWare = [thunk];

export const reducers = combineReducers({
    todos
});

const store = createStore(
    reducers,
    initialState,
    applyMiddleware(...middleWare)

);
export default store;