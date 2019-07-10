import React, {Component} from 'react';
import './App.css';
import Home from "./components/containers/home";
import { Provider } from 'react-redux';
import store from './redux/store'

class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <Home/>
            </Provider>
        );
    }
}

export default App;
