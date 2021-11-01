import {ThemeProvider} from "@material-ui/core";
import React from "react";
import {Provider} from "react-redux";
import {applyMiddleware, compose, createStore} from "redux";
import createSagaMiddleware from "redux-saga";
import SpotifyHandler from "./components/SpotifyHandler";
import rootReducer from "./reducers/rootReducer";
import rootSaga from "./sagas/rootSaga";
import theme from "./themes/theme";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(sagaMiddleware),
    ),
);
sagaMiddleware.run(rootSaga);

function App() {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <SpotifyHandler/>
            </ThemeProvider>
        </Provider>
    );
}

export default App;