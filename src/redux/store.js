import thunk from "redux-thunk"; // Default import

import { applyMiddleware, createStore } from "redux";
import { rootreducer } from "./mainreducer";

const store = createStore(rootreducer, applyMiddleware(thunk));

export default store;
