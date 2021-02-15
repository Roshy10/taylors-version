import React from "react";
import {Provider} from "react-redux";
import {BrowserRouter as HashRouter, Route, Switch} from "react-router-dom";
import {applyMiddleware, createStore} from "redux";
import createSagaMiddleware from "redux-saga";
import TopBar from "./components/layout/TopBar";
import Configure from "./components/pages/process/Configure";
import Landing from "./components/pages/landing/Landing";
import rootReducer from "./reducers/rootReducer";
import rootSaga from "./sagas/rootSaga";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(rootSaga);

function App() {
    return (
        <Provider store={store}>
            <HashRouter basename="/#">
                <TopBar/>
                <Switch>
                    <Route exact component={Landing} path="/"/>
                    <Route exact component={Configure} path="/process"/>
                </Switch>
            </HashRouter>
        </Provider>
    );
}

export default App;