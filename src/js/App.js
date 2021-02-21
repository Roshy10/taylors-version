import {ThemeProvider} from "@material-ui/core";
import React from "react";
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import createSagaMiddleware from "redux-saga";
import SpotifyHandler from "./components/SpotifyHandler";
import rootReducer from "./reducers/rootReducer";
import rootSaga from "./sagas/rootSaga";
import theme from "./themes/theme";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware),
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