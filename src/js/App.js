import {Container, ThemeProvider} from "@material-ui/core";
import React from "react";
import {Provider} from "react-redux";
import {Route, Switch} from "react-router-dom";
import {applyMiddleware, createStore} from "redux";
import createSagaMiddleware from "redux-saga";
import ConfigurePage from "./components/ConfigurePage";
import LandingPage from "./components/LandingPage";
import TopBar from "./components/TopBar";
import rootReducer from "./reducers/rootReducer";
import rootSaga from "./sagas/rootSaga";
import index from "./themes";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware),
);
sagaMiddleware.run(rootSaga);

function App() {
    return (
        <Provider store={store}>
            <ThemeProvider theme={index}>
                <TopBar/>
                <Container fixed>
                    <Switch>
                        <Route exact component={LandingPage} path="/"/>
                        <Route exact component={ConfigurePage} path="/setup"/>
                    </Switch>
                </Container>
            </ThemeProvider>
        </Provider>
    );
}

export default App;