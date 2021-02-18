import {Container, ThemeProvider} from "@material-ui/core";
import React from "react";
import {Provider} from "react-redux";
import {Route, Switch} from "react-router-dom";
import {applyMiddleware, createStore} from "redux";
import createSagaMiddleware from "redux-saga";
import TopBar from "./components/TopBar";
import Landing from "./pages/landing/Landing";
import Configure from "./pages/process/Configure";
import rootReducer from "./reducers/rootReducer";
import rootSaga from "./sagas/rootSaga";
import theme from "./theme";

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
                <TopBar/>
                <Container fixed>
                    <Switch>
                        <Route exact component={Landing} path="/"/>
                        <Route exact component={Configure} path="/setup"/>
                    </Switch>
                </Container>
            </ThemeProvider>
        </Provider>
    );
}

export default App;